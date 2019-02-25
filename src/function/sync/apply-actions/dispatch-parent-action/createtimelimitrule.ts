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

import { CreateTimeLimitRuleAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchCreateTimeLimitRule ({ action, cache }: {
  action: CreateTimeLimitRuleAction
  cache: Cache
}) {
  const doesCategoryExist = await cache.doesCategoryExist(action.rule.categoryId)

  if (!doesCategoryExist) {
    throw new Error('invalid category id for new rule')
  }

  await cache.database.timelimitRule.create({
    familyId: cache.familyId,
    ruleId: action.rule.ruleId,
    categoryId: action.rule.categoryId,
    applyToExtraTimeUsage: action.rule.applyToExtraTimeUsage,
    maximumTimeInMillis: action.rule.maxTimeInMillis,
    dayMaskAsBitmask: action.rule.dayMask
  }, { transaction: cache.transaction })

  cache.categoriesWithModifiedTimeLimitRules.push(action.rule.categoryId)
  cache.areChangesImportant = true
}
