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

import { IgnoreManipulationAction } from '../../../../action'
import { Cache } from '../cache'

export async function dispatchIgnoreManipulation ({ action, cache }: {
  action: IgnoreManipulationAction
  cache: Cache
}) {
  const deviceEntry = await cache.database.device.findOne({
    where: {
      familyId: cache.familyId,
      deviceId: action.deviceId
    },
    transaction: cache.transaction
  })

  if (deviceEntry === null) {
    throw new Error('illegal state: missing device which dispatched the action')
  }

  if (action.ignoreDeviceAdminManipulation) {
    deviceEntry.highestProtectionLevel = deviceEntry.currentProtectionLevel
  }

  if (action.ignoreDeviceAdminManipulationAttempt) {
    deviceEntry.triedDisablingDeviceAdmin = false
  }

  if (action.ignoreAppDowngrade) {
    deviceEntry.highestAppVersion = deviceEntry.currentAppVersion
  }

  if (action.ignoreNotificationAccessManipulation) {
    deviceEntry.highestNotificationAccessPermission = deviceEntry.currentNotificationAccessPermission
  }

  if (action.ignoreUsageStatsAccessManipulation) {
    deviceEntry.highestUsageStatsPermission = deviceEntry.currentUsageStatsPermission
  }

  if (action.ignoreDidReboot) {
    deviceEntry.didReboot = false
  }

  if (action.ignoreHadManipulation) {
    deviceEntry.hadManipulation = false
  }

  await deviceEntry.save({ transaction: cache.transaction })
  cache.invalidiateDeviceList = true
}
