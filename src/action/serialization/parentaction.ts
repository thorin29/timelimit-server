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

import { AddCategoryAppsAction, SerializedAddCategoryAppsAction } from '../addcategoryapps'
import { AddUserAction, SerializedAddUserAction } from '../adduser'
import { ParentAction } from '../basetypes'
import { ChangeParentPasswordAction, SerializedChangeParentPasswordAction } from '../changeparentpassword'
import { CreateCategoryAction, SerializedCreateCategoryAction } from '../createcategory'
import { CreateTimeLimitRuleAction, SerializedCreateTimelimtRuleAction } from '../createtimelimitrule'
import { DeleteCategoryAction, SerializedDeleteCategoryAction } from '../deletecategory'
import { DeleteTimeLimitRuleAction, SerializedDeleteTimeLimitRuleAction } from '../deletetimelimitrule'
import { IgnoreManipulationAction, SerializedIgnoreManipulationAction } from '../ignoremanipulation'
import { IncrementCategoryExtraTimeAction, SerializedIncrementCategoryExtraTimeAction } from '../incrementcategoryextratime'
import { RemoveCategoryAppsAction, SerializedRemoveCategoryAppsAction } from '../removecategoryapps'
import { RemoveUserAction, SerializedRemoveUserAction } from '../removeuser'
import { RenameChildAction, SerializedRenameChildAction } from '../renamechild'
import { SerializedSetCategoryExtraTimeAction, SetCategoryExtraTimeAction } from '../setcategoryextratime'
import { SerializedSetCategoryForUnassignedAppsAction, SetCategoryForUnassignedAppsAction } from '../setcategoryforunassignedapps'
import { SerializedSetChildPasswordAction, SetChildPasswordAction } from '../setchildpassword'
import { SerializedSetConsiderRebootManipulationAction, SetConsiderRebootManipulationAction } from '../setconsiderrebootmanipulation'
import { SerializedSetDeviceDefaultUserAction, SetDeviceDefaultUserAction } from '../setdevicedefaultuser'
import { SerializedSetDeviceDefaultUserTimeoutAction, SetDeviceDefaultUserTimeoutAction } from '../setdevicedefaultusertimeout'
import { SerializedSetDeviceUserAction, SetDeviceUserAction } from '../setdeviceuser'
import { SerializedSetKeepSignedInAction, SetKeepSignedInAction } from '../setkeepsignedin'
import { SerializedSetParentCategoryAction, SetParentCategoryAction } from '../setparentcategory'
import { SerializedSetRelaxPrimaryDeviceAction, SetRelaxPrimaryDeviceAction } from '../setrelaxprimarydevice'
import { SerializedSetSendDeviceConnected, SetSendDeviceConnected } from '../setsenddeviceconnected'
import { SerializedSetUserDisableLimitsUntilAction, SetUserDisableLimitsUntilAction } from '../setuserdisablelimitsuntil'
import { SerializedSetUserTimezoneAction, SetUserTimezoneAction } from '../setusertimezone'
import { SerializedUpdateCategoryBlockedTimesAction, UpdateCategoryBlockedTimesAction } from '../updatecategoryblockedtimes'
import { SerializedUpdateCategoryTemporarilyBlockedAction, UpdateCategoryTemporarilyBlockedAction } from '../updatecategorytemporarilyblocked'
import { SerializedUpdateCategoryTitleAction, UpdateCategoryTitleAction } from '../updatecategorytitle'
import { SerializedUpdateDeviceNameAction, UpdateDeviceNameAction } from '../updatedevicename'
import { SerialiizedUpdateNetworkTimeVerificationAction, UpdateNetworkTimeVerificationAction } from '../updatenetworktimeverification'
import { SerializedUpdateParentNotificationFlagsAction, UpdateParentNotificationFlagsAction } from '../updateparentnotificationflags'
import { SerializedUpdateTimelimitRuleAction, UpdateTimelimitRuleAction } from '../updatetimelimitrule'

export type SerializedParentAction =
  SerializedAddCategoryAppsAction |
  SerializedAddUserAction |
  SerializedChangeParentPasswordAction |
  SerializedCreateCategoryAction |
  SerializedCreateTimelimtRuleAction |
  SerializedDeleteCategoryAction |
  SerializedDeleteTimeLimitRuleAction |
  SerializedIgnoreManipulationAction |
  SerializedIncrementCategoryExtraTimeAction |
  SerializedRemoveCategoryAppsAction |
  SerializedRemoveUserAction |
  SerializedRenameChildAction |
  SerializedSetCategoryForUnassignedAppsAction |
  SerializedSetChildPasswordAction |
  SerializedSetConsiderRebootManipulationAction |
  SerializedSetDeviceDefaultUserAction |
  SerializedSetDeviceDefaultUserTimeoutAction |
  SerializedSetCategoryExtraTimeAction |
  SerializedSetDeviceUserAction |
  SerializedSetKeepSignedInAction |
  SerializedSetParentCategoryAction |
  SerializedSetRelaxPrimaryDeviceAction |
  SerializedSetSendDeviceConnected |
  SerializedSetUserDisableLimitsUntilAction |
  SerializedSetUserTimezoneAction |
  SerializedUpdateCategoryBlockedTimesAction |
  SerializedUpdateCategoryTemporarilyBlockedAction |
  SerializedUpdateCategoryTitleAction |
  SerializedUpdateDeviceNameAction |
  SerialiizedUpdateNetworkTimeVerificationAction |
  SerializedUpdateParentNotificationFlagsAction |
  SerializedUpdateTimelimitRuleAction

