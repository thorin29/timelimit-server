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
import { ParentAction } from './basetypes'

export class UpdateCategorySortingAction extends ParentAction {
  readonly categoryIds: Array<string>

  constructor ({ categoryIds }: {
    categoryIds: Array<string>
  }) {
    super()

    if (categoryIds.length === 0) {
      throw new Error('empty category sorting list')
    }

    if (uniq(categoryIds).length !== categoryIds.length) {
      throw new Error('category sorting list has duplicates')
    }

    categoryIds.forEach((categoryId) => assertIdWithinFamily(categoryId))

    this.categoryIds = categoryIds
  }

  serialize = (): SerializedUpdateCategorySortingAction => ({
    type: 'UPDATE_CATEGORY_SORTING',
    categoryIds: this.categoryIds
  })

  static parse = ({ categoryIds }: SerializedUpdateCategorySortingAction) => (
    new UpdateCategorySortingAction({ categoryIds })
  )
}

export interface SerializedUpdateCategorySortingAction {
  type: 'UPDATE_CATEGORY_SORTING'
  categoryIds: Array<string>
}
