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

import { assertIdWithinFamily } from '../util/token'

export class TimelimitRule {
  readonly ruleId: string
  readonly categoryId: string
  readonly maxTimeInMillis: number
  readonly dayMask: number  // stored as bitmask
  readonly applyToExtraTimeUsage: boolean

  constructor ({ ruleId, categoryId, maxTimeInMillis, dayMask, applyToExtraTimeUsage }: {
    ruleId: string
    categoryId: string
    maxTimeInMillis: number
    dayMask: number
    applyToExtraTimeUsage: boolean
  }) {
    this.ruleId = ruleId
    this.categoryId = categoryId
    this.maxTimeInMillis = maxTimeInMillis
    this.dayMask = dayMask
    this.applyToExtraTimeUsage = applyToExtraTimeUsage

    assertIdWithinFamily(ruleId)
    assertIdWithinFamily(categoryId)

    if (maxTimeInMillis < 0 || (!Number.isSafeInteger(maxTimeInMillis))) {
      throw new Error('maxTimeInMillis must be >= 0')
    }

    if (!(
      Number.isSafeInteger(dayMask) ||
      dayMask < 0 ||
      dayMask > (1 | 2 | 4 | 8 | 16 | 32 | 64)
    )) {
      throw new Error('invalid day mask')
    }
  }

  serialize = (): SerializedTimeLimitRule => ({
    ruleId: this.ruleId,
    categoryId: this.categoryId,
    time: this.maxTimeInMillis,
    days: this.dayMask,
    extraTime: this.applyToExtraTimeUsage
  })

  static parse = ({ ruleId, categoryId, time, days, extraTime }: SerializedTimeLimitRule) => (
    new TimelimitRule({
      ruleId,
      categoryId,
      maxTimeInMillis: time,
      dayMask: days,
      applyToExtraTimeUsage: extraTime
    })
  )
}

export interface SerializedTimeLimitRule {
  ruleId: string
  categoryId: string
  time: number
  days: number
  extraTime: boolean
}
