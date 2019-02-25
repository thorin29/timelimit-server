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

import { assertParentPasswordValid, ParentPassword } from '../api/schema'
import { assertIdWithinFamily } from '../util/token'
import { ParentAction } from './basetypes'

export class SetChildPasswordAction extends ParentAction {
  readonly childUserId: string
  readonly newPassword: ParentPassword

  constructor ({ childUserId, newPassword }: {
    childUserId: string
    newPassword: ParentPassword
  }) {
    super()

    assertIdWithinFamily(childUserId)
    assertParentPasswordValid(newPassword)

    this.childUserId = childUserId
    this.newPassword = newPassword
  }

  serialize = (): SerializedSetChildPasswordAction => ({
    type: 'SET_CHILD_PASSWORD',
    childId: this.childUserId,
    newPassword: this.newPassword
  })

  static parse = ({ childId, newPassword }: SerializedSetChildPasswordAction) => (
    new SetChildPasswordAction({
      childUserId: childId,
      newPassword
    })
  )
}

export interface SerializedSetChildPasswordAction {
  type: 'SET_CHILD_PASSWORD'
  childId: string
  newPassword: ParentPassword
}
