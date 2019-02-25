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

import { SetConsiderRebootManipulationAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchSetConsiderRebootManipulation ({ action, cache }: {
  action: SetConsiderRebootManipulationAction
  cache: Cache
}) {
  const [affectedRows] = await cache.database.device.update({
    considerRebootManipulation: action.enable
  }, {
    transaction: cache.transaction,
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    }
  })

  if (affectedRows === 0) {
    throw new Error('did not find device to update consider reboot manipulation')
  }

  cache.invalidiateDeviceList = true
  cache.areChangesImportant = true
}
