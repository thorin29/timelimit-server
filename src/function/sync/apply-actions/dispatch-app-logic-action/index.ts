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

import {
  AddInstalledAppsAction,
  AddUsedTimeAction,
  AppLogicAction,
  RemoveInstalledAppsAction,
  SignOutAtDeviceAction,
  TriedDisablingDeviceAdminAction,
  UpdateDeviceStatusAction
} from '../../../../action'
import { Cache } from '../cache'
import { dispatchAddInstalledApps } from './addinstalledapps'
import { dispatchAddUsedTime } from './addusedtime'
import { dispatchRemoveInstalledApps } from './removeinstalledapps'
import { dispatchSignOutAtDevice } from './signoutatdevice'
import { dispatchTriedDisablingDeviceAdmin } from './trieddisablingdeviceadmin'
import { dispatchUpdateDeviceStatus } from './updatedevicestatus'

export const dispatchAppLogicAction = async ({ action, deviceId, cache }: {
  action: AppLogicAction
  deviceId: string
  cache: Cache
}) => {
  if (action instanceof AddInstalledAppsAction) {
    await dispatchAddInstalledApps({ deviceId, action, cache })
  } else if (action instanceof AddUsedTimeAction) {
    await dispatchAddUsedTime({ deviceId, action, cache })
  } else if (action instanceof RemoveInstalledAppsAction) {
    await dispatchRemoveInstalledApps({ deviceId, action, cache })
  } else if (action instanceof SignOutAtDeviceAction) {
    await dispatchSignOutAtDevice({ deviceId, action, cache })
  } else if (action instanceof UpdateDeviceStatusAction) {
    await dispatchUpdateDeviceStatus({ deviceId, action, cache })
  } else if (action instanceof TriedDisablingDeviceAdminAction) {
    await dispatchTriedDisablingDeviceAdmin({ deviceId, action, cache })
  } else {
    throw new Error('unsupported action type')
  }
}
