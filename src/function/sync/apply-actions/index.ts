/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2020 Jonas Lochmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { createHash } from 'crypto'
import { BadRequest, Unauthorized } from 'http-errors'
import { parseAppLogicAction, parseChildAction, parseParentAction } from '../../../action/serialization'
import { ClientPushChangesRequest } from '../../../api/schema'
import { isSerializedAppLogicAction, isSerializedChildAction, isSerializedParentAction } from '../../../api/validator'
import { VisibleConnectedDevicesManager } from '../../../connected-devices'
import { Database } from '../../../database'
import { EventHandler } from '../../../monitoring/eventhandler'
import { WebsocketApi } from '../../../websocket'
import { notifyClientsAboutChanges } from '../../websocket'
import { Cache } from './cache'
import { dispatchAppLogicAction } from './dispatch-app-logic-action'
import { dispatchChildAction } from './dispatch-child-action'
import { dispatchParentAction } from './dispatch-parent-action'

export const applyActionsFromDevice = async ({ database, request, websocket, connectedDevicesManager, eventHandler }: {
  database: Database
  websocket: WebsocketApi
  request: ClientPushChangesRequest
  connectedDevicesManager: VisibleConnectedDevicesManager
  eventHandler: EventHandler
}) => {
  eventHandler.countEvent('applyActionsFromDevice')

  if (request.actions.length > 50) {
    eventHandler.countEvent('applyActionsFromDevice tooMuchActionsPerRequest')

    throw new BadRequest()
  }

  const { shouldDoFullSync, areChangesImportant, sourceDeviceId, familyId } = await database.transaction(async (transaction) => {
    const deviceEntryUnsafe = await database.device.findOne({
      where: {
        deviceAuthToken: request.deviceAuthToken
      },
      attributes: ['familyId', 'deviceId', 'nextSequenceNumber'],
      transaction
    })

    if (!deviceEntryUnsafe) {
      throw new Unauthorized()
    }

    const deviceEntry = {
      familyId: deviceEntryUnsafe.familyId,
      deviceId: deviceEntryUnsafe.deviceId,
      nextSequenceNumber: deviceEntryUnsafe.nextSequenceNumber
    }

    const familyEntryUnsafe = await database.family.findOne({
      where: {
        familyId: deviceEntry.familyId
      },
      transaction,
      attributes: ['hasFullVersion']
    })

    if (!familyEntryUnsafe) {
      throw new Error('missing family entry')
    }

    const familyEntry = {
      hasFullVersion: familyEntryUnsafe.hasFullVersion
    }

    const cache = new Cache({
      database,
      hasFullVersion: familyEntry.hasFullVersion,
      transaction,
      familyId: deviceEntry.familyId,
      connectedDevicesManager
    })

    let { nextSequenceNumber } = deviceEntry

    for (let i = 0; i < request.actions.length; i++) {
      const action = request.actions[i]

      if (action.sequenceNumber < nextSequenceNumber) {
        // action was already received

        eventHandler.countEvent('applyActionsFromDevice sequenceNumberRepeated')

        cache.requireFullSync()
        continue
      }

      try {
        // update the next sequence number
        nextSequenceNumber = action.sequenceNumber + 1

        if (action.type === 'parent') {
          if (action.integrity === 'device') {
            const deviceEntryUnsafe2 = await cache.database.device.findOne({
              attributes: ['currentUserId'],
              where: {
                familyId: cache.familyId,
                deviceId: deviceEntry.deviceId,
                currentUserId: action.userId,
                isUserKeptSignedIn: true
              },
              transaction: cache.transaction
            })

            if (!deviceEntryUnsafe2) {
              throw new Error('user is not signed in at this device')
            }

            // this ensures that the parent exists
            await cache.getSecondPasswordHashOfParent(action.userId)
          } else {
            const parentSecondHash = await cache.getSecondPasswordHashOfParent(action.userId)

            const integrityData = action.sequenceNumber.toString(10) +
                        deviceEntry.deviceId +
                        parentSecondHash +
                        action.encodedAction

            const expectedIntegrityValue = createHash('sha512').update(integrityData).digest('hex')

            if (action.integrity !== expectedIntegrityValue) {
              eventHandler.countEvent('applyActionsFromDevice parentActionInvalidIntegrityValue')

              throw new Error('invalid integrity value')
            }
          }
        }

        if (action.type === 'child') {
          const childSecondHash = await cache.getSecondPasswordHashOfChild(action.userId)

          const integrityData = action.sequenceNumber.toString(10) +
                      deviceEntry.deviceId +
                      childSecondHash +
                      action.encodedAction

          const expectedIntegrityValue = createHash('sha512').update(integrityData).digest('hex')

          if (action.integrity !== expectedIntegrityValue) {
            eventHandler.countEvent('applyActionsFromDevice childActionInvalidIntegrityValue')

            throw new Error('invalid integrity value')
          }
        }

        const parsedSerializedAction = JSON.parse(action.encodedAction)

        if (action.type === 'appLogic') {
          if (!isSerializedAppLogicAction(parsedSerializedAction)) {
            eventHandler.countEvent('applyActionsFromDevice invalidAppLogicAction')

            throw new Error('invalid action: ' + action.encodedAction)
          }

          eventHandler.countEvent('applyActionsFromDevice action:' + parsedSerializedAction.type)

          const parsedAction = parseAppLogicAction(parsedSerializedAction)

          try {
            await dispatchAppLogicAction({
              action: parsedAction,
              cache,
              deviceId: deviceEntry.deviceId
            })
          } catch (ex) {
            eventHandler.countEvent('applyActionsFromDevice actionWithError:' + parsedSerializedAction.type)

            throw ex
          }
        } else if (action.type === 'parent') {
          if (!isSerializedParentAction(parsedSerializedAction)) {
            eventHandler.countEvent('applyActionsFromDevice invalidParentAction')

            throw new Error('invalid action' + action.encodedAction)
          }

          eventHandler.countEvent('applyActionsFromDevice action:' + parsedSerializedAction.type)

          const parsedAction = parseParentAction(parsedSerializedAction)

          try {
            await dispatchParentAction({
              action: parsedAction,
              cache,
              parentUserId: action.userId,
              sourceDeviceId: deviceEntry.deviceId
            })
          } catch (ex) {
            eventHandler.countEvent('applyActionsFromDevice actionWithError:' + parsedSerializedAction.type)

            throw ex
          }
        } else if (action.type === 'child') {
          if (!isSerializedChildAction(parsedSerializedAction)) {
            eventHandler.countEvent('applyActionsFromDevice invalidChildAction')

            throw new Error('invalid action: ' + action.encodedAction)
          }

          eventHandler.countEvent('applyActionsFromDevice action:' + parsedSerializedAction.type)

          const parsedAction = parseChildAction(parsedSerializedAction)

          try {
            await dispatchChildAction({
              action: parsedAction,
              cache,
              childUserId: action.userId,
              deviceId: deviceEntry.deviceId
            })
          } catch (ex) {
            eventHandler.countEvent('applyActionsFromDevice actionWithError:' + parsedSerializedAction.type)

            throw ex
          }
        } else {
          throw new Error('illegal state')
        }
      } catch (ex) {
        eventHandler.countEvent('applyActionsFromDevice errorDispatchingAction')

        cache.requireFullSync()
      }
    }

    // save new next sequence number
    if (nextSequenceNumber !== deviceEntry.nextSequenceNumber) {
      eventHandler.countEvent('applyActionsFromDevice updateSequenceNumber')

      await database.device.update({
        nextSequenceNumber
      }, {
        where: {
          familyId: deviceEntry.familyId,
          deviceId: deviceEntry.deviceId
        },
        transaction
      })
    }

    await cache.saveModifiedVersionNumbers()

    return {
      shouldDoFullSync: cache.shouldDoFullSync(),
      areChangesImportant: cache.areChangesImportant,
      sourceDeviceId: deviceEntry.deviceId,
      familyId: deviceEntry.familyId
    }
  })

  if (areChangesImportant) {
    eventHandler.countEvent('applyActionsFromDevice areChangesImportant')
  }

  await notifyClientsAboutChanges({
    familyId,
    sourceDeviceId,
    isImportant: areChangesImportant,
    websocket,
    database
  })

  return { shouldDoFullSync }
}
