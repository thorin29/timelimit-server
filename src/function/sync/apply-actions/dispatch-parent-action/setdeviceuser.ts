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

import { SetDeviceUserAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchSetDeviceUser ({ action, cache }: {
  action: SetDeviceUserAction
  cache: Cache
}) {
  if (action.userId !== '') {
    const doesUserExist = await cache.doesUserExist(action.userId)

    if (!doesUserExist) {
      throw new Error('invalid user id provided')
    }
  }

  const [affectedRows] = await cache.database.device.update({
    currentUserId: action.userId,
    isUserKeptSignedIn: false
  }, {
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    },
    transaction: cache.transaction
  })

  if (affectedRows !== 0) {
    cache.invalidiateDeviceList = true
    cache.areChangesImportant = true
  }
}
