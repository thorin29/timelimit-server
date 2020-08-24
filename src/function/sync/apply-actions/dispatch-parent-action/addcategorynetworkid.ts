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

import { AddCategoryNetworkIdAction } from '../../../../action'
import { maxNetworkIdsPerCategory } from '../../../../database/categorynetworkid'
import { Cache } from '../cache'

export async function dispatchAddCategoryNetworkId ({ action, cache }: {
  action: AddCategoryNetworkIdAction
  cache: Cache
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
    throw new Error('invalid category id for new rule')
  }

  const count = await cache.database.categoryNetworkId.count({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction
  })

  if (count + 1 > maxNetworkIdsPerCategory) {
    throw new Error('category network limit reached')
  }

  const hasOldItem = (await cache.database.categoryNetworkId.count({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId,
      networkItemId: action.itemId
    },
    transaction: cache.transaction
  })) !== 0

  if (hasOldItem) {
    throw new Error('id already used')
  }

  await cache.database.categoryNetworkId.create({
    familyId: cache.familyId,
    categoryId: action.categoryId,
    networkItemId: action.itemId,
    hashedNetworkId: action.hashedNetworkId
  }, { transaction: cache.transaction })

  cache.categoriesWithModifiedBaseData.push(action.categoryId)
  cache.areChangesImportant = true
}
