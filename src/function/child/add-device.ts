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

import { Unauthorized } from 'http-errors'
import { RegisterChildDeviceRequest } from '../../api/schema'
import { Database } from '../../database'
import { generateAuthToken, generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { prepareDeviceEntry } from '../device/prepare-device-entry'
import { notifyClientsAboutChangesDelayed } from '../websocket'

export const addChildDevice = async ({ database, websocket, request }: {
  database: Database
  websocket: WebsocketApi
  request: RegisterChildDeviceRequest
  // no transaction here because this is directly called from an API endpoint
}) => {
  return database.transaction(async (transaction) => {
    const entry = await database.addDeviceToken.findOne({
      where: {
        token: request.registerToken.toLowerCase()
      },
      transaction
    })

    if (!entry) {
      throw new Unauthorized()
    }

    await entry.destroy({ transaction })

    const { deviceId, familyId } = entry
    const deviceAuthToken = generateAuthToken()

    await database.device.create(prepareDeviceEntry({
      familyId,
      deviceId,
      deviceAuthToken,
      deviceName: request.deviceName,
      newDeviceInfo: request.childDevice,
      userId: ''
    }), { transaction })

    await database.family.update({
      deviceListVersion: generateVersionId()
    }, {
      where: {
        familyId
      },
      transaction
    })

    await notifyClientsAboutChangesDelayed({ familyId, websocket, database, isImportant: true, sourceDeviceId: deviceId, transaction })

    return {
      deviceId,
      deviceAuthToken
    }
  })
}
