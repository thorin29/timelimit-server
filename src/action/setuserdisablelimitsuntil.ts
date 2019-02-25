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

export class SetUserDisableLimitsUntilAction extends ParentAction {
  readonly childId: string
  readonly timestamp: number

  constructor ({ childId, timestamp }: {
    childId: string
    timestamp: number
  }) {
    super()

    assertIdWithinFamily(childId)

    if (timestamp < 0 || (!Number.isSafeInteger(timestamp))) {
      throw new Error('timestamp for set user disabe limits until must be >= 0')
    }

    this.childId = childId
    this.timestamp = timestamp
  }

  serialize = (): SerializedSetUserDisableLimitsUntilAction => ({
    type: 'SET_USER_DISABLE_LIMITS_UNTIL',
    childId: this.childId,
    time: this.timestamp
  })

  static parse = ({ childId, time }: SerializedSetUserDisableLimitsUntilAction) => (
    new SetUserDisableLimitsUntilAction({
      childId,
      timestamp: time
    })
  )
}

export interface SerializedSetUserDisableLimitsUntilAction {
  type: 'SET_USER_DISABLE_LIMITS_UNTIL'
  childId: string
  time: number
}
