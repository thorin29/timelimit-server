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

import { SetKeepSignedInAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchSetKeepSignedIn ({ action, cache, parentUserId }: {
  action: SetKeepSignedInAction
  cache: Cache
  parentUserId: string
}) {
  const doesUserExist = await cache.doesUserExist(parentUserId)

  if (!doesUserExist) {
    throw new Error('invalid user id provided')
  }

  const deviceEntry = await cache.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    },
    transaction: cache.transaction
  })

  if (!deviceEntry) {
    throw new Error('device does not exist')
  }

  if (deviceEntry.currentUserId !== parentUserId) {
    if (action.keepSignedIn) {
      throw new Error('only the user itself can disable asking for the password')
    }
  }

  const [affectedRows] = await cache.database.device.update({
    isUserKeptSignedIn: action.keepSignedIn
  }, {
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId,
      currentUserId: deviceEntry.currentUserId
    },
    transaction: cache.transaction
  })

  if (affectedRows !== 0) {
    cache.invalidiateDeviceList = true
    cache.areChangesImportant = true
  }
}
