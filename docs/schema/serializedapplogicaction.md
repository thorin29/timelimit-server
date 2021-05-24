# SerializedAppLogicAction Schema

```txt
https://timelimit.io/SerializedAppLogicAction
```



| Abstract               | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                          |
| :--------------------- | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------------------------- |
| Cannot be instantiated | Yes        | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SerializedAppLogicAction.schema.json](SerializedAppLogicAction.schema.json "open original schema") |

## SerializedAppLogicAction Type

merged type ([SerializedAppLogicAction](serializedapplogicaction.md))

any of

*   [SerializedAddInstalledAppsAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction.md "check type definition")

*   [SerializedAddUsedTimeAction](serializedapplogicaction-definitions-serializedaddusedtimeaction.md "check type definition")

*   [SerializedAddUsedTimeActionVersion2](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2.md "check type definition")

*   [SerializedForceSyncAction](serializedapplogicaction-definitions-serializedforcesyncaction.md "check type definition")

*   [SerializedMarkTaskPendingAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction.md "check type definition")

*   [SerializedRemoveInstalledAppsAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction.md "check type definition")

*   [SerializedSignOutAtDeviceAction](serializedapplogicaction-definitions-serializedsignoutatdeviceaction.md "check type definition")

*   [SerialiezdTriedDisablingDeviceAdminAction](serializedapplogicaction-definitions-serialiezdtrieddisablingdeviceadminaction.md "check type definition")

*   [SerializedUpdateAppActivitiesAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction.md "check type definition")

*   [SerializedUpdateDeviceStatusAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction.md "check type definition")

# SerializedAppLogicAction Definitions

## Definitions group SerializedAddInstalledAppsAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction"}
```

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                         |
| :------------ | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction/properties/type") |
| [apps](#apps) | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction-properties-apps.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction/properties/apps") |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | :---------- |
| `"ADD_INSTALLED_APPS"` |             |

### apps



`apps`

*   is required

*   Type: `object[]` ([SerializedInstalledApp](serializedapplogicaction-definitions-serializedinstalledapp.md))

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddinstalledappsaction-properties-apps.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddInstalledAppsAction/properties/apps")

#### apps Type

`object[]` ([SerializedInstalledApp](serializedapplogicaction-definitions-serializedinstalledapp.md))

## Definitions group SerializedInstalledApp

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp"}
```

