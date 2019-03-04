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

import { CreateCategoryAction } from '../../../../action'
import { generateVersionId } from '../../../../util/token'
import { Cache } from '../cache'

export async function dispatchCreateCategory ({ action, cache }: {
  action: CreateCategoryAction
  cache: Cache
}) {
  // check that the child exists
  const childEntry = await cache.database.user.findOne({
    where: {
      familyId: cache.familyId,
      userId: action.childId,
      type: 'child'
    },
    transaction: cache.transaction
  })

  if (!childEntry) {
    throw new Error('missing child for new category')
  }

  // no version number needs to be updated
  await cache.database.category.create({
    familyId: cache.familyId,
    categoryId: action.categoryId,
    childId: action.childId,
    title: action.title,
    blockedMinutesInWeek: '',
    temporarilyBlocked: false,
    extraTimeInMillis: 0,
    timeLimitRulesVersion: generateVersionId(),
    baseVersion: generateVersionId(),
    assignedAppsVersion: generateVersionId(),
    usedTimesVersion: generateVersionId(),
    parentCategoryId: '',
    blockAllNotifications: false
  }, { transaction: cache.transaction })

  // update the cache
  cache.doesCategoryExist.cache.set(action.categoryId, true)
  cache.areChangesImportant = true
}
