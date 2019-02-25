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
import { ChildChangePasswordAction } from '../../../../action'
import { Cache } from '../cache'

export const dispatchChildChangePassword = async ({ action, childUserId, cache }: {
  action: ChildChangePasswordAction
  childUserId: string
  cache: Cache
}) => {
  const childEntry = await cache.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: childUserId,
      type: 'child'
    },
    transaction: cache.transaction,
    lock: Sequelize.Transaction.LOCK.UPDATE
  })

  if (!childEntry) {
    throw new Error('child entry not found')
  }

  childEntry.passwordHash = action.password.hash
  childEntry.secondPasswordSalt = action.password.secondSalt
  childEntry.secondPasswordHash = action.password.secondHash

  await childEntry.save({ transaction: cache.transaction })

  cache.getSecondPasswordHashOfChild.cache.clear()
  cache.invalidiateUserList = true
  cache.areChangesImportant = true
}
