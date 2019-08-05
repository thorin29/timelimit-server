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

import { DeviceHadManipulationFlags } from '../database/device'
import { assertIdWithinFamily } from '../util/token'
import { ParentAction } from './basetypes'

export class IgnoreManipulationAction extends ParentAction {
  readonly deviceId: string
  readonly ignoreDeviceAdminManipulation: boolean
  readonly ignoreDeviceAdminManipulationAttempt: boolean
  readonly ignoreAppDowngrade: boolean
  readonly ignoreNotificationAccessManipulation: boolean
  readonly ignoreUsageStatsAccessManipulation: boolean
  readonly ignoreOverlayPermissionManipulation: boolean
  readonly ignoreAccessibilityServiceManipulation: boolean
  readonly ignoreDidReboot: boolean
  readonly ignoreHadManipulation: boolean
  readonly ignoreHadManipulationFlags: number

  constructor ({
    deviceId, ignoreDeviceAdminManipulation, ignoreDeviceAdminManipulationAttempt,
    ignoreAppDowngrade, ignoreNotificationAccessManipulation, ignoreUsageStatsAccessManipulation,
    ignoreOverlayPermissionManipulation, ignoreAccessibilityServiceManipulation, ignoreDidReboot, ignoreHadManipulation, ignoreHadManipulationFlags
  }: {
    deviceId: string
    ignoreDeviceAdminManipulation: boolean
    ignoreDeviceAdminManipulationAttempt: boolean
    ignoreAppDowngrade: boolean
    ignoreNotificationAccessManipulation: boolean
    ignoreUsageStatsAccessManipulation: boolean
    ignoreOverlayPermissionManipulation: boolean
    ignoreAccessibilityServiceManipulation: boolean
    ignoreDidReboot: boolean
    ignoreHadManipulation: boolean
    ignoreHadManipulationFlags: number
  }) {
    super()

    assertIdWithinFamily(deviceId)

    if (
      (!Number.isSafeInteger(ignoreHadManipulationFlags)) ||
      ignoreHadManipulationFlags < 0 || ignoreHadManipulationFlags > DeviceHadManipulationFlags.ALL
    ) {
      throw new Error('invalid ignoreHadManipulationFlags')
    }

    this.deviceId = deviceId
    this.ignoreDeviceAdminManipulation = ignoreDeviceAdminManipulation
    this.ignoreDeviceAdminManipulationAttempt = ignoreDeviceAdminManipulationAttempt
    this.ignoreAppDowngrade = ignoreAppDowngrade
    this.ignoreNotificationAccessManipulation = ignoreNotificationAccessManipulation
    this.ignoreUsageStatsAccessManipulation = ignoreUsageStatsAccessManipulation
    this.ignoreOverlayPermissionManipulation = ignoreOverlayPermissionManipulation
    this.ignoreAccessibilityServiceManipulation = ignoreAccessibilityServiceManipulation
    this.ignoreDidReboot = ignoreDidReboot
    this.ignoreHadManipulation = ignoreHadManipulation
    this.ignoreHadManipulationFlags = ignoreHadManipulationFlags
  }

  serialize = (): SerializedIgnoreManipulationAction => ({
    type: 'IGNORE_MANIPULATION',
    deviceId: this.deviceId,
    admin: this.ignoreDeviceAdminManipulation,
    adminA: this.ignoreDeviceAdminManipulationAttempt,
    downgrade: this.ignoreAppDowngrade,
    notification: this.ignoreNotificationAccessManipulation,
    overlay: this.ignoreOverlayPermissionManipulation,
    accessibilityService: this.ignoreAccessibilityServiceManipulation,
    usageStats: this.ignoreUsageStatsAccessManipulation,
    hadManipulation: this.ignoreHadManipulation,
    ignoreHadManipulationFlags: this.ignoreHadManipulationFlags
  })

  static parse = ({ deviceId, admin, adminA, downgrade, notification, usageStats, overlay, accessibilityService, reboot, hadManipulation, ignoreHadManipulationFlags }: SerializedIgnoreManipulationAction) => (
    new IgnoreManipulationAction({
      deviceId,
      ignoreDeviceAdminManipulation: admin,
      ignoreDeviceAdminManipulationAttempt: adminA,
      ignoreAppDowngrade: downgrade,
      ignoreUsageStatsAccessManipulation: usageStats,
      ignoreNotificationAccessManipulation: notification,
      ignoreOverlayPermissionManipulation: !!overlay,
      ignoreAccessibilityServiceManipulation: !!accessibilityService,
      ignoreDidReboot: !!reboot,
      ignoreHadManipulation: hadManipulation,
      ignoreHadManipulationFlags: ignoreHadManipulationFlags || 0
    })
  )
}

export interface SerializedIgnoreManipulationAction {
  type: 'IGNORE_MANIPULATION'
  deviceId: string
  admin: boolean
  adminA: boolean
  downgrade: boolean
  notification: boolean
  usageStats: boolean
  hadManipulation: boolean
  // was added at a later version
  reboot?: boolean
  overlay?: boolean
  accessibilityService?: boolean
  ignoreHadManipulationFlags?: number
}
