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

import { UpdateDeviceStatusAction } from '../../../../action'
import { hasDeviceManipulation } from '../../../../database/device'
import { newPermissionStatusValues } from '../../../../model/newpermissionstatus'
import { protetionLevels } from '../../../../model/protectionlevel'
import { runtimePermissionStatusValues } from '../../../../model/runtimepermissionstatus'
import { enumMax } from '../../../../util/enum'
import { sendManipulationWarnings } from '../../../warningmail/manipulation'
import { Cache } from '../cache'

export async function dispatchUpdateDeviceStatus ({ deviceId, action, cache }: {
  deviceId: string
  action: UpdateDeviceStatusAction
  cache: Cache
}) {
  const deviceEntry = await cache.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId
    },
    transaction: cache.transaction
  })

  if (!deviceEntry) {
    throw new Error('device not found')
  }

  const hadManipulationBefore = hasDeviceManipulation(deviceEntry)

  if (action.newProtetionLevel) {
    const hasChanged = deviceEntry.currentProtectionLevel !== action.newProtetionLevel

    deviceEntry.currentProtectionLevel = action.newProtetionLevel

    deviceEntry.highestProtectionLevel = enumMax(
      deviceEntry.currentProtectionLevel,
      deviceEntry.highestProtectionLevel,
      protetionLevels
    )

    if (hasChanged && (deviceEntry.currentProtectionLevel !== deviceEntry.highestProtectionLevel)) {
      deviceEntry.hadManipulation = true
    }
  }

  if (action.newUsageStatsPermissionStatus) {
    const hasChanged = deviceEntry.currentUsageStatsPermission !== action.newUsageStatsPermissionStatus

    deviceEntry.currentUsageStatsPermission = action.newUsageStatsPermissionStatus

    deviceEntry.highestUsageStatsPermission = enumMax(
      deviceEntry.currentUsageStatsPermission,
      deviceEntry.highestUsageStatsPermission,
      runtimePermissionStatusValues
    )

    if (hasChanged && (deviceEntry.currentUsageStatsPermission !== deviceEntry.highestUsageStatsPermission)) {
      deviceEntry.hadManipulation = true
    }
  }

  if (action.newNotificationAccessPermission) {
    const hasChanged = deviceEntry.currentNotificationAccessPermission !== action.newNotificationAccessPermission

    deviceEntry.currentNotificationAccessPermission = action.newNotificationAccessPermission

    deviceEntry.highestNotificationAccessPermission = enumMax(
      deviceEntry.currentNotificationAccessPermission,
      deviceEntry.highestNotificationAccessPermission,
      newPermissionStatusValues
    )

    if (hasChanged && (deviceEntry.currentNotificationAccessPermission !== deviceEntry.highestNotificationAccessPermission)) {
      deviceEntry.hadManipulation = true
    }
  }

  if (action.newAppVersion !== undefined) {
    const hasChanged = deviceEntry.currentAppVersion !== action.newAppVersion

    deviceEntry.currentAppVersion = action.newAppVersion

    deviceEntry.highestAppVersion = Math.max(
      deviceEntry.currentAppVersion,
      deviceEntry.highestAppVersion
    )

    if (hasChanged && (deviceEntry.currentAppVersion !== deviceEntry.highestAppVersion)) {
      deviceEntry.hadManipulation = true
    }
  }

  if (action.didReboot) {
    deviceEntry.didReboot = true
  }

  await deviceEntry.save({ transaction: cache.transaction })

  if (hasDeviceManipulation(deviceEntry)) {
    if (!hadManipulationBefore) {
      await sendManipulationWarnings({
        database: cache.database,
        transaction: cache.transaction,
        deviceName: deviceEntry.name,
        familyId: cache.familyId
      })
    }
  }

  cache.invalidiateDeviceList = true
  cache.areChangesImportant = true
}
