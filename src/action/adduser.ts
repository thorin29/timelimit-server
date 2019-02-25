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

export class AddUserAction extends ParentAction {
  readonly userId: string
  readonly name: string
  readonly userType: 'parent' | 'child'
  readonly password?: ParentPassword
  readonly timeZone: string

  constructor ({ userId, name, userType, password, timeZone }: {
    userId: string
    name: string
    userType: 'parent' | 'child'
    password?: ParentPassword
    timeZone: string
  }) {
    super()

    assertIdWithinFamily(userId)

    this.userId = userId
    this.name = name
    this.userType = userType
    this.password = password
    this.timeZone = timeZone

    if (userType === 'parent') {
      if (!password) {
        throw new Error('parent users must have got an password')
      }
    }

    if (password) {
      assertParentPasswordValid(password)
    }
  }

  serialize = (): SerializedAddUserAction => ({
    type: 'ADD_USER',
    name: this.name,
    userType: this.userType,
    userId: this.userId,
    password: this.password,
    timeZone: this.timeZone
  })

  static parse = ({ name, userId, userType, password, timeZone }: SerializedAddUserAction) => (
    new AddUserAction({
      name,
      userId,
      userType,
      password,
      timeZone
    })
  )
}

export interface SerializedAddUserAction {
  type: 'ADD_USER'
  name: string
  userType: 'parent' | 'child'
  userId: string
  password?: ParentPassword
  timeZone: string
}
