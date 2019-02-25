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

import * as Sequelize from 'sequelize'
import { Database } from '../../database'
import { WebsocketApi } from '../../websocket'

// this should be called AFTER an transaction was commited
export const notifyClientsAboutChanges = async ({ familyId, sourceDeviceId, database, websocket, isImportant }: {
  familyId: string
  sourceDeviceId: string | null  // this device will not get an push
  database: Database
  websocket: WebsocketApi
  isImportant: boolean
}) => {
  const relatedDeviceEntries = (await database.device.findAll({
    where: sourceDeviceId ? {
      familyId,
      deviceId: {
        [Sequelize.Op.not]: sourceDeviceId
      }
    } : {
      familyId
    },
    attributes: ['deviceAuthToken']
  })).map((item) => ({
    deviceAuthToken: item.deviceAuthToken
  }))

  relatedDeviceEntries.forEach((item) => {
    websocket.triggerSyncByDeviceAuthToken({
      deviceAuthToken: item.deviceAuthToken,
      isImportant
    })
  })
}
