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

import {
  AddInstalledAppsAction,
  AddUsedTimeAction,
  AddUsedTimeActionVersion2,
  AppLogicAction,
  ForceSyncAction,
  RemoveInstalledAppsAction,
  SignOutAtDeviceAction,
  TriedDisablingDeviceAdminAction,
  UpdateAppActivitiesAction,
  UpdateDeviceStatusAction
} from '../../../../action'
import { EventHandler } from '../../../../monitoring/eventhandler'
import { Cache } from '../cache'
import { ActionObjectTypeNotHandledException } from '../exception/illegal-state'
import { dispatchAddInstalledApps } from './addinstalledapps'
import { dispatchAddUsedTime } from './addusedtime'
import { dispatchAddUsedTimeVersion2 } from './addusedtime2'
import { dispatchForceSyncAction } from './forcesync'
import { dispatchRemoveInstalledApps } from './removeinstalledapps'
import { dispatchSignOutAtDevice } from './signoutatdevice'
import { dispatchTriedDisablingDeviceAdmin } from './trieddisablingdeviceadmin'
import { dispatchUpdateAppActivities } from './updateappactivities'
import { dispatchUpdateDeviceStatus } from './updatedevicestatus'

export const dispatchAppLogicAction = async ({ action, deviceId, cache, eventHandler }: {
  action: AppLogicAction
  deviceId: string
  cache: Cache
  eventHandler: EventHandler
}) => {
  if (action instanceof AddInstalledAppsAction) {
    await dispatchAddInstalledApps({ deviceId, action, cache })
  } else if (action instanceof AddUsedTimeAction) {
    await dispatchAddUsedTime({ deviceId, action, cache })
  } else if (action instanceof AddUsedTimeActionVersion2) {
    await dispatchAddUsedTimeVersion2({ deviceId, action, cache, eventHandler })
  } else if (action instanceof ForceSyncAction) {
    await dispatchForceSyncAction({ deviceId, action, cache })
  } else if (action instanceof RemoveInstalledAppsAction) {
    await dispatchRemoveInstalledApps({ deviceId, action, cache })
  } else if (action instanceof SignOutAtDeviceAction) {
    await dispatchSignOutAtDevice({ deviceId, action, cache })
  } else if (action instanceof UpdateDeviceStatusAction) {
    await dispatchUpdateDeviceStatus({ deviceId, action, cache })
  } else if (action instanceof UpdateAppActivitiesAction) {
    await dispatchUpdateAppActivities({ deviceId, action, cache })
  } else if (action instanceof TriedDisablingDeviceAdminAction) {
    await dispatchTriedDisablingDeviceAdmin({ deviceId, action, cache })
  } else {
    throw new ActionObjectTypeNotHandledException()
  }
}
