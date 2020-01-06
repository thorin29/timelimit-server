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
  AddCategoryAppsAction,
  AddUserAction,
  ChangeParentPasswordAction,
  CreateCategoryAction,
  CreateTimeLimitRuleAction,
  DeleteCategoryAction,
  DeleteTimeLimitRuleAction,
  IgnoreManipulationAction,
  IncrementCategoryExtraTimeAction,
  ParentAction,
  RemoveCategoryAppsAction,
  RemoveUserAction,
  RenameChildAction,
  ResetParentBlockedTimesAction,
  SetCategoryExtraTimeAction,
  SetCategoryForUnassignedAppsAction,
  SetChildPasswordAction,
  SetConsiderRebootManipulationAction,
  SetDeviceDefaultUserAction,
  SetDeviceDefaultUserTimeoutAction,
  SetDeviceUserAction,
  SetKeepSignedInAction,
  SetParentCategoryAction,
  SetRelaxPrimaryDeviceAction,
  SetSendDeviceConnected,
  SetUserDisableLimitsUntilAction,
  SetUserTimezoneAction,
  UpdateCategoryBatteryLimitAction,
  UpdateCategoryBlockAllNotificationsAction,
  UpdateCategoryBlockedTimesAction,
  UpdateCategoryTemporarilyBlockedAction,
  UpdateCategoryTimeWarningsAction,
  UpdateCategoryTitleAction,
  UpdateDeviceNameAction,
  UpdateEnableActivityLevelBlockingAction,
  UpdateNetworkTimeVerificationAction,
  UpdateParentBlockedTimesAction,
  UpdateParentNotificationFlagsAction,
  UpdateTimelimitRuleAction
} from '../../../../action'
import { Cache } from '../cache'
import { dispatchAddCategoryApps } from './addcategoryapps'
import { dispatchAddUser } from './adduser'
import { dispatchChangeParentPassword } from './changeparentpassword'
import { dispatchCreateCategory } from './createcategory'
import { dispatchCreateTimeLimitRule } from './createtimelimitrule'
import { dispatchDeleteCategory } from './deletecategory'
import { dispatchDeleteTimeLimitRule } from './deletetimelimitrule'
import { dispatchIgnoreManipulation } from './ignoremanipulation'
import { dispatchIncrementCategoryExtraTime } from './incrementcategoryextratime'
import { dispatchRemoveCategoryApps } from './removecategoryapps'
import { dispatchRemoveUser } from './removeuser'
import { dispatchRenameChild } from './renamechild'
import { dispatchResetParentBlockedTimes } from './resetparentblockedtimes'
import { dispatchSetCategoryExtraTime } from './setcategoryextratime'
import { dispatchSetCategoryForUnassignedApps } from './setcategoryforunassignedapps'
import { dispatchSetChildPassword } from './setchildpassword'
import { dispatchSetConsiderRebootManipulation } from './setconsiderrebootmanipulation'
import { dispatchSetDeviceDefaultUser } from './setdevicedefaultuser'
import { dispatchSetDeviceDefaultUserTimeout } from './setdevicedefaultusertimeout'
import { dispatchSetDeviceUser } from './setdeviceuser'
import { dispatchSetKeepSignedIn } from './setkeepsignedin'
import { dispatchSetParentCategory } from './setparentcategory'
import { dispatchSetRelaxPrimaryDevice } from './setrelaxprimarydevice'
import { dispatchSetSendDeviceConnected } from './setsenddeviceconnected'
import { dispatchUserSetDisableLimitsUntil } from './setuserdisablelmitsuntil'
import { dispatchSetUserTimezone } from './setusertimezone'
import { dispatchUpdateCategoryBatteryLimit } from './updatecategorybatterylimit'
import { dispatchUpdateCategoryBlockAllNotifications } from './updatecategoryblockallnotifications'
import { dispatchUpdateCategoryBlockedTimes } from './updatecategoryblockedtimes'
import { dispatchUpdateCategoryTemporarilyBlocked } from './updatecategorytemporarilyblocked'
import { dispatchUpdateCategoryTimeWarnings } from './updatecategorytimewarnings'
import { dispatchUpdateCategoryTitle } from './updatecategorytitle'
import { dispatchUpdateDeviceName } from './updatedevicename'
import { dispatchUpdateEnableActivityLevelBlocking } from './updateenableactivitylevelblocking'
import { dispatchUpdateNetworkTimeVerification } from './updatenetworktimeverification'
import { dispatchUpdateParentBlockedTimes } from './updateparentblockedtimes'
import { dispatchUpdateParentNotificationFlags } from './updateparentnotificationflags'
import { dispatchUpdateTimelimitRule } from './updatetimelimitrule'

