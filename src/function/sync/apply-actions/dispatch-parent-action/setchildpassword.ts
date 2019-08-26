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
import { SetChildPasswordAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchSetChildPassword ({ action, cache }: {
  action: SetChildPasswordAction
  cache: Cache
}) {
  const childEntry = await cache.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.childUserId,
      type: 'child'
    },
    transaction: cache.transaction,
    lock: Sequelize.Transaction.LOCK.UPDATE
  })

  if (!childEntry) {
    throw new Error('parent entry not found')
  }

  childEntry.passwordHash = action.newPassword.hash
  childEntry.secondPasswordSalt = action.newPassword.secondSalt
  childEntry.secondPasswordHash = action.newPassword.secondHash

  await childEntry.save({ transaction: cache.transaction })

  {
    const clear = cache.getSecondPasswordHashOfChild.cache.clear
    clear && clear()
  }

  cache.invalidiateUserList = true
  cache.areChangesImportant = true
}
