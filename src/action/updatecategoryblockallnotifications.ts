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

import { ParentAction } from './basetypes'
import { assertIdWithinFamily } from './meta/util'

const actionType = 'UpdateCategoryBlockAllNotificationsAction'

export class UpdateCategoryBlockAllNotificationsAction extends ParentAction {
  readonly categoryId: string
  readonly blocked: boolean

  constructor ({ categoryId, blocked }: {categoryId: string, blocked: boolean}) {
    super()

    assertIdWithinFamily({ actionType, field: 'categoryId', value: categoryId })

    this.categoryId = categoryId
    this.blocked = blocked
  }

  static parse = ({ categoryId, blocked }: SerializedUpdateCategoryBlockAllNotificationsAction) => (
    new UpdateCategoryBlockAllNotificationsAction({ categoryId, blocked })
  )
}

export interface SerializedUpdateCategoryBlockAllNotificationsAction {
  type: 'UPDATE_CATEGORY_BLOCK_ALL_NOTIFICATIONS'
  categoryId: string
  blocked: boolean
}
