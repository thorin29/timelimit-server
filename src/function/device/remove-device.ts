/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2026 Jonas Lochmann
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

import { Conflict } from 'http-errors'
import { SimpleDatabaseTransaction } from '../../database/simple'
import { generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { notifyClientsAboutChangesDelayed } from '../websocket'

export async function removeDevice ({ familyId, deviceId, websocket, transaction }: {
  transaction: SimpleDatabaseTransaction
  familyId: string
  deviceId: string
  websocket: WebsocketApi
}) {
  const deviceAuthToken = await transaction.device.getDeviceAuthTokenByDeviceId({ familyId, deviceId })

  if (deviceAuthToken === null) {
    throw new Conflict()
  }

  // remove as current device
  await transaction.user.updateCurrentDeviceForAllUsers({
    familyId,
    oldCurrentDeviceId: deviceId,
  })

  // add to old devices if it is not yet there
  await transaction.oldDevice.insertMissingTokens([ deviceAuthToken ])

  // remove from the device list
  await transaction.device.destroyByFamilyIdAndDeviceId({ familyId, deviceId })

  // invalidiate the caches
  await transaction.family.updateDeviceListVersion({
    deviceListVersion: generateVersionId(),
    familyId
  })

  // the device could have become unassigned during this
  await transaction.family.updateUserListVersion({
    userListVersion: generateVersionId(),
    familyId
  })

  await notifyClientsAboutChangesDelayed({
    transaction,
    websocket,
    familyId,
    sourceDeviceId: null,
    generalLevel: 1,
    targetedLevels: new Map()
  })

  transaction.enqueueAfterCommit(() => {
    websocket.triggerSyncByDeviceAuthToken({
      deviceAuthToken,
      isImportant: true
    })
  })
}
