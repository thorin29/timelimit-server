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

import { BadRequest, Unauthorized } from 'http-errors'
import { parseAppLogicAction, parseChildAction, parseParentAction } from '../../../action/serialization'
import { ClientPushChangesRequest } from '../../../api/schema'
import { isSerializedAppLogicAction, isSerializedChildAction, isSerializedParentAction } from '../../../api/validator'
import { VisibleConnectedDevicesManager } from '../../../connected-devices'
import { Database } from '../../../database'
import { UserFlags } from '../../../model/userflags'
import { EventHandler } from '../../../monitoring/eventhandler'
import { WebsocketApi } from '../../../websocket'
import { notifyClientsAboutChangesDelayed } from '../../websocket'
import { Cache } from './cache'
import { dispatchAppLogicAction } from './dispatch-app-logic-action'
import { dispatchChildAction } from './dispatch-child-action'
import { dispatchParentAction } from './dispatch-parent-action'
import { assertActionIntegrity } from './integrity'

export const applyActionsFromDevice = async ({ database, request, websocket, connectedDevicesManager, eventHandler }: {
  database: Database
  websocket: WebsocketApi
  request: ClientPushChangesRequest
  connectedDevicesManager: VisibleConnectedDevicesManager
  eventHandler: EventHandler
}): Promise<{ shouldDoFullSync: boolean }> => {
  eventHandler.countEvent('applyActionsFromDevice')

  if (request.actions.length > 50) {
    eventHandler.countEvent('applyActionsFromDevice tooMuchActionsPerRequest')

    throw new BadRequest()
  }

  return database.transaction(async (transaction) => {
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

    for (const action of request.actions) {
      if (action.sequenceNumber < nextSequenceNumber) {
        // action was already received

        eventHandler.countEvent('applyActionsFromDevice sequenceNumberRepeated')

        cache.requireFullSync()
        continue
      }

      try {
        await cache.subtransaction(async () => {
          // update the next sequence number
          nextSequenceNumber = action.sequenceNumber + 1

          const { isChildLimitAdding } = await assertActionIntegrity({
            deviceId: deviceEntry.deviceId,
            cache,
            eventHandler,
            action
          })

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
                deviceId: deviceEntry.deviceId,
                eventHandler
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

            eventHandler.countEvent('applyActionsFromDevice, childAddLimit: ' + isChildLimitAdding + ' action:' + parsedSerializedAction.type)

            const parsedAction = parseParentAction(parsedSerializedAction)

            try {
              if (isChildLimitAdding) {
                const deviceEntryUnsafe2 = await cache.database.device.findOne({
                  attributes: ['currentUserId'],
                  where: {
                    familyId: cache.familyId,
                    deviceId: deviceEntry.deviceId,
                    currentUserId: action.userId
                  },
                  transaction: cache.transaction
                })

                if (!deviceEntryUnsafe2) {
                  throw new Error('illegal state')
                }

                const deviceUserId = deviceEntryUnsafe2.currentUserId

                if (!deviceUserId) {
                  throw new Error('no device user id set but child add self limit action requested')
                }

                const deviceUserEntryUnsafe = await cache.database.user.findOne({
                  attributes: ['flags'],
                  where: {
                    familyId: cache.familyId,
                    userId: deviceUserId,
                    type: 'child'
                  },
                  transaction: cache.transaction
                })

                if (!deviceUserEntryUnsafe) {
                  throw new Error('no child user found for child limit adding action')
                }

                if ((parseInt(deviceUserEntryUnsafe.flags, 10) & UserFlags.ALLOW_SELF_LIMIT_ADD) !== UserFlags.ALLOW_SELF_LIMIT_ADD) {
                  throw new Error('child add limit action found but not allowed')
                }

                await dispatchParentAction({
                  action: parsedAction,
                  cache,
                  parentUserId: action.userId,
                  sourceDeviceId: deviceEntry.deviceId,
                  fromChildSelfLimitAddChildUserId: deviceUserId
                })
              } else {
                await dispatchParentAction({
                  action: parsedAction,
                  cache,
                  parentUserId: action.userId,
                  sourceDeviceId: deviceEntry.deviceId,
                  fromChildSelfLimitAddChildUserId: null
                })
              }
            } catch (ex) {
              eventHandler.countEvent('applyActionsFromDeviceWithError, childAddLimit: ' + isChildLimitAdding + ' action:' + parsedSerializedAction.type)

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
        })
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

    await notifyClientsAboutChangesDelayed({
      familyId: deviceEntry.familyId,
      sourceDeviceId: deviceEntry.deviceId,
      isImportant: cache.areChangesImportant,
      websocket,
      database,
      transaction
    })

    if (cache.areChangesImportant) {
      transaction.afterCommit(() => {
        eventHandler.countEvent('applyActionsFromDevice areChangesImportant')
      })
    }

    return {
      shouldDoFullSync: cache.shouldDoFullSync()
    }
  })
}
