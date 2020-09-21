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

import { uniq } from 'lodash'
import { MinuteOfDay } from '../util/minuteofday'
import { assertIdWithinFamily } from '../util/token'
import { AppLogicAction } from './basetypes'

export class AddUsedTimeActionVersion2 extends AppLogicAction {
  readonly dayOfEpoch: number
  readonly items: Array<{
    readonly categoryId: string
    readonly timeToAdd: number
    readonly extraTimeToSubtract: number
    readonly additionalCountingSlots: Array<AddUsedTimeActionItemAdditionalCountingSlot>
    readonly sessionDurationLimits: Array<AddUsedTimeActionItemSessionDurationLimitSlot>
  }>
  readonly trustedTimestamp: number

  constructor ({ dayOfEpoch, items, trustedTimestamp }: {
    dayOfEpoch: number
    items: Array<{
      categoryId: string
      timeToAdd: number
      extraTimeToSubtract: number
      additionalCountingSlots: Array<AddUsedTimeActionItemAdditionalCountingSlot>
      sessionDurationLimits: Array<AddUsedTimeActionItemSessionDurationLimitSlot>
    }>
    trustedTimestamp: number
  }) {
    super()

    if (dayOfEpoch < 0 || (!Number.isSafeInteger(dayOfEpoch))) {
      throw new Error('illegal dayOfEpoch')
    }

    if (trustedTimestamp < 0 || (!Number.isSafeInteger(trustedTimestamp))) {
      throw new Error('illegal trustedTimestamp')
    }

    if (items.length === 0) {
      throw new Error('missing items')
    }

    if (items.length !== uniq(items.map((item) => item.categoryId)).length) {
      throw new Error('duplicate category ids')
    }

    items.forEach((item) => {
      assertIdWithinFamily(item.categoryId)

      if (item.timeToAdd < 0 || (!Number.isSafeInteger(item.timeToAdd))) {
        throw new Error('illegal timeToAdd')
      }

      if (item.extraTimeToSubtract < 0 || (!Number.isSafeInteger(item.extraTimeToSubtract))) {
        throw new Error('illegal extra time to subtract')
      }

      if (
        uniq(item.additionalCountingSlots.map((item) => JSON.stringify(item.serialize()))).length !==
        item.additionalCountingSlots.length
      ) {
        throw new Error()
      }

      if (
        uniq(item.sessionDurationLimits.map((item) => JSON.stringify(item.serialize()))).length !==
        item.sessionDurationLimits.length
      ) {
        throw new Error()
      }
    })

    this.dayOfEpoch = dayOfEpoch
    this.items = items
    this.trustedTimestamp = trustedTimestamp
  }

  static parse = ({ d, i, t }: SerializedAddUsedTimeActionVersion2) => (
    new AddUsedTimeActionVersion2({
      dayOfEpoch: d,
      items: i.map((item) => ({
        categoryId: item.categoryId,
        timeToAdd: item.tta,
        extraTimeToSubtract: item.etts,
        sessionDurationLimits: (item.sdl ?? []).map((item) => AddUsedTimeActionItemSessionDurationLimitSlot.parse(item)),
        additionalCountingSlots: (item.as ?? []).map((item) => AddUsedTimeActionItemAdditionalCountingSlot.parse(item))
      })),
      trustedTimestamp: t ?? 0
    })
  )
}

class AddUsedTimeActionItemAdditionalCountingSlot {
  readonly start: number
  readonly end: number

  constructor ({ start, end }: { start: number, end: number }) {
    if ((!Number.isSafeInteger(start)) || (!Number.isSafeInteger(end))) {
      throw new Error()
    }

    if (start < MinuteOfDay.MIN || end > MinuteOfDay.MAX || start > end) {
      throw new Error()
    }

    if (start === MinuteOfDay.MIN && end === MinuteOfDay.MAX) {
      throw new Error()
    }

    this.start = start
    this.end = end
  }

  serialize = () => [ this.start, this.end ]

  static parse = ([ start, end ]: [number, number]) => new AddUsedTimeActionItemAdditionalCountingSlot({ start, end })
}

class AddUsedTimeActionItemSessionDurationLimitSlot {
  readonly start: number
  readonly end: number
  readonly duration: number
  readonly pause: number

  constructor ({ start, end, duration, pause }: { start: number, end: number, duration: number, pause: number }) {
    if (
      (!Number.isSafeInteger(start)) || (!Number.isSafeInteger(end)) ||
      (!Number.isSafeInteger(duration)) || (!Number.isSafeInteger(pause))
    ) {
      throw new Error()
    }

    if (start < MinuteOfDay.MIN || end > MinuteOfDay.MAX || start > end) {
      throw new Error()
    }

    if (duration <= 0 || pause <= 0) {
      throw new Error()
    }

    this.start = start
    this.end = end
    this.duration = duration
    this.pause = pause
  }

  serialize = () => [ this.start, this.end, this.duration, this.pause ]

  static parse = ([ start, end, duration, pause ]: [number, number, number, number]) => new AddUsedTimeActionItemSessionDurationLimitSlot({ start, end, duration, pause })
}

export interface SerializedAddUsedTimeActionVersion2 {
  type: 'ADD_USED_TIME_V2'
  d: number
  i: Array<{
    categoryId: string
    tta: number
    etts: number
    // start, end
    as?: Array<[number, number]>
    // start, end, length, pause
    sdl?: Array<[number, number, number, number]>
  }>
  t?: number
}
