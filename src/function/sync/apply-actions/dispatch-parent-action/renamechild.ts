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

import { RenameChildAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchRenameChild ({ action, cache }: {
  action: RenameChildAction
  cache: Cache
}) {
  const [affectedRows] = await cache.database.user.update({
    name: action.newName
  }, {
    where: {
      familyId: cache.familyId,
      userId: action.childId,
      type: 'child'
    },
    transaction: cache.transaction
  })

  if (affectedRows !== 1) {
    throw new Error('can not update child name if child does not exist')
  }

  cache.invalidiateUserList = true
  cache.doesUserExist.cache.set(action.childId, false)
}
