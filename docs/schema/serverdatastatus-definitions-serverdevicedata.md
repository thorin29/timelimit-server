# ServerDeviceData Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerDeviceData
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerDeviceData Type

`object` ([ServerDeviceData](serverdatastatus-definitions-serverdevicedata.md))

# ServerDeviceData Properties

| Property                                        | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                        |
| :---------------------------------------------- | --------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deviceId](#deviceId)                           | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-deviceid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/deviceId")                           |
| [name](#name)                                   | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-name.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/name")                                   |
| [model](#model)                                 | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-model.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/model")                                 |
| [addedAt](#addedAt)                             | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-addedat.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/addedAt")                             |
| [currentUserId](#currentUserId)                 | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-currentuserid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/currentUserId")                 |
| [networkTime](#networkTime)                     | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-networktime.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/networkTime")                     |
| [cProtectionLevel](#cProtectionLevel)           | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cProtectionLevel")            |
| [hProtectionLevel](#hProtectionLevel)           | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel-1.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hProtectionLevel")          |
| [cUsageStats](#cUsageStats)                     | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cUsageStats")         |
| [hUsageStats](#hUsageStats)                     | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-1.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hUsageStats")       |
| [cNotificationAccess](#cNotificationAccess)     | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-newpermissionstatus.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cNotificationAccess")     |
| [hNotificationAccess](#hNotificationAccess)     | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-newpermissionstatus-1.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hNotificationAccess")   |
| [cAppVersion](#cAppVersion)                     | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-cappversion.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cAppVersion")                     |
| [hAppVersion](#hAppVersion)                     | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-happversion.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hAppVersion")                     |
| [tDisablingAdmin](#tDisablingAdmin)             | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-tdisablingadmin.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/tDisablingAdmin")             |
| [reboot](#reboot)                               | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-reboot.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/reboot")                               |
| [hadManipulation](#hadManipulation)             | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-hadmanipulation.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hadManipulation")             |
| [hadManipulationFlags](#hadManipulationFlags)   | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-hadmanipulationflags.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hadManipulationFlags")   |
| [reportUninstall](#reportUninstall)             | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-reportuninstall.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/reportUninstall")             |
| [isUserKeptSignedIn](#isUserKeptSignedIn)       | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-isuserkeptsignedin.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/isUserKeptSignedIn")       |
| [showDeviceConnected](#showDeviceConnected)     | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-showdeviceconnected.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/showDeviceConnected")     |
| [defUser](#defUser)                             | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-defuser.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/defUser")                             |
| [defUserTimeout](#defUserTimeout)               | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-defusertimeout.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/defUserTimeout")               |
| [rebootIsManipulation](#rebootIsManipulation)   | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-rebootismanipulation.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/rebootIsManipulation")   |
| [cOverlay](#cOverlay)                           | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-2.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cOverlay")          |
| [hOverlay](#hOverlay)                           | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-3.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hOverlay")          |
| [asEnabled](#asEnabled)                         | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-asenabled.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/asEnabled")                         |
| [wasAsEnabled](#wasAsEnabled)                   | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-wasasenabled.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/wasAsEnabled")                   |
| [activityLevelBlocking](#activityLevelBlocking) | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-activitylevelblocking.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/activityLevelBlocking") |
| [qOrLater](#qOrLater)                           | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-qorlater.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/qOrLater")                           |

## deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-deviceid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/deviceId")

### deviceId Type

`string`

## name




`name`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-name.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/name")

### name Type

`string`

## model




`model`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-model.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/model")

### model Type

`string`

## addedAt




`addedAt`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-addedat.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/addedAt")

### addedAt Type

`number`

## currentUserId




`currentUserId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-currentuserid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/currentUserId")

### currentUserId Type

`string`

## networkTime




`networkTime`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-networktime.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/networkTime")

### networkTime Type

`string`

### networkTime Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value           | Explanation |
| :-------------- | ----------- |
| `"disabled"`    |             |
| `"enabled"`     |             |
| `"if possible"` |             |

## cProtectionLevel




`cProtectionLevel`

-   is required
-   Type: `string` ([ProtectionLevel](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cProtectionLevel")

### cProtectionLevel Type

`string` ([ProtectionLevel](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel.md))

### cProtectionLevel Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | ----------- |
| `"device owner"`          |             |
| `"none"`                  |             |
| `"password device admin"` |             |
| `"simple device admin"`   |             |

## hProtectionLevel




`hProtectionLevel`

-   is required
-   Type: `string` ([ProtectionLevel](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel-1.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel-1.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hProtectionLevel")

### hProtectionLevel Type

`string` ([ProtectionLevel](serverdatastatus-definitions-serverdevicedata-properties-protectionlevel-1.md))

### hProtectionLevel Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | ----------- |
| `"device owner"`          |             |
| `"none"`                  |             |
| `"password device admin"` |             |
| `"simple device admin"`   |             |

## cUsageStats




`cUsageStats`

-   is required
-   Type: `string` ([RuntimePermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cUsageStats")

### cUsageStats Type

`string` ([RuntimePermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus.md))

### cUsageStats Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | ----------- |
| `"granted"`      |             |
| `"not granted"`  |             |
| `"not required"` |             |

## hUsageStats




`hUsageStats`

-   is required
-   Type: `string` ([RuntimePermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-1.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-1.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hUsageStats")

### hUsageStats Type

`string` ([RuntimePermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-1.md))

### hUsageStats Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | ----------- |
| `"granted"`      |             |
| `"not granted"`  |             |
| `"not required"` |             |

## cNotificationAccess




`cNotificationAccess`

-   is required
-   Type: `string` ([NewPermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-newpermissionstatus.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-newpermissionstatus.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cNotificationAccess")

### cNotificationAccess Type

`string` ([NewPermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-newpermissionstatus.md))

### cNotificationAccess Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | ----------- |
| `"granted"`       |             |
| `"not granted"`   |             |
| `"not supported"` |             |

## hNotificationAccess




`hNotificationAccess`

-   is required
-   Type: `string` ([NewPermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-newpermissionstatus-1.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-newpermissionstatus-1.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hNotificationAccess")

### hNotificationAccess Type

`string` ([NewPermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-newpermissionstatus-1.md))

### hNotificationAccess Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value             | Explanation |
| :---------------- | ----------- |
| `"granted"`       |             |
| `"not granted"`   |             |
| `"not supported"` |             |

## cAppVersion




`cAppVersion`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-cappversion.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cAppVersion")

### cAppVersion Type

`number`

## hAppVersion




`hAppVersion`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-happversion.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hAppVersion")

### hAppVersion Type

`number`

## tDisablingAdmin




`tDisablingAdmin`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-tdisablingadmin.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/tDisablingAdmin")

### tDisablingAdmin Type

`boolean`

## reboot




`reboot`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-reboot.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/reboot")

### reboot Type

`boolean`

## hadManipulation




`hadManipulation`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-hadmanipulation.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hadManipulation")

### hadManipulation Type

`boolean`

## hadManipulationFlags




`hadManipulationFlags`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-hadmanipulationflags.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hadManipulationFlags")

### hadManipulationFlags Type

`number`

## reportUninstall




`reportUninstall`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-reportuninstall.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/reportUninstall")

### reportUninstall Type

`boolean`

## isUserKeptSignedIn




`isUserKeptSignedIn`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-isuserkeptsignedin.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/isUserKeptSignedIn")

### isUserKeptSignedIn Type

`boolean`

## showDeviceConnected




`showDeviceConnected`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-showdeviceconnected.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/showDeviceConnected")

### showDeviceConnected Type

`boolean`

## defUser




`defUser`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-defuser.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/defUser")

### defUser Type

`string`

## defUserTimeout




`defUserTimeout`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-defusertimeout.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/defUserTimeout")

### defUserTimeout Type

`number`

## rebootIsManipulation




`rebootIsManipulation`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-rebootismanipulation.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/rebootIsManipulation")

### rebootIsManipulation Type

`boolean`

## cOverlay




`cOverlay`

-   is required
-   Type: `string` ([RuntimePermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-2.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-2.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/cOverlay")

### cOverlay Type

`string` ([RuntimePermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-2.md))

### cOverlay Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | ----------- |
| `"granted"`      |             |
| `"not granted"`  |             |
| `"not required"` |             |

## hOverlay




`hOverlay`

-   is required
-   Type: `string` ([RuntimePermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-3.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-3.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/hOverlay")

### hOverlay Type

`string` ([RuntimePermissionStatus](serverdatastatus-definitions-serverdevicedata-properties-runtimepermissionstatus-3.md))

### hOverlay Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | ----------- |
| `"granted"`      |             |
| `"not granted"`  |             |
| `"not required"` |             |

## asEnabled




`asEnabled`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-asenabled.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/asEnabled")

### asEnabled Type

`boolean`

## wasAsEnabled




`wasAsEnabled`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-wasasenabled.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/wasAsEnabled")

### wasAsEnabled Type

`boolean`

## activityLevelBlocking




`activityLevelBlocking`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-activitylevelblocking.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/activityLevelBlocking")

### activityLevelBlocking Type

`boolean`

## qOrLater




`qOrLater`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverdevicedata-properties-qorlater.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerDeviceData/properties/qOrLater")

### qOrLater Type

`boolean`
