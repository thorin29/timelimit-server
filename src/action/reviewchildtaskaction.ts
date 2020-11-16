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
import { assertIdWithinFamily, assertSafeInteger, throwOutOfRange } from './meta/util'

const actionType = 'ReviewChildTaskAction'

export class ReviewChildTaskAction extends ParentAction {
  readonly taskId: string
  readonly ok: boolean
  readonly time: number

  constructor ({ taskId, ok, time }: {
    taskId: string
    ok: boolean
    time: number
  }) {
    super()

    assertIdWithinFamily({ actionType, field: 'taskId', value: taskId })
    assertSafeInteger({ actionType, field: 'time', value: time })

    if (time <= 0) {
      throwOutOfRange({ actionType, field: 'time', value: time })
    }

    this.taskId = taskId
    this.ok = ok
    this.time = time
  }

  static parse = ({ taskId, ok, time }: SerializedReviewChildTaskAction) => (
    new ReviewChildTaskAction({ taskId, ok, time })
  )
}

export interface SerializedReviewChildTaskAction {
  type: 'REVIEW_CHILD_TASK'
  taskId: string
  ok: boolean
  time: number
}
