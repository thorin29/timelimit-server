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
import { AppLogicAction } from './basetypes'

export class AddUsedTimeAction extends AppLogicAction {
  readonly categoryId: string
  readonly dayOfEpoch: number
  readonly timeToAdd: number
  readonly extraTimeToSubtract: number

  constructor ({ categoryId, dayOfEpoch, timeToAdd, extraTimeToSubtract }: {
    categoryId: string
    dayOfEpoch: number
    timeToAdd: number
    extraTimeToSubtract: number
  }) {
    super()

    assertIdWithinFamily(categoryId)

    if (dayOfEpoch < 0 || (!Number.isSafeInteger(dayOfEpoch))) {
      throw new Error('illegal dayOfEpoch')
    }

    if (timeToAdd < 0 || (!Number.isSafeInteger(timeToAdd))) {
      throw new Error('illegal timeToAdd')
    }

    if (extraTimeToSubtract < 0 || (!Number.isSafeInteger(extraTimeToSubtract))) {
      throw new Error('illegal extra time to subtract')
    }

    this.categoryId = categoryId
    this.dayOfEpoch = dayOfEpoch
    this.timeToAdd = timeToAdd
    this.extraTimeToSubtract = extraTimeToSubtract
  }

  serialize = (): SerializedAddUsedTimeAction => ({
    type: 'ADD_USED_TIME',
    categoryId: this.categoryId,
    day: this.dayOfEpoch,
    timeToAdd: this.timeToAdd,
    extraTimeToSubtract: this.extraTimeToSubtract
  })

  static parse = ({ categoryId, day, timeToAdd, extraTimeToSubtract }: SerializedAddUsedTimeAction) => (
    new AddUsedTimeAction({
      categoryId,
      dayOfEpoch: day,
      timeToAdd,
      extraTimeToSubtract
    })
  )
}

export interface SerializedAddUsedTimeAction {
  type: 'ADD_USED_TIME'
  categoryId: string
  day: number
  timeToAdd: number
  extraTimeToSubtract: number
}
