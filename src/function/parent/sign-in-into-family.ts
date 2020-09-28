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

import { Conflict } from 'http-errors'
import { NewDeviceInfo } from '../../api/schema'
import { Database } from '../../database'
import { generateAuthToken, generateIdWithinFamily, generateVersionId } from '../../util/token'
import { WebsocketApi } from '../../websocket'
import { requireMailByAuthToken } from '../authentication'
import { prepareDeviceEntry } from '../device/prepare-device-entry'
import { notifyClientsAboutChangesDelayed } from '../websocket'

export const signInIntoFamily = async ({ database, mailAuthToken, newDeviceInfo, deviceName, websocket }: {
  database: Database
  mailAuthToken: string
  newDeviceInfo: NewDeviceInfo
  deviceName: string
  websocket: WebsocketApi
  // no transaction here because this is directly called from an API endpoint
}): Promise<{ deviceId: string; deviceAuthToken: string }> => {
  return database.transaction(async (transaction) => {
    const mail = await requireMailByAuthToken({ database, mailAuthToken, transaction })

    const userEntryUnsafe = await database.user.findOne({
      where: {
        mail
      },
      attributes: ['familyId', 'userId'],
      transaction
    })

    if (!userEntryUnsafe) {
      throw new Conflict()
    }

    const userEntry = {
      familyId: userEntryUnsafe.familyId,
      userId: userEntryUnsafe.userId
    }

    const deviceAuthToken = generateAuthToken()
    const deviceId = generateIdWithinFamily()

    await database.device.create(prepareDeviceEntry({
      familyId: userEntry.familyId,
      deviceId,
      userId: userEntry.userId,
      deviceName,
      deviceAuthToken,
      newDeviceInfo
    }), { transaction })

    // notify about changes
    await database.family.update({
      deviceListVersion: generateVersionId()
    }, {
      where: {
        familyId: userEntry.familyId
      },
      transaction
    })

    await notifyClientsAboutChangesDelayed({
      familyId: userEntry.familyId,
      websocket,
      database,
      isImportant: true,
      sourceDeviceId: deviceId,
      transaction
    })

    return {
      deviceId,
      deviceAuthToken
    }
  })
}