| Property                          | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                            |
| :-------------------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [packageName](#packagename)       | `string`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedinstalledapp-properties-packagename.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp/properties/packageName")          |
| [title](#title)                   | `string`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedinstalledapp-properties-title.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp/properties/title")                      |
| [isLaunchable](#islaunchable)     | `boolean` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedinstalledapp-properties-islaunchable.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp/properties/isLaunchable")        |
| [recommendation](#recommendation) | `string`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedinstalledapp-properties-apprecommendation.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp/properties/recommendation") |

### packageName



`packageName`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedinstalledapp-properties-packagename.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp/properties/packageName")

#### packageName Type

`string`

### title



`title`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedinstalledapp-properties-title.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp/properties/title")

#### title Type

`string`

### isLaunchable



`isLaunchable`

*   is required

*   Type: `boolean`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedinstalledapp-properties-islaunchable.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp/properties/isLaunchable")

#### isLaunchable Type

`boolean`

### recommendation



`recommendation`

*   is required

*   Type: `string` ([AppRecommendation](serializedapplogicaction-definitions-serializedinstalledapp-properties-apprecommendation.md))

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedinstalledapp-properties-apprecommendation.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedInstalledApp/properties/recommendation")

#### recommendation Type

`string` ([AppRecommendation](serializedapplogicaction-definitions-serializedinstalledapp-properties-apprecommendation.md))

#### recommendation Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value         | Explanation |
| :------------ | :---------- |
| `"blacklist"` |             |
| `"none"`      |             |
| `"whitelist"` |             |

## Definitions group AppRecommendation

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/AppRecommendation"}
```

| Property | Type | Required | Nullable | Defined by |
| :------- | :--- | :------- | :------- | :--------- |

## Definitions group SerializedAddUsedTimeAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction"}
```

| Property                                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                             |
| :------------------------------------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-1)                             | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/type")                               |
| [categoryId](#categoryid)                   | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-categoryid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/categoryId")                   |
| [day](#day)                                 | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-day.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/day")                                 |
| [timeToAdd](#timetoadd)                     | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-timetoadd.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/timeToAdd")                     |
| [extraTimeToSubtract](#extratimetosubtract) | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-extratimetosubtract.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/extraTimeToSubtract") |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"ADD_USED_TIME"` |             |

### categoryId



`categoryId`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-categoryid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/categoryId")

#### categoryId Type

`string`

### day



`day`

*   is required

*   Type: `number`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-day.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/day")

#### day Type

`number`

### timeToAdd



`timeToAdd`

*   is required

*   Type: `number`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-timetoadd.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/timeToAdd")

#### timeToAdd Type

`number`

### extraTimeToSubtract



`extraTimeToSubtract`

*   is required

*   Type: `number`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeaction-properties-extratimetosubtract.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeAction/properties/extraTimeToSubtract")

#### extraTimeToSubtract Type

`number`

## Definitions group SerializedAddUsedTimeActionVersion2

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2"}
```

| Property        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                               |
| :-------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-2) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/type") |
| [d](#d)         | `number` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-d.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/d")       |
| [i](#i)         | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-i.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/i")       |
| [t](#t)         | `number` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-t.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/t")       |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                | Explanation |
| :------------------- | :---------- |
| `"ADD_USED_TIME_V2"` |             |

### d



`d`

*   is required

*   Type: `number`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-d.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/d")

#### d Type

`number`

### i



`i`

*   is required

*   Type: `object[]` ([Details](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-i-items.md))

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-i.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/i")

#### i Type

`object[]` ([Details](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-i-items.md))

### t



`t`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedaddusedtimeactionversion2-properties-t.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAddUsedTimeActionVersion2/properties/t")

#### t Type

`number`

## Definitions group SerializedForceSyncAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedForceSyncAction"}
```

| Property        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                           |
| :-------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-3) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedforcesyncaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedForceSyncAction/properties/type") |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedforcesyncaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedForceSyncAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value          | Explanation |
| :------------- | :---------- |
| `"FORCE_SYNC"` |             |

## Definitions group SerializedMarkTaskPendingAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction"}
```

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                           |
| :---------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-4)   | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction/properties/type")     |
| [taskId](#taskid) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction-properties-taskid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction/properties/taskId") |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | :---------- |
| `"MARK_TASK_PENDING"` |             |

### taskId



`taskId`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedmarktaskpendingaction-properties-taskid.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedMarkTaskPendingAction/properties/taskId")

#### taskId Type

`string`

## Definitions group SerializedRemoveInstalledAppsAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction"}
```

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                               |
| :---------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-5)               | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction/properties/type")                 |
| [packageNames](#packagenames) | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction-properties-packagenames.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction/properties/packageNames") |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"REMOVE_INSTALLED_APPS"` |             |

### packageNames



`packageNames`

*   is required

*   Type: `string[]`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedremoveinstalledappsaction-properties-packagenames.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedRemoveInstalledAppsAction/properties/packageNames")

#### packageNames Type

`string[]`

## Definitions group SerializedSignOutAtDeviceAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSignOutAtDeviceAction"}
```

| Property        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                       |
| :-------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-6) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsignoutatdeviceaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSignOutAtDeviceAction/properties/type") |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedsignoutatdeviceaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedSignOutAtDeviceAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | :---------- |
| `"SIGN_OUT_AT_DEVICE"` |             |

## Definitions group SerialiezdTriedDisablingDeviceAdminAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerialiezdTriedDisablingDeviceAdminAction"}
```

| Property        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                           |
| :-------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-7) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serialiezdtrieddisablingdeviceadminaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerialiezdTriedDisablingDeviceAdminAction/properties/type") |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serialiezdtrieddisablingdeviceadminaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerialiezdTriedDisablingDeviceAdminAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                            | Explanation |
| :------------------------------- | :---------- |
| `"TRIED_DISABLING_DEVICE_ADMIN"` |             |

## Definitions group SerializedUpdateAppActivitiesAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction"}
```

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                   |
| :-------------------------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-8)                   | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/type")                     |
| [removed](#removed)               | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/removed")               |
| [updatedOrAdded](#updatedoradded) | `array`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-updatedoradded.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/updatedOrAdded") |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"UPDATE_APP_ACTIVITIES"` |             |

### removed



`removed`

*   is required

*   Type: an array where each item follows the corresponding schema in the following list:

    1.  [Untitled string in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-items-0.md "check type definition")

    2.  [Untitled string in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-items-1.md "check type definition")

    3.  and all following items must follow the schema: [Untitled undefined type in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-additionalitems.md "check type definition")

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/removed")

#### removed Type

an array where each item follows the corresponding schema in the following list:

1.  [Untitled string in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-items-0.md "check type definition")

2.  [Untitled string in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-items-1.md "check type definition")

3.  and all following items must follow the schema: [Untitled undefined type in SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-removed-items-additionalitems.md "check type definition")

### updatedOrAdded



`updatedOrAdded`

*   is required

*   Type: `object[]` ([SerializedAppActivityItem](serializedapplogicaction-definitions-serializedappactivityitem.md))

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdateappactivitiesaction-properties-updatedoradded.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateAppActivitiesAction/properties/updatedOrAdded")

#### updatedOrAdded Type

`object[]` ([SerializedAppActivityItem](serializedapplogicaction-definitions-serializedappactivityitem.md))

## Definitions group SerializedAppActivityItem

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAppActivityItem"}
```

| Property  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                     |
| :-------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [p](#p)   | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedappactivityitem-properties-p.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAppActivityItem/properties/p") |
| [c](#c)   | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedappactivityitem-properties-c.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAppActivityItem/properties/c") |
| [t](#t-1) | `string` | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedappactivityitem-properties-t.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAppActivityItem/properties/t") |

### p



`p`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedappactivityitem-properties-p.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAppActivityItem/properties/p")

#### p Type

`string`

### c



`c`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedappactivityitem-properties-c.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAppActivityItem/properties/c")

#### c Type

`string`

### t



`t`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedappactivityitem-properties-t.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedAppActivityItem/properties/t")

#### t Type

`string`

## Definitions group SerializedUpdateDeviceStatusAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction"}
```

| Property                                                    | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                           |
| :---------------------------------------------------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type-9)                                             | `string`  | Required | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/type")                                               |
| [protectionLevel](#protectionlevel)                         | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-protectionlevel.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/protectionLevel")                         |
| [usageStats](#usagestats)                                   | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-usagestats.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/usageStats")                                   |
| [notificationAccess](#notificationaccess)                   | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-notificationaccess.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/notificationAccess")                   |
| [overlayPermission](#overlaypermission)                     | `string`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-overlaypermission.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/overlayPermission")                     |
| [accessibilityServiceEnabled](#accessibilityserviceenabled) | `boolean` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-accessibilityserviceenabled.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/accessibilityServiceEnabled") |
| [appVersion](#appversion)                                   | `number`  | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-appversion.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/appVersion")                                   |
| [didReboot](#didreboot)                                     | `boolean` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-didreboot.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/didReboot")                                     |
| [isQOrLaterNow](#isqorlaternow)                             | `boolean` | Optional | cannot be null | [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-isqorlaternow.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/isQOrLaterNow")                             |

### type



`type`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-type.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                    | Explanation |
| :----------------------- | :---------- |
| `"UPDATE_DEVICE_STATUS"` |             |

### protectionLevel



`protectionLevel`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-protectionlevel.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/protectionLevel")

#### protectionLevel Type

`string`

#### protectionLevel Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | :---------- |
| `"device owner"`          |             |
| `"none"`                  |             |
| `"password device admin"` |             |
| `"simple device admin"`   |             |

### usageStats



`usageStats`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-usagestats.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/usageStats")

#### usageStats Type

`string`

#### usageStats Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | :---------- |
| `"granted"`      |             |
| `"not granted"`  |             |
| `"not required"` |             |

### notificationAccess



`notificationAccess`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-notificationaccess.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/notificationAccess")

#### notificationAccess Type

`string`

#### notificationAccess Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | :---------- |
| `"granted"`       |             |
| `"not granted"`   |             |
| `"not supported"` |             |

### overlayPermission



`overlayPermission`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-overlaypermission.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/overlayPermission")

#### overlayPermission Type

`string`

#### overlayPermission Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | :---------- |
| `"granted"`      |             |
| `"not granted"`  |             |
| `"not required"` |             |

### accessibilityServiceEnabled



`accessibilityServiceEnabled`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-accessibilityserviceenabled.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/accessibilityServiceEnabled")

#### accessibilityServiceEnabled Type

`boolean`

### appVersion



`appVersion`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-appversion.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/appVersion")

#### appVersion Type

`number`

### didReboot



`didReboot`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-didreboot.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/didReboot")

#### didReboot Type

`boolean`

### isQOrLaterNow



`isQOrLaterNow`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [SerializedAppLogicAction](serializedapplogicaction-definitions-serializedupdatedevicestatusaction-properties-isqorlaternow.md "https://timelimit.io/SerializedAppLogicAction#/definitions/SerializedUpdateDeviceStatusAction/properties/isQOrLaterNow")

#### isQOrLaterNow Type

`boolean`
