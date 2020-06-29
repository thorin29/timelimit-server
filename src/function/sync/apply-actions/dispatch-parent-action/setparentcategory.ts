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
import { Cache } from '../cache'

export async function dispatchSetParentCategory ({ action, cache }: {
  action: SetParentCategoryAction
  cache: Cache
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