export const dispatchParentAction = async ({ action, cache, parentUserId, sourceDeviceId }: {
  action: ParentAction
  cache: Cache
  parentUserId: string
  sourceDeviceId: string | null
}) => {
  if (action instanceof AddCategoryAppsAction) {
    await dispatchAddCategoryApps({ action, cache })
  } else if (action instanceof AddUserAction) {
    await dispatchAddUser({ action, cache })
  } else if (action instanceof RemoveCategoryAppsAction) {
    await dispatchRemoveCategoryApps({ action, cache })
  } else if (action instanceof CreateCategoryAction) {
    await dispatchCreateCategory({ action, cache })
  } else if (action instanceof CreateTimeLimitRuleAction) {
    await dispatchCreateTimeLimitRule({ action, cache })
  } else if (action instanceof DeleteCategoryAction) {
    await dispatchDeleteCategory({ action, cache })
  } else if (action instanceof UpdateCategoryTitleAction) {
    await dispatchUpdateCategoryTitle({ action, cache })
  } else if (action instanceof SetCategoryExtraTimeAction) {
    await dispatchSetCategoryExtraTime({ action, cache })
  } else if (action instanceof SetCategoryForUnassignedAppsAction) {
    await dispatchSetCategoryForUnassignedApps({ action, cache })
  } else if (action instanceof SetChildPasswordAction) {
    await dispatchSetChildPassword({ action, cache })
  } else if (action instanceof SetConsiderRebootManipulationAction) {
    await dispatchSetConsiderRebootManipulation({ action, cache })
  } else if (action instanceof SetDeviceDefaultUserAction) {
    await dispatchSetDeviceDefaultUser({ action, cache })
  } else if (action instanceof SetDeviceDefaultUserTimeoutAction) {
    await dispatchSetDeviceDefaultUserTimeout({ action, cache })
  } else if (action instanceof SetDeviceUserAction) {
    await dispatchSetDeviceUser({ action, cache })
  } else if (action instanceof SetKeepSignedInAction) {
    await dispatchSetKeepSignedIn({ action, cache, parentUserId })
  } else if (action instanceof SetParentCategoryAction) {
    await dispatchSetParentCategory({ action, cache })
  } else if (action instanceof SetRelaxPrimaryDeviceAction) {
    await dispatchSetRelaxPrimaryDevice({ action, cache })
  } else if (action instanceof SetSendDeviceConnected) {
    await dispatchSetSendDeviceConnected({ action, cache, sourceDeviceId })
  } else if (action instanceof SetUserDisableLimitsUntilAction) {
    await dispatchUserSetDisableLimitsUntil({ action, cache })
  } else if (action instanceof SetUserTimezoneAction) {
    await dispatchSetUserTimezone({ action, cache })
  } else if (action instanceof UpdateCategoryBatteryLimitAction) {
    await dispatchUpdateCategoryBatteryLimit({ action, cache })
  } else if (action instanceof UpdateCategoryBlockAllNotificationsAction) {
    await dispatchUpdateCategoryBlockAllNotifications({ action, cache })
  } else if (action instanceof UpdateCategoryBlockedTimesAction) {
    await dispatchUpdateCategoryBlockedTimes({ action, cache })
  } else if (action instanceof IncrementCategoryExtraTimeAction) {
    await dispatchIncrementCategoryExtraTime({ action, cache })
  } else if (action instanceof UpdateCategoryTemporarilyBlockedAction) {
    await dispatchUpdateCategoryTemporarilyBlocked({ action, cache })
  } else if (action instanceof DeleteTimeLimitRuleAction) {
    await dispatchDeleteTimeLimitRule({ action, cache })
  } else if (action instanceof UpdateDeviceNameAction) {
    await dispatchUpdateDeviceName({ action, cache })
  } else if (action instanceof UpdateEnableActivityLevelBlockingAction) {
    await dispatchUpdateEnableActivityLevelBlocking({ action, cache })
  } else if (action instanceof UpdateNetworkTimeVerificationAction) {
    await dispatchUpdateNetworkTimeVerification({ action, cache })
  } else if (action instanceof UpdateParentNotificationFlagsAction) {
    await dispatchUpdateParentNotificationFlags({ action, cache })
  } else if (action instanceof UpdateTimelimitRuleAction) {
    await dispatchUpdateTimelimitRule({ action, cache })
  } else if (action instanceof RemoveUserAction) {
    await dispatchRemoveUser({ action, cache, parentUserId })
  } else if (action instanceof RenameChildAction) {
    await dispatchRenameChild({ action, cache })
  } else if (action instanceof ChangeParentPasswordAction) {
    await dispatchChangeParentPassword({ action, cache })
  } else if (action instanceof IgnoreManipulationAction) {
    await dispatchIgnoreManipulation({ action, cache })
  } else if (action instanceof UpdateCategoryTimeWarningsAction) {
    await dispatchUpdateCategoryTimeWarnings({ action, cache })
  } else if (action instanceof ResetParentBlockedTimesAction) {
    await dispatchResetParentBlockedTimes({ action, cache })
  } else if (action instanceof UpdateParentBlockedTimesAction) {
    await dispatchUpdateParentBlockedTimes({ action, cache })
  } else {
    throw new Error('unsupported action type')
  }
}
