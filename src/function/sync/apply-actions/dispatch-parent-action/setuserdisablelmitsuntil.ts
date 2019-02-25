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

import { SetUserDisableLimitsUntilAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchUserSetDisableLimitsUntil ({ action, cache }: {
  action: SetUserDisableLimitsUntilAction
  cache: Cache
}) {
  if (action.timestamp !== 0) {
    if (!cache.hasFullVersion) {
      throw new Error('action requires full version')
    }
  }

  const [affectedRows] = await cache.database.user.update({
    disableTimelimitsUntil: action.timestamp.toString(10)
  }, {
    where: {
      familyId: cache.familyId,
      userId: action.childId,
      type: 'child'
    },
    transaction: cache.transaction
  })

  if (affectedRows === 0) {
    throw new Error('invalid user id provided')
  }

  cache.invalidiateUserList = true
  cache.areChangesImportant = true
}
