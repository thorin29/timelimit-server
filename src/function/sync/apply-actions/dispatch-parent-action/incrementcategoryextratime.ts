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
import { IncrementCategoryExtraTimeAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchIncrementCategoryExtraTime ({ action, cache }: {
  action: IncrementCategoryExtraTimeAction
  cache: Cache
}) {
  if (!cache.hasFullVersion) {
    throw new Error('action requires full version')
  }

  const categoryEntryUnsafe = await cache.database.category.findOne({
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction,
    attributes: [
      'childId',
      'parentCategoryId'
    ]
  })

  if (!categoryEntryUnsafe) {
    throw new Error(`tried to add extra time to ${action.categoryId} but it does not exist`)
  }

  const categoryEntry = {
    childId: categoryEntryUnsafe.childId,
    parentCategoryId: categoryEntryUnsafe.parentCategoryId
  }

  await cache.database.category.update({
    extraTimeInMillis: Sequelize.literal(`extraTimeInMillis + ${action.addedExtraTime}`) as any
  }, {
    where: {
      familyId: cache.familyId,
      categoryId: action.categoryId
    },
    transaction: cache.transaction
  })

  cache.categoriesWithModifiedBaseData.push(action.categoryId)
  cache.areChangesImportant = true

  if (categoryEntry.parentCategoryId !== '') {
    const [affectedRows] = await cache.database.category.update({
      extraTimeInMillis: Sequelize.literal(`extraTimeInMillis + ${action.addedExtraTime}`) as any
    }, {
      where: {
        familyId: cache.familyId,
        categoryId: categoryEntry.parentCategoryId,
        childId: categoryEntry.childId
      },
      transaction: cache.transaction
    })

    if (affectedRows !== 0) {
      cache.categoriesWithModifiedBaseData.push(categoryEntry.parentCategoryId)
    }
  }
}
