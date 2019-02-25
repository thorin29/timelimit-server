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

export class SetCategoryForUnassignedAppsAction extends ParentAction {
  readonly childId: string
  readonly categoryId: string

  constructor ({ childId, categoryId }: {
    childId: string
    categoryId: string
  }) {
    super()

    assertIdWithinFamily(childId)

    if (categoryId !== '') {
      assertIdWithinFamily(categoryId)
    }

    this.childId = childId
    this.categoryId = categoryId
  }

  serialize = (): SerializedSetCategoryForUnassignedAppsAction => ({
    type: 'SET_CATEGORY_FOR_UNASSIGNED_APPS',
    childId: this.childId,
    categoryId: this.categoryId
  })

  static parse = ({ childId, categoryId }: SerializedSetCategoryForUnassignedAppsAction) => (
    new SetCategoryForUnassignedAppsAction({ childId, categoryId })
  )
}

export interface SerializedSetCategoryForUnassignedAppsAction {
  type: 'SET_CATEGORY_FOR_UNASSIGNED_APPS'
  childId: string
  categoryId: string
}
