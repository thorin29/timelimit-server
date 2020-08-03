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

import { SetParentCategoryAction } from '../../../../action'
import { getCategoryWithParentCategories } from '../../../../util/category'
import { Cache } from '../cache'

export async function dispatchSetParentCategory ({ action, cache, fromChildSelfLimitAddChildUserId }: {
  action: SetParentCategoryAction
  cache: Cache
  fromChildSelfLimitAddChildUserId: string | null
}) {
  const categoryEntry = await cache.database.category.findOne({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction
  })

  if (!categoryEntry) {
    throw new Error('tried to set parent category of non existent category')
  }

  if (fromChildSelfLimitAddChildUserId !== null) {
    if (categoryEntry.childId !== fromChildSelfLimitAddChildUserId) {
      throw new Error('can not set parent category for other user')
    }
  }

  if (action.parentCategory !== '') {
    const categoriesByUserId = (await cache.database.category.findAll({
      where: {
        familyId: cache.familyId,
        childId: categoryEntry.childId
      },
      attributes: ['categoryId', 'parentCategoryId'],
      transaction: cache.transaction
    })).map((item) => ({
      categoryId: item.categoryId,
      parentCategoryId: item.parentCategoryId
    }))

    if (categoriesByUserId.find((item) => item.categoryId === action.parentCategory) === undefined) {
      throw new Error('selected parent category does not exist')
    }

    const childCategoryIds = new Set<string>()

    {
      const processedCategoryIds = new Set<string>()

      const handle = (currentCategoryId: string) => {
        if (processedCategoryIds.has(currentCategoryId)) return
        processedCategoryIds.add(currentCategoryId)

        const childCategories = categoriesByUserId.filter((item) => item.parentCategoryId === currentCategoryId)

        childCategories.forEach((childCategory) => {
          childCategoryIds.add(childCategory.categoryId)
          handle(childCategory.categoryId)
        })
      }

      handle(action.categoryId)
    }

    if (childCategoryIds.has(action.parentCategory) || action.parentCategory === action.categoryId) {
      throw new Error('can not set a category as parent which is a child of the category')
    }

    if (fromChildSelfLimitAddChildUserId !== null) {
      const ownParentCategory = categoriesByUserId.find((item) => item.categoryId === categoryEntry.parentCategoryId)
      const enableDueToLimitAddingWhenChild = ownParentCategory === undefined ||
        getCategoryWithParentCategories(categoriesByUserId, action.parentCategory).indexOf(ownParentCategory.categoryId) !== -1

      if (!enableDueToLimitAddingWhenChild) {
        throw new Error('can not change parent categories in a way which reduces limits')
      }
    }
  }

  await cache.database.category.update({
    parentCategoryId: action.parentCategory
  }, {
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction
  })

  cache.categoriesWithModifiedBaseData.push(action.categoryId)
  cache.areChangesImportant = true
}
