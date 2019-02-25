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
import { ParentAction } from './basetypes'

export class UpdateTimelimitRuleAction extends ParentAction {
  readonly ruleId: string
  readonly maximumTimeInMillis: number
  readonly dayMask: number
  readonly applyToExtraTimeUsage: boolean

  constructor ({ ruleId, maximumTimeInMillis, dayMask, applyToExtraTimeUsage }: {
    ruleId: string
    maximumTimeInMillis: number
    dayMask: number
    applyToExtraTimeUsage: boolean
  }) {
    super()

    this.ruleId = ruleId
    this.maximumTimeInMillis = maximumTimeInMillis
    this.dayMask = dayMask
    this.applyToExtraTimeUsage = applyToExtraTimeUsage

    assertIdWithinFamily(ruleId)

    if (maximumTimeInMillis < 0 || (!Number.isSafeInteger(maximumTimeInMillis))) {
      throw new Error('maximumTimeInMillis must be >= 0')
    }

    if (!(
      Number.isSafeInteger(dayMask) ||
      dayMask < 0 ||
      dayMask > (1 | 2 | 4 | 8 | 16 | 32 | 64)
    )) {
      throw new Error('invalid day mask')
    }
  }

  serialize = (): SerializedUpdateTimelimitRuleAction => ({
    type: 'UPDATE_TIMELIMIT_RULE',
    ruleId: this.ruleId,
    time: this.maximumTimeInMillis,
    days: this.dayMask,
    extraTime: this.applyToExtraTimeUsage
  })

  static parse = ({ ruleId, time, days, extraTime }: SerializedUpdateTimelimitRuleAction) => (
    new UpdateTimelimitRuleAction({
      ruleId,
      maximumTimeInMillis: time,
      dayMask: days,
      applyToExtraTimeUsage: extraTime
    })
  )
}

export interface SerializedUpdateTimelimitRuleAction {
  type: 'UPDATE_TIMELIMIT_RULE'
  ruleId: string
  time: number
  days: number
  extraTime: boolean
}
