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
    const parentCategoryEntry = await cache.database.category.findOne({
      where: {
        familyId: cache.familyId,
        categoryId: action.parentCategory,
        childId: categoryEntry.childId
      },
      transaction: cache.transaction
    })

    if (!parentCategoryEntry) {
      throw new Error('tried to set parent category to non existent category')
    }

    if (parentCategoryEntry.parentCategoryId !== '') {
      throw new Error('tried to set a category as parent which itself has got a parent')
    }

    const countChildCategories = await cache.database.category.findAndCountAll({
      where: {
        familyId: cache.familyId,
        parentCategoryId: action.categoryId
      },
      transaction: cache.transaction
    })

    if (countChildCategories.count > 0) {
      throw new Error('tried to make category a child category altough it is already a parent category')
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
