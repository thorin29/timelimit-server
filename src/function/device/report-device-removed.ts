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
import { SimpleDatabase } from '../../database/simple'
import { generateAuthToken, generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { sendUninstallWarnings } from '../warningmail/uninstall'
import { notifyClientsAboutChangesDelayed } from '../websocket'

export async function reportDeviceRemoved ({ database, deviceAuthToken, websocket }: {
  database: SimpleDatabase
  deviceAuthToken: string
  websocket: WebsocketApi
  // no transaction here because this is directly called from an API endpoint
}) {
  await database.transaction(async (transaction) => {
    const deviceEntry = await transaction.device.getFamilyIdAndDeviceNameByAuthToken(deviceAuthToken)

    if (deviceEntry) {
      await transaction.device.updateDeviceReportedUninstall({
        deviceAuthToken,
        didDeviceReportUninstall: true
      })

      // invalidiate the token
      await transaction.device.updateDeviceAuthToken({
        oldDeviceAuthToken: deviceAuthToken,
        newDeviceAuthToken: generateAuthToken()
      })

      // invalidiate device list
      await transaction.family.updateDeviceListVersion({
        deviceListVersion: generateVersionId(),
        familyId: deviceEntry.familyId
      })

      // add to old devices
      await transaction.oldDevice.insertMissingTokens([ deviceAuthToken ])

      await notifyClientsAboutChangesDelayed({
        transaction,
        websocket,
        familyId: deviceEntry.familyId,
        sourceDeviceId: null,
        generalLevel: 1,
        targetedLevels: new Map(),
      })

      await sendUninstallWarnings({
        transaction,
        familyId: deviceEntry.familyId,
        deviceName: deviceEntry.deviceName,
      })
    } else {
      const isOldDevice = await transaction.oldDevice.hasAuthToken(deviceAuthToken)

      if (!isOldDevice) {
        throw new Unauthorized('device not found')
      }

      // otherwise, we processed this already so do not return any eror
    }
  })
}
