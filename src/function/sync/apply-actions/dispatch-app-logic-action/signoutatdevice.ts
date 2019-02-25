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

import { SetDeviceUserAction, SignOutAtDeviceAction } from '../../../../action'
import { Cache } from '../cache'
import { dispatchSetDeviceUser } from '../dispatch-parent-action/setdeviceuser'

export async function dispatchSignOutAtDevice ({ deviceId, action, cache }: {
  deviceId: string
  action: SignOutAtDeviceAction
  cache: Cache
}) {
  if (!cache.hasFullVersion) {
    throw new Error('action requires full version')
  }

  const deviceEntry = await cache.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId
    },
    transaction: cache.transaction
  })

  if (!deviceEntry) {
    throw new Error('illegal state: missing device which dispatched the action')
  }

  if (deviceEntry.defaultUserId === '') {
    throw new Error('no default user available')
  }

  if (deviceEntry.currentUserId !== deviceEntry.defaultUserId) {
    await dispatchSetDeviceUser({
      cache,
      action: new SetDeviceUserAction({
        deviceId,
        userId: deviceEntry.defaultUserId
      })
    })
  }
}
