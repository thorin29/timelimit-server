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

import { MinuteOfDay } from '../util/minuteofday'
import { assertIdWithinFamily } from '../util/token'
import { ParentAction } from './basetypes'

export class UpdateTimelimitRuleAction extends ParentAction {
  readonly ruleId: string
  readonly maximumTimeInMillis: number
  readonly dayMask: number
  readonly applyToExtraTimeUsage: boolean
  readonly start: number
  readonly end: number
  readonly sessionDurationMilliseconds: number
  readonly sessionPauseMilliseconds: number

  constructor ({
    ruleId, maximumTimeInMillis, dayMask, applyToExtraTimeUsage,
    start, end, sessionDurationMilliseconds, sessionPauseMilliseconds
  }: {
    ruleId: string
    maximumTimeInMillis: number
    dayMask: number
    applyToExtraTimeUsage: boolean
    start: number
    end: number
    sessionDurationMilliseconds: number
    sessionPauseMilliseconds: number
  }) {
    super()

    this.ruleId = ruleId
    this.maximumTimeInMillis = maximumTimeInMillis
    this.dayMask = dayMask
    this.applyToExtraTimeUsage = applyToExtraTimeUsage
    this.start = start
    this.end = end
    this.sessionDurationMilliseconds = sessionDurationMilliseconds
    this.sessionPauseMilliseconds = sessionPauseMilliseconds

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

    if (
      (!Number.isSafeInteger(start)) ||
      (!Number.isSafeInteger(end)) ||
      (!Number.isSafeInteger(sessionDurationMilliseconds)) ||
      (!Number.isSafeInteger(sessionPauseMilliseconds))
    ) {
      throw new Error()
    }

    if (start < MinuteOfDay.MIN || end > MinuteOfDay.MAX || start > end) {
      throw new Error()
    }

    if (sessionDurationMilliseconds < 0 || sessionPauseMilliseconds < 0) {
      throw new Error()
    }
  }

  static parse = ({ ruleId, time, days, extraTime, start, end, dur, pause }: SerializedUpdateTimelimitRuleAction) => (
    new UpdateTimelimitRuleAction({
      ruleId,
      maximumTimeInMillis: time,
      dayMask: days,
      applyToExtraTimeUsage: extraTime,
      start: start ?? MinuteOfDay.MIN,
      end: end ?? MinuteOfDay.MAX,
      sessionDurationMilliseconds: dur ?? 0,
      sessionPauseMilliseconds: pause ?? 0
    })
  )
}

export interface SerializedUpdateTimelimitRuleAction {
  type: 'UPDATE_TIMELIMIT_RULE'
  ruleId: string
  time: number
  days: number
  extraTime: boolean
  start?: number
  end?: number
  dur?: number
  pause?: number
}
