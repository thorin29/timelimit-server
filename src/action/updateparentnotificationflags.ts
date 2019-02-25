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

export class UpdateParentNotificationFlagsAction extends ParentAction {
  readonly parentId: string
  readonly flags: number
  readonly set: boolean

  constructor ({ parentId, flags, set }: {
    parentId: string
    flags: number
    set: boolean
  }) {
    super()

    assertIdWithinFamily(parentId)

    if (!Number.isSafeInteger(flags)) {
      throw new Error('flags must be an integer')
    }

    if (flags < 0 || flags > 1) {
      throw new Error('flags are out of the valid range')
    }

    this.parentId = parentId
    this.flags = flags
    this.set = set
  }

  serialize = (): SerializedUpdateParentNotificationFlagsAction => ({
    type: 'UPDATE_PARENT_NOTIFICATION_FLAGS',
    parentId: this.parentId,
    flags: this.flags,
    set: this.set
  })

  static parse = ({ parentId, flags, set }: SerializedUpdateParentNotificationFlagsAction) => (
    new UpdateParentNotificationFlagsAction({ parentId, flags, set })
  )
}

export interface SerializedUpdateParentNotificationFlagsAction {
  type: 'UPDATE_PARENT_NOTIFICATION_FLAGS'
  parentId: string
  flags: number
  set: boolean
}
