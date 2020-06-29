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

import * as Sequelize from 'sequelize'
import { AddCategoryAppsAction } from '../../../../action'
import { CategoryAppAttributes } from '../../../../database/categoryapp'
import { Cache } from '../cache'

export async function dispatchAddCategoryApps ({ action, cache }: {
  action: AddCategoryAppsAction
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
    throw new Error('invalid category id')
  }

  const { childId } = categoryEntryUnsafe

  const categoriesOfSameChild = await cache.database.category.findAll({
    where: {
      familyId: cache.familyId,
      childId
    },
    attributes: ['categoryId'],
    transaction: cache.transaction
  }).map((item) => ({ categoryId: item.categoryId }))

  const oldCategories = await cache.database.categoryApp.findAll({
    attributes: [ 'categoryId' ],
    group: [ 'categoryId' ],
    where: {
      familyId: cache.familyId,
      categoryId: {
        [Sequelize.Op.in]: categoriesOfSameChild.map((item) => item.categoryId)
      },
      packageName: {
        [Sequelize.Op.in]: action.packageNames
      }
    },
    transaction: cache.transaction
  }).map((item) => item.categoryId)

  if (oldCategories.length > 0) {
    await cache.database.categoryApp.destroy({
      where: {
        familyId: cache.familyId,
        categoryId: {
          [Sequelize.Op.in]: categoriesOfSameChild.map((item) => item.categoryId)
        },
        packageName: {
          [Sequelize.Op.in]: action.packageNames
        }
      },
      transaction: cache.transaction
    })
  }

  await cache.database.categoryApp.bulkCreate(
    action.packageNames.map((packageName): CategoryAppAttributes => ({
      familyId: cache.familyId,
      categoryId: action.categoryId,
      packageName
    })),
    {
      transaction: cache.transaction
    }
  )

  oldCategories.forEach((categoryId) => cache.categoriesWithModifiedApps.push(categoryId))
  cache.categoriesWithModifiedApps.push(action.categoryId)
  cache.areChangesImportant = true
}
