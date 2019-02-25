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

import { Database } from '../../database'
import { generateAuthToken, generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { sendUninstallWarnings } from '../warningmail/uninstall'
import { notifyClientsAboutChanges } from '../websocket'

export async function reportDeviceRemoved ({ database, deviceAuthToken, websocket }: {
  database: Database
  deviceAuthToken: string
  websocket: WebsocketApi
}) {
  const result = await database.transaction(async (transaction) => {
    const deviceEntry = await database.device.findOne({
      where: {
        deviceAuthToken
      },
      transaction
    })

    if (deviceEntry) {
      deviceEntry.didDeviceReportUninstall = true
      deviceEntry.deviceAuthToken = generateAuthToken() // invalidiate the token
      deviceEntry.save({ transaction })

      // invalidiate device list
      await database.family.update({
        deviceListVersion: generateVersionId()
      }, {
        where: {
          familyId: deviceEntry.familyId
        },
        transaction
      })

      // add to old devices
      await database.oldDevice.create({
        deviceAuthToken: deviceEntry.deviceAuthToken
      }, {
        transaction
      })

      return { familyId: deviceEntry.familyId, deviceName: deviceEntry.name }
    } else {
      const oldDeviceEntry = await database.oldDevice.findOne({
        where: {
          deviceAuthToken
        },
        transaction
      })

      if (!oldDeviceEntry) {
        throw new Error('device not found')
      }

      return null
    }
  })

  if (result) {
    await notifyClientsAboutChanges({
      database,
      websocket,
      familyId: result.familyId,
      sourceDeviceId: null,
      isImportant: false
    })

    await sendUninstallWarnings({
      database,
      familyId: result.familyId,
      deviceName: result.deviceName
    })
  }
}
