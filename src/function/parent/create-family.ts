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

import { Conflict } from 'http-errors'
import { NewDeviceInfo, ParentPassword } from '../../api/schema'
import { Database } from '../../database'
import {
  generateAuthToken, generateFamilyId, generateIdWithinFamily, generateVersionId
} from '../../util/token'
import { requireMailByAuthToken } from '../authentication'
import { prepareDeviceEntry } from '../device/prepare-device-entry'

export const createFamily = async ({ database, mailAuthToken, firstParentDevice, password, timeZone, parentName, deviceName }: {
  database: Database,
  mailAuthToken: string,
  firstParentDevice: NewDeviceInfo,
  password: ParentPassword,
  timeZone: string,
  parentName: string,
  deviceName: string
}) => {
  const now = Date.now().toString(10)
  const mail = await requireMailByAuthToken({ database, mailAuthToken })

  return database.transaction(async (transaction) => {
    // ensure that no family was created for this mail yet
    const exisitngUserEntry = await database.user.findOne({
      where: {
        mail
      },
      transaction
    })

    if (exisitngUserEntry) {
      throw new Conflict()
    }

    const familyId = generateFamilyId()
    const userId = generateIdWithinFamily()
    const deviceId = generateIdWithinFamily()
    const deviceAuthToken = generateAuthToken()

    // create family
    await database.family.create({
      familyId,
      name: '',
      createdAt: now,
      userListVersion: generateVersionId(),
      deviceListVersion: generateVersionId(),
      // 14 days demo version
      fullVersionUntil: (Date.now() + 1000 * 60 * 60 * 24 * 14).toString(10),
      hasFullVersion: true
    }, { transaction })

    // create parent user
    await database.user.create({
      familyId,
      userId,
      name: parentName,
      passwordHash: password.hash,
      secondPasswordHash: password.secondHash,
      secondPasswordSalt: password.secondSalt,
      type: 'parent',
      mail,
      timeZone,
      disableTimelimitsUntil: '0',
      currentDevice: '',
      categoryForNotAssignedApps: '',
      relaxPrimaryDeviceRule: false,
      mailNotificationFlags: 1,  // enable warning notifications
      blockedTimes: '',
      flags: '0'
    }, { transaction })

    // add parent device
    await database.device.create(prepareDeviceEntry({
      familyId,
      deviceId,
      deviceName,
      newDeviceInfo: firstParentDevice,
      userId,
      deviceAuthToken
    }), { transaction })

    return {
      deviceAuthToken,
      deviceId
    }
  })
}
