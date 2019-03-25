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

import { NewPermissionStatus } from '../model/newpermissionstatus'
import { ProtectionLevel } from '../model/protectionlevel'
import { RuntimePermissionStatus } from '../model/runtimepermissionstatus'
import { AppLogicAction } from './basetypes'

export class UpdateDeviceStatusAction extends AppLogicAction {
  readonly newProtetionLevel?: ProtectionLevel
  readonly newUsageStatsPermissionStatus?: RuntimePermissionStatus
  readonly newNotificationAccessPermission?: NewPermissionStatus
  readonly newOverlayPermission?: RuntimePermissionStatus
  readonly newAccessibilityServiceEnabled?: boolean
  readonly newAppVersion?: number
  readonly didReboot: boolean

  constructor ({ newProtetionLevel, newUsageStatsPermissionStatus, newNotificationAccessPermission, newOverlayPermission, newAccessibilityServiceEnabled, newAppVersion, didReboot }: {
    newProtetionLevel?: ProtectionLevel
    newUsageStatsPermissionStatus?: RuntimePermissionStatus
    newNotificationAccessPermission?: NewPermissionStatus
    newOverlayPermission?: RuntimePermissionStatus
    newAccessibilityServiceEnabled?: boolean
    newAppVersion?: number
    didReboot: boolean
  }) {
    super()

    if (newAppVersion !== undefined) {
      if (!Number.isSafeInteger(newAppVersion) || (newAppVersion < 0)) {
        throw new Error('invalid new ap version')
      }
    }

    this.newProtetionLevel = newProtetionLevel
    this.newUsageStatsPermissionStatus = newUsageStatsPermissionStatus
    this.newNotificationAccessPermission = newNotificationAccessPermission
    this.newOverlayPermission = newOverlayPermission
    this.newAccessibilityServiceEnabled = newAccessibilityServiceEnabled
    this.newAppVersion = newAppVersion
    this.didReboot = didReboot
  }

  serialize = (): SerializedUpdateDeviceStatusAction => ({
    type: 'UPDATE_DEVICE_STATUS',
    protectionLevel: this.newProtetionLevel,
    usageStats: this.newUsageStatsPermissionStatus,
    notificationAccess: this.newNotificationAccessPermission,
    overlayPermission: this.newOverlayPermission,
    accessibilityServiceEnabled: this.newAccessibilityServiceEnabled,
    appVersion: this.newAppVersion,
    didReboot: this.didReboot
  })

  static parse = ({ protectionLevel, usageStats, notificationAccess, overlayPermission, accessibilityServiceEnabled, appVersion, didReboot }: SerializedUpdateDeviceStatusAction) => (
    new UpdateDeviceStatusAction({
      newProtetionLevel: protectionLevel,
      newUsageStatsPermissionStatus: usageStats,
      newNotificationAccessPermission: notificationAccess,
      newOverlayPermission: overlayPermission,
      newAccessibilityServiceEnabled: accessibilityServiceEnabled,
      newAppVersion: appVersion,
      didReboot: !!didReboot
    })
  )
}

export interface SerializedUpdateDeviceStatusAction {
  type: 'UPDATE_DEVICE_STATUS'
  protectionLevel?: ProtectionLevel
  usageStats?: RuntimePermissionStatus
  notificationAccess?: NewPermissionStatus
  overlayPermission?: RuntimePermissionStatus
  accessibilityServiceEnabled?: boolean
  appVersion?: number
  didReboot?: boolean
}
