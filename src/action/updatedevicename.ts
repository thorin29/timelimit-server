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

export class UpdateDeviceNameAction extends ParentAction {
  readonly deviceId: string
  readonly name: string

  constructor ({ deviceId, name }: {
    deviceId: string
    name: string
  }) {
    super()

    this.deviceId = deviceId
    this.name = name

    assertIdWithinFamily(deviceId)

    if (name.trim().length === 0) {
      throw new Error('new device name must not be blank')
    }
  }

  serialize = (): SerializedUpdateDeviceNameAction => ({
    type: 'UPDATE_DEVICE_NAME',
    deviceId: this.deviceId,
    name: this.name
  })

  static parse = ({ deviceId, name }: SerializedUpdateDeviceNameAction) => (
    new UpdateDeviceNameAction({ deviceId, name })
  )
}

export interface SerializedUpdateDeviceNameAction {
  type: 'UPDATE_DEVICE_NAME'
  deviceId: string
  name: string
}
