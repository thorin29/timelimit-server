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

import { SetSendDeviceConnected } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchSetSendDeviceConnected ({ action, cache, sourceDeviceId }: {
  action: SetSendDeviceConnected
  cache: Cache
  sourceDeviceId: string | null
}) {
  if (sourceDeviceId === null || action.deviceId !== sourceDeviceId) {
    throw new Error('only can do that from the device itself')
  }

  const [affectedRows] = await cache.database.device.update({
    showDeviceConnected: action.enable
  }, {
    transaction: cache.transaction,
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    }
  })

  if (affectedRows === 0) {
    throw new Error('did not find device to update send if connected')
  }

  cache.devicesWithModifiedShowDeviceConnected.set(action.deviceId, action.enable)
  cache.invalidiateDeviceList = true
}
