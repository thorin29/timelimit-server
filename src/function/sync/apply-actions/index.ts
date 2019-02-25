/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 Jonas Lochmann
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
import { WebsocketApi } from '../../../websocket'
import { notifyClientsAboutChanges } from '../../websocket'
import { Cache } from './cache'
import { dispatchAppLogicAction } from './dispatch-app-logic-action'
import { dispatchChildAction } from './dispatch-child-action'
import { dispatchParentAction } from './dispatch-parent-action'

export const applyActionsFromDevice = async ({ database, request, websocket, connectedDevicesManager }: {
  database: Database
  websocket: WebsocketApi
  request: ClientPushChangesRequest
  connectedDevicesManager: VisibleConnectedDevicesManager
}) => {
  if (request.actions.length > 50) {
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
            throw new Error('invalid integrity value')
          }
        }

        const parsedSerializedAction = JSON.parse(action.encodedAction)

        if (action.type === 'appLogic') {
          if (!isSerializedAppLogicAction(parsedSerializedAction)) {
            throw new Error('invalid action: ' + action.encodedAction)
          }

          const parsedAction = parseAppLogicAction(parsedSerializedAction)

          await dispatchAppLogicAction({
            action: parsedAction,
            cache,
            deviceId: deviceEntry.deviceId
          })
        } else if (action.type === 'parent') {
          if (!isSerializedParentAction(parsedSerializedAction)) {
            throw new Error('invalid action' + action.encodedAction)
          }

          const parsedAction = parseParentAction(parsedSerializedAction)

          await dispatchParentAction({
            action: parsedAction,
            cache,
            parentUserId: action.userId,
            sourceDeviceId: deviceEntry.deviceId
          })
        } else if (action.type === 'child') {
          if (!isSerializedChildAction(parsedSerializedAction)) {
            throw new Error('invalid action: ' + action.encodedAction)
          }

          const parsedAction = parseChildAction(parsedSerializedAction)

          await dispatchChildAction({
            action: parsedAction,
            cache,
            childUserId: action.userId,
            deviceId: deviceEntry.deviceId
          })
        } else {
          throw new Error('illegal state')
        }
      } catch (ex) {
        cache.requireFullSync()
      }
    }

    // save new next sequence number
    if (nextSequenceNumber !== deviceEntry.nextSequenceNumber) {
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

  await notifyClientsAboutChanges({
    familyId,
    sourceDeviceId,
    isImportant: areChangesImportant,
    websocket,
    database
  })

  return { shouldDoFullSync }
}
