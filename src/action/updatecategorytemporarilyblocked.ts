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

export class UpdateCategoryTemporarilyBlockedAction extends ParentAction {
  readonly categoryId: string
  readonly blocked: boolean
  readonly endTime?: number

  constructor ({ categoryId, blocked, endTime }: {
    categoryId: string
    blocked: boolean
    endTime?: number
  }) {
    super()

    assertIdWithinFamily(categoryId)

    if (endTime !== undefined) {
      if (!Number.isSafeInteger(endTime)) {
        throw new Error()
      }

      if (!blocked) {
        throw new Error()
      }
    }

    this.categoryId = categoryId
    this.blocked = blocked
    this.endTime = endTime
  }

  serialize = (): SerializedUpdateCategoryTemporarilyBlockedAction => ({
    type: 'UPDATE_CATEGORY_TEMPORARILY_BLOCKED',
    categoryId: this.categoryId,
    blocked: this.blocked,
    endTime: this.endTime
  })

  static parse = ({ categoryId, blocked, endTime }: SerializedUpdateCategoryTemporarilyBlockedAction) => (
    new UpdateCategoryTemporarilyBlockedAction({ categoryId, blocked, endTime })
  )
}

export interface SerializedUpdateCategoryTemporarilyBlockedAction {
  type: 'UPDATE_CATEGORY_TEMPORARILY_BLOCKED'
  categoryId: string
  blocked: boolean
  endTime?: number
}
