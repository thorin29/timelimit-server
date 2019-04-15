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

import { AppActivityItem, RemovedAppActivityItem, SerializedAppActivityItem, SerializedRemovedAppActivityItem } from '../model/appactivity'
import { assertListWithoutDuplicates } from '../util/list'
import { AppLogicAction } from './basetypes'

export class UpdateAppActivitiesAction extends AppLogicAction {
  readonly removed: Array<RemovedAppActivityItem>
  readonly updatedOrAdded: Array<AppActivityItem>

  constructor ({ removed, updatedOrAdded }: {
    removed: Array<RemovedAppActivityItem>
    updatedOrAdded: Array<AppActivityItem>
  }) {
    super()

    assertListWithoutDuplicates(removed.map((item) => item.packageName + ':' + item.activityName))
    assertListWithoutDuplicates(updatedOrAdded.map((item) => item.packageName + ':' + item.activityName))

    if (removed.length === 0 && updatedOrAdded.length === 0) {
      throw new Error('UpdateAppActivitiesAction is empty')
    }

    this.removed = removed
    this.updatedOrAdded = updatedOrAdded
  }

  serialize = (): SerializedUpdateAppActivitiesAction => ({
    type: 'UPDATE_APP_ACTIVITIES',
    removed: this.removed.map((item) => item.serialize()),
    updatedOrAdded: this.updatedOrAdded.map((item) => item.serialize())
  })

  static parse = ({ removed, updatedOrAdded }: SerializedUpdateAppActivitiesAction) => (
    new UpdateAppActivitiesAction({
      removed: removed.map((item) => RemovedAppActivityItem.parse(item)),
      updatedOrAdded: updatedOrAdded.map((item) => AppActivityItem.parse(item))
    })
  )
}

export interface SerializedUpdateAppActivitiesAction {
  type: 'UPDATE_APP_ACTIVITIES'
  removed: Array<SerializedRemovedAppActivityItem>
  updatedOrAdded: Array<SerializedAppActivityItem>
}
