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

export class SetCategoryExtraTimeAction extends ParentAction {
  readonly categoryId: string
  readonly newExtraTime: number

  constructor ({ categoryId, newExtraTime }: {categoryId: string, newExtraTime: number}) {
    super()

    assertIdWithinFamily(categoryId)

    if (newExtraTime < 0 || (!Number.isSafeInteger(newExtraTime))) {
      throw Error('newExtraTime must be >= 0')
    }

    this.categoryId = categoryId
    this.newExtraTime = newExtraTime
  }

  serialize = (): SerializedSetCategoryExtraTimeAction => ({
    type: 'SET_CATEGORY_EXTRA_TIME',
    categoryId: this.categoryId,
    newExtraTime: this.newExtraTime
  })

  static parse = ({ categoryId, newExtraTime }: SerializedSetCategoryExtraTimeAction) => (
    new SetCategoryExtraTimeAction({ categoryId, newExtraTime })
  )
}

export interface SerializedSetCategoryExtraTimeAction {
  type: 'SET_CATEGORY_EXTRA_TIME'
  categoryId: string
  newExtraTime: number
}
