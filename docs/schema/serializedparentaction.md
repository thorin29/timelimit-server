# SerializedParentAction Schema

```txt
https://timelimit.io/SerializedParentAction
```




| Abstract               | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                      |
| :--------------------- | ---------- | -------------- | ----------------------- | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------------------------- |
| Cannot be instantiated | Yes        | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [SerializedParentAction.schema.json](SerializedParentAction.schema.json "open original schema") |

## SerializedParentAction Type

merged type ([SerializedParentAction](serializedparentaction.md))

any of

-   [SerializedAddCategoryAppsAction](serializedparentaction-definitions-serializedaddcategoryappsaction.md "check type definition")
-   [SerializedAddUserAction](serializedparentaction-definitions-serializedadduseraction.md "check type definition")
-   [SerializedChangeParentPasswordAction](serializedparentaction-definitions-serializedchangeparentpasswordaction.md "check type definition")
-   [SerializedCreateCategoryAction](serializedparentaction-definitions-serializedcreatecategoryaction.md "check type definition")
-   [SerializedCreateTimelimtRuleAction](serializedparentaction-definitions-serializedcreatetimelimtruleaction.md "check type definition")
-   [SerializedDeleteCategoryAction](serializedparentaction-definitions-serializeddeletecategoryaction.md "check type definition")
-   [SerializedDeleteTimeLimitRuleAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction.md "check type definition")
-   [SerializedIgnoreManipulationAction](serializedparentaction-definitions-serializedignoremanipulationaction.md "check type definition")
-   [SerializedIncrementCategoryExtraTimeAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction.md "check type definition")
-   [SerializedRemoveCategoryAppsAction](serializedparentaction-definitions-serializedremovecategoryappsaction.md "check type definition")
-   [SerializedRemoveUserAction](serializedparentaction-definitions-serializedremoveuseraction.md "check type definition")
-   [SerializedRenameChildAction](serializedparentaction-definitions-serializedrenamechildaction.md "check type definition")
-   [SerializedResetParentBlockedTimesAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction.md "check type definition")
-   [SerializedSetCategoryExtraTimeAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction.md "check type definition")
-   [SerializedSetCategoryForUnassignedAppsAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction.md "check type definition")
-   [SerializedSetChildPasswordAction](serializedparentaction-definitions-serializedsetchildpasswordaction.md "check type definition")
-   [SerializedSetConsiderRebootManipulationAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction.md "check type definition")
-   [SerializedSetDeviceDefaultUserAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction.md "check type definition")
-   [SerializedSetDeviceDefaultUserTimeoutAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction.md "check type definition")
-   [SerializedSetDeviceUserAction](serializedparentaction-definitions-serializedsetdeviceuseraction.md "check type definition")
-   [SerializedSetKeepSignedInAction](serializedparentaction-definitions-serializedsetkeepsignedinaction.md "check type definition")
-   [SerializedSetParentCategoryAction](serializedparentaction-definitions-serializedsetparentcategoryaction.md "check type definition")
-   [SerializedSetRelaxPrimaryDeviceAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction.md "check type definition")
-   [SerializedSetSendDeviceConnected](serializedparentaction-definitions-serializedsetsenddeviceconnected.md "check type definition")
-   [SerializedSetUserDisableLimitsUntilAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction.md "check type definition")
-   [SerializedSetUserTimezoneAction](serializedparentaction-definitions-serializedsetusertimezoneaction.md "check type definition")
-   [SerializedUpdateCategoryBatteryLimitAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction.md "check type definition")
-   [SerializedUpdateCategoryBlockAllNotificationsAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction.md "check type definition")
-   [SerializedUpdateCategoryBlockedTimesAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction.md "check type definition")
-   [SerializedUpdateCategorySortingAction](serializedparentaction-definitions-serializedupdatecategorysortingaction.md "check type definition")
-   [SerializedUpdateCategoryTemporarilyBlockedAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction.md "check type definition")
-   [SerializedUpdateCategoryTimeWarningsAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction.md "check type definition")
-   [SerializedUpdateCategoryTitleAction](serializedparentaction-definitions-serializedupdatecategorytitleaction.md "check type definition")
-   [SerializedUpdateDeviceNameAction](serializedparentaction-definitions-serializedupdatedevicenameaction.md "check type definition")
-   [SerializedUpdateEnableActivityLevelBlockingAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction.md "check type definition")
-   [SerialiizedUpdateNetworkTimeVerificationAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction.md "check type definition")
-   [SerializedUpdateParentBlockedTimesAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction.md "check type definition")
-   [SerializedUpdateParentNotificationFlagsAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction.md "check type definition")
-   [SerializedUpdateTimelimitRuleAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction.md "check type definition")

