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

import { assertIdWithinFamily } from '../util/token'
import { ParentAction } from './basetypes'

export class IncrementCategoryExtraTimeAction extends ParentAction {
  readonly categoryId: string
  readonly addedExtraTime: number
  readonly day: number

  constructor ({ categoryId, addedExtraTime, day }: {categoryId: string, addedExtraTime: number, day: number}) {
    super()

    assertIdWithinFamily(categoryId)

    if (addedExtraTime <= 0 || (!Number.isSafeInteger(addedExtraTime))) {
      throw new Error('must add some extra time with IncrementCategoryExtraTimeAction')
    }

    if (day < -1 || (!Number.isSafeInteger(day))) {
      throw Error('day must be valid')
    }

    this.categoryId = categoryId
    this.addedExtraTime = addedExtraTime
    this.day = day
  }

  static parse = ({ categoryId, addedExtraTime, day }: SerializedIncrementCategoryExtraTimeAction) => (
    new IncrementCategoryExtraTimeAction({ categoryId, addedExtraTime, day: day ?? -1 })
  )
}

export interface SerializedIncrementCategoryExtraTimeAction {
  type: 'INCREMENT_CATEGORY_EXTRATIME'
  categoryId: string
  addedExtraTime: number
  day?: number
}
