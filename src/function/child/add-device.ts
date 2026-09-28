/*
 * server component for the TimeLimit App
 * Copyright (C) 2019 - 2026 Jonas Lochmann
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
import { SimpleDatabase } from '../../database/simple'
import { generateAuthToken, generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { notifyClientsAboutChangesDelayed } from '../websocket'
import { generateServerDataStatus } from '../sync/get-server-data-status'
import { EventHandler } from '../../monitoring/eventhandler'
import { ServerDataStatus } from '../../object/serverdatastatus'
import { createEmptyClientDataStatus } from '../../object/clientdatastatus'

export const addChildDevice = async ({ database, eventHandler, websocket, request }: {
  database: SimpleDatabase
  eventHandler: EventHandler
  websocket: WebsocketApi
  request: RegisterChildDeviceRequest
  // no transaction here because this is directly called from an API endpoint
}): Promise<{
  deviceId: string
  deviceAuthToken: string
  data: ServerDataStatus
}> => {
  return database.transaction(async (transaction) => {
    const entry = await transaction.addDeviceToken.getAndDestroy(request.registerToken.toLowerCase())

    if (!entry) {
      throw new Unauthorized()
    }

    const { deviceId, familyId } = entry
    const deviceAuthToken = generateAuthToken()

    await transaction.device.create({
      familyId,
      time: Date.now(),
      deviceId,
      deviceAuthToken,
      deviceName: request.deviceName,
      deviceModel: request.childDevice.model,
      userId: '',
      isUserKeptSignedIn: false
    })

    await transaction.family.updateDeviceListVersion({
      familyId,
      deviceListVersion: generateVersionId()
    })

    await notifyClientsAboutChangesDelayed({
      familyId,
      websocket,
      transaction,
      generalLevel: 1,
      targetedLevels: new Map(),
      sourceDeviceId: deviceId
    })

    const data = await generateServerDataStatus({
      transaction,
      clientStatus: createEmptyClientDataStatus({ clientLevel: request.clientLevel || null }),
      familyId: entry.familyId,
      deviceId,
      eventHandler
    })

    return {
      deviceId,
      deviceAuthToken,
      data
    }
  })
}
