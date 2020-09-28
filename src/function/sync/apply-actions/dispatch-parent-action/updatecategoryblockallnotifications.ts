/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2020 Jonas Lochmann
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

import { UpdateCategoryBlockAllNotificationsAction } from '../../../../action'
import { Cache } from '../cache'
import { MissingCategoryException } from '../exception/missing-item'
import { CanNotModifyOtherUsersBySelfLimitationException, SelfLimitationException } from '../exception/self-limit'

export async function dispatchUpdateCategoryBlockAllNotifications ({ action, cache, fromChildSelfLimitAddChildUserId }: {
  action: UpdateCategoryBlockAllNotificationsAction
  cache: Cache
  fromChildSelfLimitAddChildUserId: string | null
}) {
  const categoryEntryUnsafe = await cache.database.category.findOne({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction,
    attributes: ['childId']
  })

  if (!categoryEntryUnsafe) {
    throw new MissingCategoryException()
  }

  if (fromChildSelfLimitAddChildUserId !== null) {
    if (fromChildSelfLimitAddChildUserId !== categoryEntryUnsafe.childId) {
      throw new CanNotModifyOtherUsersBySelfLimitationException()
    }

    if (!action.blocked) {
      throw new SelfLimitationException({ staticMessage: 'can not disable notification filter as child' })
    }
  }

  const [affectedRows] = await cache.database.category.update({
    blockAllNotifications: action.blocked
  }, {
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction
  })

  if (affectedRows !== 0) {
    cache.categoriesWithModifiedBaseData.push(action.categoryId)
    cache.areChangesImportant = true
  }
}
