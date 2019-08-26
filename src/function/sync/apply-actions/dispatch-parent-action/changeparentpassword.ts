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

import * as Sequelize from 'sequelize'
import { ChangeParentPasswordAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchChangeParentPassword ({ action, cache }: {
  action: ChangeParentPasswordAction
  cache: Cache
}) {
  const parentEntry = await cache.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.parentUserId,
      type: 'parent'
    },
    transaction: cache.transaction,
    lock: Sequelize.Transaction.LOCK.UPDATE
  })

  if (!parentEntry) {
    throw new Error('parent entry not found')
  }

  action.assertIntegrityValid({ oldPasswordSecondHash: parentEntry.secondPasswordHash })
  const newSecondPasswordHash = action.decryptSecondHash({ oldPasswordSecondHash: parentEntry.secondPasswordHash })

  parentEntry.passwordHash = action.newPasswordFirstHash
  parentEntry.secondPasswordSalt = action.newPasswordSecondSalt
  parentEntry.secondPasswordHash = newSecondPasswordHash

  await parentEntry.save({ transaction: cache.transaction })

  {
    const clear = cache.getSecondPasswordHashOfParent.cache.clear
    clear && clear()
  }

  cache.invalidiateUserList = true
  cache.areChangesImportant = true
}