# SerializedParentAction Definitions

## Definitions group SerializedAddCategoryAppsAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction"}
```

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                      |
| :---------------------------- | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/type")                 |
| [categoryId](#categoryId)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/categoryId")     |
| [packageNames](#packageNames) | `array`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-packagenames.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/packageNames") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | ----------- |
| `"ADD_CATEGORY_APPS"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/categoryId")

#### categoryId Type

`string`

### packageNames




`packageNames`

-   is required
-   Type: `string[]`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedaddcategoryappsaction-properties-packagenames.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddCategoryAppsAction/properties/packageNames")

#### packageNames Type

`string[]`

## Definitions group SerializedAddUserAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                              |
| :-------------------- | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/type")         |
| [name](#name)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-name.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/name")         |
| [userType](#userType) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-usertype.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/userType") |
| [userId](#userId)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/userId")     |
| [password](#password) | `object` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-parentpassword.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/password")                              |
| [timeZone](#timeZone) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-timezone.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/timeZone") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value        | Explanation |
| :----------- | ----------- |
| `"ADD_USER"` |             |

### name




`name`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-name.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/name")

#### name Type

`string`

### userType




`userType`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-usertype.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/userType")

#### userType Type

`string`

#### userType Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value      | Explanation |
| :--------- | ----------- |
| `"child"`  |             |
| `"parent"` |             |

### userId




`userId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/userId")

#### userId Type

`string`

### password




`password`

-   is optional
-   Type: `object` ([ParentPassword](serializedparentaction-definitions-parentpassword.md))
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-parentpassword.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/password")

#### password Type

`object` ([ParentPassword](serializedparentaction-definitions-parentpassword.md))

### timeZone




`timeZone`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedadduseraction-properties-timezone.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedAddUserAction/properties/timeZone")

#### timeZone Type

`string`

## Definitions group ParentPassword

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/ParentPassword"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                |
| :------------------------ | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-hash.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/hash")             |
| [secondHash](#secondHash) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-secondhash.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/secondHash") |
| [secondSalt](#secondSalt) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-secondsalt.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/secondSalt") |

### hash




`hash`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-hash.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/hash")

#### hash Type

`string`

### secondHash




`secondHash`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-secondhash.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/secondHash")

#### secondHash Type

`string`

### secondSalt




`secondSalt`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-parentpassword-properties-secondsalt.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/ParentPassword/properties/secondSalt")

#### secondSalt Type

`string`

## Definitions group SerializedChangeParentPasswordAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction"}
```

| Property                                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                              |
| :------------------------------------------ | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/type")                               |
| [userId](#userId)                           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/userId")                           |
| [hash](#hash)                               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-hash.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/hash")                               |
| [secondSalt](#secondSalt)                   | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-secondsalt.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/secondSalt")                   |
| [secondHashEncrypted](#secondHashEncrypted) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-secondhashencrypted.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/secondHashEncrypted") |
| [integrity](#integrity)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-integrity.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/integrity")                     |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                      | Explanation |
| :------------------------- | ----------- |
| `"CHANGE_PARENT_PASSWORD"` |             |

### userId




`userId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/userId")

#### userId Type

`string`

### hash




`hash`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-hash.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/hash")

#### hash Type

`string`

### secondSalt




`secondSalt`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-secondsalt.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/secondSalt")

#### secondSalt Type

`string`

### secondHashEncrypted




`secondHashEncrypted`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-secondhashencrypted.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/secondHashEncrypted")

#### secondHashEncrypted Type

`string`

### integrity




`integrity`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedchangeparentpasswordaction-properties-integrity.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedChangeParentPasswordAction/properties/integrity")

#### integrity Type

`string`

## Definitions group SerializedCreateCategoryAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                |
| :------------------------ | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/type")             |
| [childId](#childId)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/childId")       |
| [categoryId](#categoryId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/categoryId") |
| [title](#title)           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-title.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/title")           |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value               | Explanation |
| :------------------ | ----------- |
| `"CREATE_CATEGORY"` |             |

### childId




`childId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/childId")

#### childId Type

`string`

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/categoryId")

#### categoryId Type

`string`

### title




`title`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatecategoryaction-properties-title.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateCategoryAction/properties/title")

#### title Type

`string`

## Definitions group SerializedCreateTimelimtRuleAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction"}
```

| Property      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                            |
| :------------ | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedcreatetimelimtruleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction/properties/type") |
| [rule](#rule) | `object` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction/properties/rule")                            |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedcreatetimelimtruleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | ----------- |
| `"CREATE_TIMELIMIT_RULE"` |             |

### rule




`rule`

-   is required
-   Type: `object` ([SerializedTimeLimitRule](serializedparentaction-definitions-serializedtimelimitrule.md))
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedCreateTimelimtRuleAction/properties/rule")

#### rule Type

`object` ([SerializedTimeLimitRule](serializedparentaction-definitions-serializedtimelimitrule.md))

## Definitions group SerializedTimeLimitRule

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule"}
```

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                  |
| :------------------------ | --------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ruleId](#ruleId)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/ruleId")         |
| [categoryId](#categoryId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/categoryId") |
| [time](#time)             | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/time")             |
| [days](#days)             | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-days.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/days")             |
| [extraTime](#extraTime)   | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-extratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/extraTime")   |
| [start](#start)           | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-start.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/start")           |
| [end](#end)               | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-end.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/end")               |
| [dur](#dur)               | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-dur.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/dur")               |
| [pause](#pause)           | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-pause.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/pause")           |

### ruleId




`ruleId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/ruleId")

#### ruleId Type

`string`

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/categoryId")

#### categoryId Type

`string`

### time




`time`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/time")

#### time Type

`number`

### days




`days`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-days.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/days")

#### days Type

`number`

### extraTime




`extraTime`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-extratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/extraTime")

#### extraTime Type

`boolean`

### start




`start`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-start.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/start")

#### start Type

`number`

### end




`end`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-end.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/end")

#### end Type

`number`

### dur




`dur`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-dur.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/dur")

#### dur Type

`number`

### pause




`pause`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-pause.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/pause")

#### pause Type

`number`

## Definitions group SerializedDeleteCategoryAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteCategoryAction"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                |
| :------------------------ | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeddeletecategoryaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedDeleteCategoryAction/properties/type")             |
| [categoryId](#categoryId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeddeletecategoryaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedDeleteCategoryAction/properties/categoryId") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializeddeletecategoryaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedDeleteCategoryAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value               | Explanation |
| :------------------ | ----------- |
| `"DELETE_CATEGORY"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializeddeletecategoryaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedDeleteCategoryAction/properties/categoryId")

#### categoryId Type

`string`

## Definitions group SerializedDeleteTimeLimitRuleAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction"}
```

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                  |
| :---------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction/properties/type")     |
| [ruleId](#ruleId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction/properties/ruleId") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | ----------- |
| `"DELETE_TIMELIMIT_RULE"` |             |

### ruleId




`ruleId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializeddeletetimelimitruleaction-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedDeleteTimeLimitRuleAction/properties/ruleId")

#### ruleId Type

`string`

## Definitions group SerializedIgnoreManipulationAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction"}
```

| Property                                                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                        |
| :-------------------------------------------------------- | --------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                                             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/type")                                             |
| [deviceId](#deviceId)                                     | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/deviceId")                                     |
| [admin](#admin)                                           | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-admin.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/admin")                                           |
| [adminA](#adminA)                                         | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-admina.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/adminA")                                         |
| [downgrade](#downgrade)                                   | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-downgrade.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/downgrade")                                   |
| [notification](#notification)                             | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-notification.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/notification")                             |
| [usageStats](#usageStats)                                 | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-usagestats.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/usageStats")                                 |
| [hadManipulation](#hadManipulation)                       | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-hadmanipulation.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/hadManipulation")                       |
| [reboot](#reboot)                                         | `boolean` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-reboot.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/reboot")                                         |
| [overlay](#overlay)                                       | `boolean` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-overlay.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/overlay")                                       |
| [accessibilityService](#accessibilityService)             | `boolean` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-accessibilityservice.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/accessibilityService")             |
| [ignoreHadManipulationFlags](#ignoreHadManipulationFlags) | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-ignorehadmanipulationflags.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/ignoreHadManipulationFlags") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                   | Explanation |
| :---------------------- | ----------- |
| `"IGNORE_MANIPULATION"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/deviceId")

#### deviceId Type

`string`

### admin




`admin`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-admin.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/admin")

#### admin Type

`boolean`

### adminA




`adminA`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-admina.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/adminA")

#### adminA Type

`boolean`

### downgrade




`downgrade`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-downgrade.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/downgrade")

#### downgrade Type

`boolean`

### notification




`notification`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-notification.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/notification")

#### notification Type

`boolean`

### usageStats




`usageStats`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-usagestats.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/usageStats")

#### usageStats Type

`boolean`

### hadManipulation




`hadManipulation`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-hadmanipulation.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/hadManipulation")

#### hadManipulation Type

`boolean`

### reboot




`reboot`

-   is optional
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-reboot.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/reboot")

#### reboot Type

`boolean`

### overlay




`overlay`

-   is optional
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-overlay.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/overlay")

#### overlay Type

`boolean`

### accessibilityService




`accessibilityService`

-   is optional
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-accessibilityservice.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/accessibilityService")

#### accessibilityService Type

`boolean`

### ignoreHadManipulationFlags




`ignoreHadManipulationFlags`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedignoremanipulationaction-properties-ignorehadmanipulationflags.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIgnoreManipulationAction/properties/ignoreHadManipulationFlags")

#### ignoreHadManipulationFlags Type

`number`

## Definitions group SerializedIncrementCategoryExtraTimeAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction"}
```

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                |
| :-------------------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/type")                     |
| [categoryId](#categoryId)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/categoryId")         |
| [addedExtraTime](#addedExtraTime) | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-addedextratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/addedExtraTime") |
| [day](#day)                       | `number` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-day.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/day")                       |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                            | Explanation |
| :------------------------------- | ----------- |
| `"INCREMENT_CATEGORY_EXTRATIME"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/categoryId")

#### categoryId Type

`string`

### addedExtraTime




`addedExtraTime`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-addedextratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/addedExtraTime")

#### addedExtraTime Type

`number`

### day




`day`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedincrementcategoryextratimeaction-properties-day.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedIncrementCategoryExtraTimeAction/properties/day")

#### day Type

`number`

## Definitions group SerializedRemoveCategoryAppsAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction"}
```

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                            |
| :---------------------------- | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/type")                 |
| [categoryId](#categoryId)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/categoryId")     |
| [packageNames](#packageNames) | `array`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-packagenames.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/packageNames") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                    | Explanation |
| :----------------------- | ----------- |
| `"REMOVE_CATEGORY_APPS"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/categoryId")

#### categoryId Type

`string`

### packageNames




`packageNames`

-   is required
-   Type: `string[]`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremovecategoryappsaction-properties-packagenames.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveCategoryAppsAction/properties/packageNames")

#### packageNames Type

`string[]`

## Definitions group SerializedRemoveUserAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction"}
```

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                |
| :-------------------------------- | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/type")                     |
| [userId](#userId)                 | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/userId")                 |
| [authentication](#authentication) | `string` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-authentication.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/authentication") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | ----------- |
| `"REMOVE_USER"` |             |

### userId




`userId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/userId")

#### userId Type

`string`

### authentication




`authentication`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedremoveuseraction-properties-authentication.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRemoveUserAction/properties/authentication")

#### authentication Type

`string`

## Definitions group SerializedRenameChildAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction"}
```

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                    |
| :------------------ | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/type")       |
| [childId](#childId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/childId") |
| [newName](#newName) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-newname.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/newName") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | ----------- |
| `"RENAME_CHILD"` |             |

### childId




`childId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/childId")

#### childId Type

`string`

### newName




`newName`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedrenamechildaction-properties-newname.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedRenameChildAction/properties/newName")

#### newName Type

`string`

## Definitions group SerializedResetParentBlockedTimesAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                              |
| :-------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction/properties/type")         |
| [parentId](#parentId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction/properties/parentId") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                          | Explanation |
| :----------------------------- | ----------- |
| `"RESET_PARENT_BLOCKED_TIMES"` |             |

### parentId




`parentId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedresetparentblockedtimesaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedResetParentBlockedTimesAction/properties/parentId")

#### parentId Type

`string`

## Definitions group SerializedSetCategoryExtraTimeAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction"}
```

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                |
| :---------------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/type")                 |
| [categoryId](#categoryId)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/categoryId")     |
| [newExtraTime](#newExtraTime) | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-newextratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/newExtraTime") |
| [day](#day)                   | `number` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-day.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/day")                   |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                       | Explanation |
| :-------------------------- | ----------- |
| `"SET_CATEGORY_EXTRA_TIME"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/categoryId")

#### categoryId Type

`string`

### newExtraTime




`newExtraTime`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-newextratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/newExtraTime")

#### newExtraTime Type

`number`

### day




`day`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryextratimeaction-properties-day.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryExtraTimeAction/properties/day")

#### day Type

`number`

## Definitions group SerializedSetCategoryForUnassignedAppsAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                            |
| :------------------------ | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/type")             |
| [childId](#childId)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/childId")       |
| [categoryId](#categoryId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/categoryId") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | ----------- |
| `"SET_CATEGORY_FOR_UNASSIGNED_APPS"` |             |

### childId




`childId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/childId")

#### childId Type

`string`

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetcategoryforunassignedappsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetCategoryForUnassignedAppsAction/properties/categoryId")

#### categoryId Type

`string`

## Definitions group SerializedSetChildPasswordAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction"}
```

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                              |
| :-------------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetchildpasswordaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/type")       |
| [childId](#childId)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetchildpasswordaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/childId") |
| [newPassword](#newPassword) | `object` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-parentpassword.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/newPassword")                                  |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetchildpasswordaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | ----------- |
| `"SET_CHILD_PASSWORD"` |             |

### childId




`childId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetchildpasswordaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/childId")

#### childId Type

`string`

### newPassword




`newPassword`

-   is required
-   Type: `object` ([ParentPassword](serializedparentaction-definitions-parentpassword.md))
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-parentpassword.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetChildPasswordAction/properties/newPassword")

#### newPassword Type

`object` ([ParentPassword](serializedparentaction-definitions-parentpassword.md))

## Definitions group SerializedSetConsiderRebootManipulationAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction"}
```

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                          |
| :-------------------- | --------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/type")         |
| [deviceId](#deviceId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/deviceId") |
| [enable](#enable)     | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-enable.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/enable")     |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | ----------- |
| `"SET_CONSIDER_REBOOT_MANIPULATION"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/deviceId")

#### deviceId Type

`string`

### enable




`enable`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetconsiderrebootmanipulationaction-properties-enable.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetConsiderRebootManipulationAction/properties/enable")

#### enable Type

`boolean`

## Definitions group SerializedSetDeviceDefaultUserAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction"}
```

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                  |
| :------------------------------ | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                   | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/type")                   |
| [deviceId](#deviceId)           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/deviceId")           |
| [defaultUserId](#defaultUserId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-defaultuserid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/defaultUserId") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                       | Explanation |
| :-------------------------- | ----------- |
| `"SET_DEVICE_DEFAULT_USER"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/deviceId")

#### deviceId Type

`string`

### defaultUserId




`defaultUserId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultuseraction-properties-defaultuserid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserAction/properties/defaultUserId")

#### defaultUserId Type

`string`

## Definitions group SerializedSetDeviceDefaultUserTimeoutAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                      |
| :-------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/type")         |
| [deviceId](#deviceId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/deviceId") |
| [timeout](#timeout)   | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-timeout.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/timeout")   |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                               | Explanation |
| :---------------------------------- | ----------- |
| `"SET_DEVICE_DEFAULT_USER_TIMEOUT"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/deviceId")

#### deviceId Type

`string`

### timeout




`timeout`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdevicedefaultusertimeoutaction-properties-timeout.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceDefaultUserTimeoutAction/properties/timeout")

#### timeout Type

`number`

## Definitions group SerializedSetDeviceUserAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                          |
| :-------------------- | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/type")         |
| [deviceId](#deviceId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/deviceId") |
| [userId](#userId)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/userId")     |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value               | Explanation |
| :------------------ | ----------- |
| `"SET_DEVICE_USER"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/deviceId")

#### deviceId Type

`string`

### userId




`userId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetdeviceuseraction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetDeviceUserAction/properties/userId")

#### userId Type

`string`

## Definitions group SerializedSetKeepSignedInAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction"}
```

| Property                      | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                      |
| :---------------------------- | --------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                 | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/type")                 |
| [deviceId](#deviceId)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/deviceId")         |
| [keepSignedIn](#keepSignedIn) | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-keepsignedin.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/keepSignedIn") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | ----------- |
| `"SET_KEEP_SIGNED_IN"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/deviceId")

#### deviceId Type

`string`

### keepSignedIn




`keepSignedIn`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetkeepsignedinaction-properties-keepsignedin.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetKeepSignedInAction/properties/keepSignedIn")

#### keepSignedIn Type

`boolean`

## Definitions group SerializedSetParentCategoryAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction"}
```

| Property                          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                              |
| :-------------------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)                     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/type")                     |
| [categoryId](#categoryId)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/categoryId")         |
| [parentCategory](#parentCategory) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-parentcategory.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/parentCategory") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                   | Explanation |
| :---------------------- | ----------- |
| `"SET_PARENT_CATEGORY"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/categoryId")

#### categoryId Type

`string`

### parentCategory




`parentCategory`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetparentcategoryaction-properties-parentcategory.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetParentCategoryAction/properties/parentCategory")

#### parentCategory Type

`string`

## Definitions group SerializedSetRelaxPrimaryDeviceAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction"}
```

| Property          | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                      |
| :---------------- | --------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)     | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/type")     |
| [userId](#userId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/userId") |
| [relax](#relax)   | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-relax.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/relax")   |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                        | Explanation |
| :--------------------------- | ----------- |
| `"SET_RELAX_PRIMARY_DEVICE"` |             |

### userId




`userId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/userId")

#### userId Type

`string`

### relax




`relax`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetrelaxprimarydeviceaction-properties-relax.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetRelaxPrimaryDeviceAction/properties/relax")

#### relax Type

`boolean`

## Definitions group SerializedSetSendDeviceConnected

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected"}
```

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                |
| :-------------------- | --------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/type")         |
| [deviceId](#deviceId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/deviceId") |
| [enable](#enable)     | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-enable.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/enable")     |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                         | Explanation |
| :---------------------------- | ----------- |
| `"SET_SEND_DEVICE_CONNECTED"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/deviceId")

#### deviceId Type

`string`

### enable




`enable`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetsenddeviceconnected-properties-enable.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetSendDeviceConnected/properties/enable")

#### enable Type

`boolean`

## Definitions group SerializedSetUserDisableLimitsUntilAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction"}
```

| Property            | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                |
| :------------------ | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/type")       |
| [childId](#childId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/childId") |
| [time](#time)       | `number` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/time")       |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                             | Explanation |
| :-------------------------------- | ----------- |
| `"SET_USER_DISABLE_LIMITS_UNTIL"` |             |

### childId




`childId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-childid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/childId")

#### childId Type

`string`

### time




`time`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetuserdisablelimitsuntilaction-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserDisableLimitsUntilAction/properties/time")

#### time Type

`number`

## Definitions group SerializedSetUserTimezoneAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                              |
| :-------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/type")         |
| [userId](#userId)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/userId")     |
| [timezone](#timezone) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-timezone.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/timezone") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | ----------- |
| `"SET_USER_TIMEZONE"` |             |

### userId




`userId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-userid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/userId")

#### userId Type

`string`

### timezone




`timezone`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedsetusertimezoneaction-properties-timezone.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedSetUserTimezoneAction/properties/timezone")

#### timezone Type

`string`

## Definitions group SerializedUpdateCategoryBatteryLimitAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction"}
```

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                          |
| :-------------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/type")               |
| [categoryId](#categoryId)   | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/categoryId")   |
| [chargeLimit](#chargeLimit) | `number` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-chargelimit.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/chargeLimit") |
| [mobileLimit](#mobileLimit) | `number` | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-mobilelimit.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/mobileLimit") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                             | Explanation |
| :-------------------------------- | ----------- |
| `"UPDATE_CATEGORY_BATTERY_LIMIT"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/categoryId")

#### categoryId Type

`string`

### chargeLimit




`chargeLimit`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-chargelimit.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/chargeLimit")

#### chargeLimit Type

`number`

### mobileLimit




`mobileLimit`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorybatterylimitaction-properties-mobilelimit.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBatteryLimitAction/properties/mobileLimit")

#### mobileLimit Type

`number`

## Definitions group SerializedUpdateCategoryBlockAllNotificationsAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction"}
```

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                          |
| :------------------------ | --------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/type")             |
| [categoryId](#categoryId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/categoryId") |
| [blocked](#blocked)       | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-blocked.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/blocked")       |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                       | Explanation |
| :------------------------------------------ | ----------- |
| `"UPDATE_CATEGORY_BLOCK_ALL_NOTIFICATIONS"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/categoryId")

#### categoryId Type

`string`

### blocked




`blocked`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockallnotificationsaction-properties-blocked.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockAllNotificationsAction/properties/blocked")

#### blocked Type

`boolean`

## Definitions group SerializedUpdateCategoryBlockedTimesAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                        |
| :------------------------ | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/type")             |
| [categoryId](#categoryId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/categoryId") |
| [times](#times)           | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-times.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/times")           |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                             | Explanation |
| :-------------------------------- | ----------- |
| `"UPDATE_CATEGORY_BLOCKED_TIMES"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/categoryId")

#### categoryId Type

`string`

### times




`times`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategoryblockedtimesaction-properties-times.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryBlockedTimesAction/properties/times")

#### times Type

`string`

## Definitions group SerializedUpdateCategorySortingAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction"}
```

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                |
| :-------------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)               | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorysortingaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction/properties/type")               |
| [categoryIds](#categoryIds) | `array`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorysortingaction-properties-categoryids.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction/properties/categoryIds") |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorysortingaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                       | Explanation |
| :-------------------------- | ----------- |
| `"UPDATE_CATEGORY_SORTING"` |             |

### categoryIds




`categoryIds`

-   is required
-   Type: `string[]`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorysortingaction-properties-categoryids.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategorySortingAction/properties/categoryIds")

#### categoryIds Type

`string[]`

## Definitions group SerializedUpdateCategoryTemporarilyBlockedAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction"}
```

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                    |
| :------------------------ | --------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/type")             |
| [categoryId](#categoryId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/categoryId") |
| [blocked](#blocked)       | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-blocked.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/blocked")       |
| [endTime](#endTime)       | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-endtime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/endTime")       |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                   | Explanation |
| :-------------------------------------- | ----------- |
| `"UPDATE_CATEGORY_TEMPORARILY_BLOCKED"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/categoryId")

#### categoryId Type

`string`

### blocked




`blocked`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-blocked.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/blocked")

#### blocked Type

`boolean`

### endTime




`endTime`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytemporarilyblockedaction-properties-endtime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTemporarilyBlockedAction/properties/endTime")

#### endTime Type

`number`

## Definitions group SerializedUpdateCategoryTimeWarningsAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction"}
```

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                        |
| :------------------------ | --------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/type")             |
| [categoryId](#categoryId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/categoryId") |
| [enable](#enable)         | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-enable.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/enable")         |
| [flags](#flags)           | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-flags.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/flags")           |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                             | Explanation |
| :-------------------------------- | ----------- |
| `"UPDATE_CATEGORY_TIME_WARNINGS"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/categoryId")

#### categoryId Type

`string`

### enable




`enable`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-enable.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/enable")

#### enable Type

`boolean`

### flags




`flags`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytimewarningsaction-properties-flags.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTimeWarningsAction/properties/flags")

#### flags Type

`number`

## Definitions group SerializedUpdateCategoryTitleAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                          |
| :------------------------ | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)             | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/type")             |
| [categoryId](#categoryId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/categoryId") |
| [newTitle](#newTitle)     | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-newtitle.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/newTitle")     |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | ----------- |
| `"UPDATE_CATEGORY_TITLE"` |             |

### categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/categoryId")

#### categoryId Type

`string`

### newTitle




`newTitle`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatecategorytitleaction-properties-newtitle.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateCategoryTitleAction/properties/newTitle")

#### newTitle Type

`string`

## Definitions group SerializedUpdateDeviceNameAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                |
| :-------------------- | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/type")         |
| [deviceId](#deviceId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/deviceId") |
| [name](#name)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-name.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/name")         |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                  | Explanation |
| :--------------------- | ----------- |
| `"UPDATE_DEVICE_NAME"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/deviceId")

#### deviceId Type

`string`

### name




`name`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatedevicenameaction-properties-name.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateDeviceNameAction/properties/name")

#### name Type

`string`

## Definitions group SerializedUpdateEnableActivityLevelBlockingAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction"}
```

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                  |
| :-------------------- | --------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/type")         |
| [deviceId](#deviceId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/deviceId") |
| [enable](#enable)     | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-enable.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/enable")     |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                     | Explanation |
| :---------------------------------------- | ----------- |
| `"UPDATE_ENABLE_ACTIVITY_LEVEL_BLOCKING"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/deviceId")

#### deviceId Type

`string`

### enable




`enable`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateenableactivitylevelblockingaction-properties-enable.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateEnableActivityLevelBlockingAction/properties/enable")

#### enable Type

`boolean`

## Definitions group SerialiizedUpdateNetworkTimeVerificationAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                            |
| :-------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/type")         |
| [deviceId](#deviceId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/deviceId") |
| [mode](#mode)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-mode.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/mode")         |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | ----------- |
| `"UPDATE_NETWORK_TIME_VERIFICATION"` |             |

### deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-deviceid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/deviceId")

#### deviceId Type

`string`

### mode




`mode`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serialiizedupdatenetworktimeverificationaction-properties-mode.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerialiizedUpdateNetworkTimeVerificationAction/properties/mode")

#### mode Type

`string`

#### mode Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | ----------- |
| `"disabled"`    |             |
| `"enabled"`     |             |
| `"if possible"` |             |

## Definitions group SerializedUpdateParentBlockedTimesAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                |
| :-------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)         | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/type")         |
| [parentId](#parentId) | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/parentId") |
| [times](#times)       | `string` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-times.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/times")       |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                           | Explanation |
| :------------------------------ | ----------- |
| `"UPDATE_PARENT_BLOCKED_TIMES"` |             |

### parentId




`parentId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/parentId")

#### parentId Type

`string`

### times




`times`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentblockedtimesaction-properties-times.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentBlockedTimesAction/properties/times")

#### times Type

`string`

## Definitions group SerializedUpdateParentNotificationFlagsAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction"}
```

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                          |
| :-------------------- | --------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/type")         |
| [parentId](#parentId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/parentId") |
| [flags](#flags)       | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-flags.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/flags")       |
| [set](#set)           | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-set.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/set")           |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                                | Explanation |
| :----------------------------------- | ----------- |
| `"UPDATE_PARENT_NOTIFICATION_FLAGS"` |             |

### parentId




`parentId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-parentid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/parentId")

#### parentId Type

`string`

### flags




`flags`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-flags.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/flags")

#### flags Type

`number`

### set




`set`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdateparentnotificationflagsaction-properties-set.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateParentNotificationFlagsAction/properties/set")

#### set Type

`boolean`

## Definitions group SerializedUpdateTimelimitRuleAction

Reference this group by using

```json
{"$ref":"https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction"}
```

| Property                | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                        |
| :---------------------- | --------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)           | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/type")           |
| [ruleId](#ruleId)       | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/ruleId")       |
| [time](#time)           | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/time")           |
| [days](#days)           | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-days.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/days")           |
| [extraTime](#extraTime) | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-extratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/extraTime") |
| [start](#start)         | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-start.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/start")         |
| [end](#end)             | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-end.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/end")             |
| [dur](#dur)             | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-dur.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/dur")             |
| [pause](#pause)         | `number`  | Optional | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-pause.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/pause")         |

### type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/type")

#### type Type

`string`

#### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | ----------- |
| `"UPDATE_TIMELIMIT_RULE"` |             |

### ruleId




`ruleId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/ruleId")

#### ruleId Type

`string`

### time




`time`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/time")

#### time Type

`number`

### days




`days`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-days.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/days")

#### days Type

`number`

### extraTime




`extraTime`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-extratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/extraTime")

#### extraTime Type

`boolean`

### start




`start`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-start.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/start")

#### start Type

`number`

### end




`end`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-end.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/end")

#### end Type

`number`

### dur




`dur`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-dur.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/dur")

#### dur Type

`number`

### pause




`pause`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-pause.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/pause")

#### pause Type

`number`
