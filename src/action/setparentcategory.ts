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

export class SetParentCategoryAction extends ParentAction {
  readonly categoryId: string
  readonly parentCategory: string

  constructor ({ categoryId, parentCategory }: {
    categoryId: string
    parentCategory: string
  }) {
    super()

    assertIdWithinFamily(categoryId)

    if (parentCategory !== '') {
      assertIdWithinFamily(parentCategory)
    }

    this.categoryId = categoryId
    this.parentCategory = parentCategory
  }

  serialize = (): SerializedSetParentCategoryAction => ({
    type: 'SET_PARENT_CATEGORY',
    categoryId: this.categoryId,
    parentCategory: this.parentCategory
  })

  static parse = ({ categoryId, parentCategory }: SerializedSetParentCategoryAction) => (
    new SetParentCategoryAction({
      categoryId,
      parentCategory
    })
  )
}

export interface SerializedSetParentCategoryAction {
  type: 'SET_PARENT_CATEGORY'
  categoryId: string
  parentCategory: string
}