export const parseParentAction = (action: SerializedParentAction): ParentAction => {
  if (action.type === 'ADD_CATEGORY_APPS') {
    return AddCategoryAppsAction.parse(action)
  } else if (action.type === 'ADD_USER') {
    return AddUserAction.parse(action)
  } else if (action.type === 'CHANGE_PARENT_PASSWORD') {
    return ChangeParentPasswordAction.parse(action)
  } else if (action.type === 'CREATE_CATEGORY') {
    return CreateCategoryAction.parse(action)
  } else if (action.type === 'CREATE_TIMELIMIT_RULE') {
    return CreateTimeLimitRuleAction.parse(action)
  } else if (action.type === 'DELETE_CATEGORY') {
    return DeleteCategoryAction.parse(action)
  } else if (action.type === 'DELETE_TIMELIMIT_RULE') {
    return DeleteTimeLimitRuleAction.parse(action)
  } else if (action.type === 'IGNORE_MANIPULATION') {
    return IgnoreManipulationAction.parse(action)
  } else if (action.type === 'INCREMENT_CATEGORY_EXTRATIME') {
    return IncrementCategoryExtraTimeAction.parse(action)
  } else if (action.type === 'REMOVE_CATEGORY_APPS') {
    return RemoveCategoryAppsAction.parse(action)
  } else if (action.type === 'REMOVE_USER') {
    return RemoveUserAction.parse(action)
  } else if (action.type === 'RENAME_CHILD') {
    return RenameChildAction.parse(action)
  } else if (action.type === 'SET_CATEGORY_EXTRA_TIME') {
    return SetCategoryExtraTimeAction.parse(action)
  } else if (action.type === 'SET_CATEGORY_FOR_UNASSIGNED_APPS') {
    return SetCategoryForUnassignedAppsAction.parse(action)
  } else if (action.type === 'SET_CHILD_PASSWORD') {
    return SetChildPasswordAction.parse(action)
  } else if (action.type === 'SET_CONSIDER_REBOOT_MANIPULATION') {
    return SetConsiderRebootManipulationAction.parse(action)
  } else if (action.type === 'SET_DEVICE_DEFAULT_USER') {
    return SetDeviceDefaultUserAction.parse(action)
  } else if (action.type === 'SET_DEVICE_DEFAULT_USER_TIMEOUT') {
    return SetDeviceDefaultUserTimeoutAction.parse(action)
  } else if (action.type === 'SET_DEVICE_USER') {
    return SetDeviceUserAction.parse(action)
  } else if (action.type === 'SET_KEEP_SIGNED_IN') {
    return SetKeepSignedInAction.parse(action)
  } else if (action.type === 'SET_PARENT_CATEGORY') {
    return SetParentCategoryAction.parse(action)
  } else if (action.type === 'SET_RELAX_PRIMARY_DEVICE') {
    return SetRelaxPrimaryDeviceAction.parse(action)
  } else if (action.type === 'SET_SEND_DEVICE_CONNECTED') {
    return SetSendDeviceConnected.parse(action)
  } else if (action.type === 'SET_USER_DISABLE_LIMITS_UNTIL') {
    return SetUserDisableLimitsUntilAction.parse(action)
  } else if (action.type === 'SET_USER_TIMEZONE') {
    return SetUserTimezoneAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_BLOCKED_TIMES') {
    return UpdateCategoryBlockedTimesAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_TITLE') {
    return UpdateCategoryTitleAction.parse(action)
  } else if (action.type === 'UPDATE_CATEGORY_TEMPORARILY_BLOCKED') {
    return UpdateCategoryTemporarilyBlockedAction.parse(action)
  } else if (action.type === 'UPDATE_DEVICE_NAME') {
    return UpdateDeviceNameAction.parse(action)
  } else if (action.type === 'UPDATE_NETWORK_TIME_VERIFICATION') {
    return UpdateNetworkTimeVerificationAction.parse(action)
  } else if (action.type === 'UPDATE_PARENT_NOTIFICATION_FLAGS') {
    return UpdateParentNotificationFlagsAction.parse(action)
  } else if (action.type === 'UPDATE_TIMELIMIT_RULE') {
    return UpdateTimelimitRuleAction.parse(action)
  } else {
    throw new Error('illegal state: invalid type for action at parseParentAction')
  }
}
