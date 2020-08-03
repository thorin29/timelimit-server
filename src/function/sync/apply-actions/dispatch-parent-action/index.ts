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
  UpdateCategorySortingAction,
  UpdateCategoryTemporarilyBlockedAction,
  UpdateCategoryTimeWarningsAction,
  UpdateCategoryTitleAction,
  UpdateDeviceNameAction,
  UpdateEnableActivityLevelBlockingAction,
  UpdateNetworkTimeVerificationAction,
  UpdateParentBlockedTimesAction,
  UpdateParentNotificationFlagsAction,
  UpdateTimelimitRuleAction,
  UpdateUserFlagsAction,
  UpdateUserLimitLoginCategory
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
import { dispatchUpdateCategorySorting } from './updatecategorysorting'
import { dispatchUpdateCategoryTemporarilyBlocked } from './updatecategorytemporarilyblocked'
import { dispatchUpdateCategoryTimeWarnings } from './updatecategorytimewarnings'
import { dispatchUpdateCategoryTitle } from './updatecategorytitle'
import { dispatchUpdateDeviceName } from './updatedevicename'
import { dispatchUpdateEnableActivityLevelBlocking } from './updateenableactivitylevelblocking'
import { dispatchUpdateNetworkTimeVerification } from './updatenetworktimeverification'
import { dispatchUpdateParentBlockedTimes } from './updateparentblockedtimes'
import { dispatchUpdateParentNotificationFlags } from './updateparentnotificationflags'
import { dispatchUpdateTimelimitRule } from './updatetimelimitrule'
import { dispatchUpdateUserFlagsAction } from './updateuserflags'
import { dispatchUpdateUserLimitLoginCategoryAction } from './updateuserlimitlogincategory'

export const dispatchParentAction = async ({ action, cache, parentUserId, sourceDeviceId, fromChildSelfLimitAddChildUserId }: {
  action: ParentAction
  cache: Cache
  parentUserId: string
  sourceDeviceId: string | null
  fromChildSelfLimitAddChildUserId: string | null
}) => {
  if (action instanceof AddCategoryAppsAction) {
    return dispatchAddCategoryApps({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof CreateCategoryAction) {
    return dispatchCreateCategory({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof CreateTimeLimitRuleAction) {
    return dispatchCreateTimeLimitRule({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof UpdateCategoryBlockAllNotificationsAction) {
    return dispatchUpdateCategoryBlockAllNotifications({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof SetParentCategoryAction) {
    return dispatchSetParentCategory({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof UpdateCategoryTemporarilyBlockedAction) {
    return dispatchUpdateCategoryTemporarilyBlocked({ action, cache, fromChildSelfLimitAddChildUserId })
  }

  if (fromChildSelfLimitAddChildUserId === null) {
    if (action instanceof AddUserAction) {
      return dispatchAddUser({ action, cache })
    } else if (action instanceof RemoveCategoryAppsAction) {
      return dispatchRemoveCategoryApps({ action, cache })
    } else if (action instanceof DeleteCategoryAction) {
      return dispatchDeleteCategory({ action, cache })
    } else if (action instanceof UpdateCategoryTitleAction) {
      return dispatchUpdateCategoryTitle({ action, cache })
    } else if (action instanceof SetCategoryExtraTimeAction) {
      return dispatchSetCategoryExtraTime({ action, cache })
    } else if (action instanceof SetCategoryForUnassignedAppsAction) {
      return dispatchSetCategoryForUnassignedApps({ action, cache })
    } else if (action instanceof SetChildPasswordAction) {
      return dispatchSetChildPassword({ action, cache })
    } else if (action instanceof SetConsiderRebootManipulationAction) {
      return dispatchSetConsiderRebootManipulation({ action, cache })
    } else if (action instanceof SetDeviceDefaultUserAction) {
      return dispatchSetDeviceDefaultUser({ action, cache })
    } else if (action instanceof SetDeviceDefaultUserTimeoutAction) {
      return dispatchSetDeviceDefaultUserTimeout({ action, cache })
    } else if (action instanceof SetDeviceUserAction) {
      return dispatchSetDeviceUser({ action, cache })
    } else if (action instanceof SetKeepSignedInAction) {
      return dispatchSetKeepSignedIn({ action, cache, parentUserId })
    } else if (action instanceof SetRelaxPrimaryDeviceAction) {
      return dispatchSetRelaxPrimaryDevice({ action, cache })
    } else if (action instanceof SetSendDeviceConnected) {
      return dispatchSetSendDeviceConnected({ action, cache, sourceDeviceId })
    } else if (action instanceof SetUserDisableLimitsUntilAction) {
      return dispatchUserSetDisableLimitsUntil({ action, cache })
    } else if (action instanceof SetUserTimezoneAction) {
      return dispatchSetUserTimezone({ action, cache })
    } else if (action instanceof UpdateCategoryBatteryLimitAction) {
      return dispatchUpdateCategoryBatteryLimit({ action, cache })
    } else if (action instanceof UpdateCategoryBlockedTimesAction) {
      return dispatchUpdateCategoryBlockedTimes({ action, cache })
    } else if (action instanceof UpdateCategorySortingAction) {
      return dispatchUpdateCategorySorting({ action, cache })
    } else if (action instanceof IncrementCategoryExtraTimeAction) {
      return dispatchIncrementCategoryExtraTime({ action, cache })
    } else if (action instanceof DeleteTimeLimitRuleAction) {
      return dispatchDeleteTimeLimitRule({ action, cache })
    } else if (action instanceof UpdateDeviceNameAction) {
      return dispatchUpdateDeviceName({ action, cache })
    } else if (action instanceof UpdateEnableActivityLevelBlockingAction) {
      return dispatchUpdateEnableActivityLevelBlocking({ action, cache })
    } else if (action instanceof UpdateNetworkTimeVerificationAction) {
      return dispatchUpdateNetworkTimeVerification({ action, cache })
    } else if (action instanceof UpdateParentNotificationFlagsAction) {
      return dispatchUpdateParentNotificationFlags({ action, cache })
    } else if (action instanceof UpdateTimelimitRuleAction) {
      return dispatchUpdateTimelimitRule({ action, cache })
    } else if (action instanceof RemoveUserAction) {
      return dispatchRemoveUser({ action, cache, parentUserId })
    } else if (action instanceof RenameChildAction) {
      return dispatchRenameChild({ action, cache })
    } else if (action instanceof ChangeParentPasswordAction) {
      return dispatchChangeParentPassword({ action, cache })
    } else if (action instanceof IgnoreManipulationAction) {
      return dispatchIgnoreManipulation({ action, cache })
    } else if (action instanceof UpdateCategoryTimeWarningsAction) {
      return dispatchUpdateCategoryTimeWarnings({ action, cache })
    } else if (action instanceof ResetParentBlockedTimesAction) {
      return dispatchResetParentBlockedTimes({ action, cache })
    } else if (action instanceof UpdateParentBlockedTimesAction) {
      return dispatchUpdateParentBlockedTimes({ action, cache, parentUserId })
    } else if (action instanceof UpdateUserFlagsAction) {
      return dispatchUpdateUserFlagsAction({ action, cache })
    } else if (action instanceof UpdateUserLimitLoginCategory) {
      return dispatchUpdateUserLimitLoginCategoryAction({ action, cache, parentUserId })
    }
  } else {
    throw new Error('unsupported action type')
  }
}
