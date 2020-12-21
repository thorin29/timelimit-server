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
  AddCategoryNetworkIdAction,
  AddUserAction,
  ChangeParentPasswordAction,
  CreateCategoryAction,
  CreateTimeLimitRuleAction,
  DeleteCategoryAction,
  DeleteChildTaskAction,
  DeleteTimeLimitRuleAction,
  IgnoreManipulationAction,
  IncrementCategoryExtraTimeAction,
  ParentAction,
  RemoveCategoryAppsAction,
  RemoveUserAction,
  RenameChildAction,
  ResetCategoryNetworkIdsAction,
  ReviewChildTaskAction,
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
  UpdateCategoryDisableLimitsAction,
  UpdateCategorySortingAction,
  UpdateCategoryTemporarilyBlockedAction,
  UpdateCategoryTimeWarningsAction,
  UpdateCategoryTitleAction,
  UpdateChildTaskAction,
  UpdateDeviceNameAction,
  UpdateEnableActivityLevelBlockingAction,
  UpdateNetworkTimeVerificationAction,
  UpdateParentNotificationFlagsAction,
  UpdateTimelimitRuleAction,
  UpdateUserFlagsAction,
  UpdateUserLimitLoginCategory
} from '../../../../action'
import { Cache } from '../cache'
import { ActionObjectTypeNotHandledException } from '../exception/illegal-state'
import { ActionNotSupportedBySelfLimitationException } from '../exception/self-limit'
import { dispatchAddCategoryApps } from './addcategoryapps'
import { dispatchAddCategoryNetworkId } from './addcategorynetworkid'
import { dispatchAddUser } from './adduser'
import { dispatchChangeParentPassword } from './changeparentpassword'
import { dispatchCreateCategory } from './createcategory'
import { dispatchCreateTimeLimitRule } from './createtimelimitrule'
import { dispatchDeleteCategory } from './deletecategory'
import { dispatchDeleteChildTaskAction } from './deletechildtaskaction'
import { dispatchDeleteTimeLimitRule } from './deletetimelimitrule'
import { dispatchIgnoreManipulation } from './ignoremanipulation'
import { dispatchIncrementCategoryExtraTime } from './incrementcategoryextratime'
import { dispatchRemoveCategoryApps } from './removecategoryapps'
import { dispatchRemoveUser } from './removeuser'
import { dispatchRenameChild } from './renamechild'
import { dispatchResetCategoryNetworkIds } from './resetcategorynetworkids'
import { dispatchReviewChildTaskAction } from './reviewchildtaskaction'
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
import { dispatchUpdateCategoryDisableLimits } from './updatecategorydisablelimits'
import { dispatchUpdateCategorySorting } from './updatecategorysorting'
import { dispatchUpdateCategoryTemporarilyBlocked } from './updatecategorytemporarilyblocked'
import { dispatchUpdateCategoryTimeWarnings } from './updatecategorytimewarnings'
import { dispatchUpdateCategoryTitle } from './updatecategorytitle'
import { dispatchUpdateChildTaskAction } from './updatechildtaskaction'
import { dispatchUpdateDeviceName } from './updatedevicename'
import { dispatchUpdateEnableActivityLevelBlocking } from './updateenableactivitylevelblocking'
import { dispatchUpdateNetworkTimeVerification } from './updatenetworktimeverification'
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
  } else if (action instanceof UpdateCategoryBlockedTimesAction) {
    return dispatchUpdateCategoryBlockedTimes({ action, cache, fromChildSelfLimitAddChildUserId })
  } else if (action instanceof UpdateCategoryDisableLimitsAction) {
    return dispatchUpdateCategoryDisableLimits({ action, cache, fromChildSelfLimitAddChildUserId })
  }

  if (fromChildSelfLimitAddChildUserId !== null) {
    throw new ActionNotSupportedBySelfLimitationException()
  } else {
    if (action instanceof AddCategoryNetworkIdAction) {
      return dispatchAddCategoryNetworkId({ action, cache })
    } else if (action instanceof AddUserAction) {
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
    } else if (action instanceof ResetCategoryNetworkIdsAction) {
      return dispatchResetCategoryNetworkIds({ action, cache })
    } else if (action instanceof RenameChildAction) {
      return dispatchRenameChild({ action, cache })
    } else if (action instanceof ChangeParentPasswordAction) {
      return dispatchChangeParentPassword({ action, cache })
    } else if (action instanceof IgnoreManipulationAction) {
      return dispatchIgnoreManipulation({ action, cache })
    } else if (action instanceof UpdateCategoryTimeWarningsAction) {
      return dispatchUpdateCategoryTimeWarnings({ action, cache })
    } else if (action instanceof UpdateUserFlagsAction) {
      return dispatchUpdateUserFlagsAction({ action, cache })
    } else if (action instanceof UpdateUserLimitLoginCategory) {
      return dispatchUpdateUserLimitLoginCategoryAction({ action, cache, parentUserId })
    } else if (action instanceof DeleteChildTaskAction) {
      await dispatchDeleteChildTaskAction({ action, cache })
    } else if (action instanceof ReviewChildTaskAction) {
      await dispatchReviewChildTaskAction({ action, cache })
    } else if (action instanceof UpdateChildTaskAction) {
      await dispatchUpdateChildTaskAction({ action, cache })
    } else {
      throw new ActionObjectTypeNotHandledException()
    }
  }
}
