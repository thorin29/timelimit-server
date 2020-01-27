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
import { assertIdWithinFamily } from '../util/token'
import { AppLogicAction } from './basetypes'

export class AddUsedTimeActionVersion2 extends AppLogicAction {
  readonly dayOfEpoch: number
  readonly items: Array<{
    readonly categoryId: string
    readonly timeToAdd: number
    readonly extraTimeToSubtract: number
  }>

  constructor ({ dayOfEpoch, items }: {
    dayOfEpoch: number
    items: Array<{
      categoryId: string
      timeToAdd: number
      extraTimeToSubtract: number
    }>
  }) {
    super()

    if (dayOfEpoch < 0 || (!Number.isSafeInteger(dayOfEpoch))) {
      throw new Error('illegal dayOfEpoch')
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
    })

    this.dayOfEpoch = dayOfEpoch
    this.items = items
  }

  serialize = (): SerializedAddUsedTimeActionVersion2 => ({
    type: 'ADD_USED_TIME_V2',
    d: this.dayOfEpoch,
    i: this.items.map((item) => ({
      categoryId: item.categoryId,
      tta: item.timeToAdd,
      etts: item.extraTimeToSubtract
    }))
  })

  static parse = ({ d, i }: SerializedAddUsedTimeActionVersion2) => (
    new AddUsedTimeActionVersion2({
      dayOfEpoch: d,
      items: i.map((item) => ({
        categoryId: item.categoryId,
        timeToAdd: item.tta,
        extraTimeToSubtract: item.etts
      }))
    })
  )
}

export interface SerializedAddUsedTimeActionVersion2 {
  type: 'ADD_USED_TIME_V2'
  d: number
  i: Array<{
    categoryId: string
    tta: number
    etts: number
  }>
}
