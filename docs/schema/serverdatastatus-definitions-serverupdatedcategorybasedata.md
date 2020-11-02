# ServerUpdatedCategoryBaseData Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerUpdatedCategoryBaseData Type

`object` ([ServerUpdatedCategoryBaseData](serverdatastatus-definitions-serverupdatedcategorybasedata.md))

# ServerUpdatedCategoryBaseData Properties

| Property                                        | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                  |
| :---------------------------------------------- | --------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [categoryId](#categoryId)                       | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-categoryid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/categoryId")                       |
| [childId](#childId)                             | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-childid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/childId")                             |
| [title](#title)                                 | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-title.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/title")                                 |
| [blockedTimes](#blockedTimes)                   | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-blockedtimes.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/blockedTimes")                   |
| [extraTime](#extraTime)                         | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-extratime.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/extraTime")                         |
| [extraTimeDay](#extraTimeDay)                   | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-extratimeday.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/extraTimeDay")                   |
| [tempBlocked](#tempBlocked)                     | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-tempblocked.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/tempBlocked")                     |
| [tempBlockTime](#tempBlockTime)                 | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-tempblocktime.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/tempBlockTime")                 |
| [version](#version)                             | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-version.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/version")                             |
| [parentCategoryId](#parentCategoryId)           | `string`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-parentcategoryid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/parentCategoryId")           |
| [blockAllNotifications](#blockAllNotifications) | `boolean` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-blockallnotifications.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/blockAllNotifications") |
| [timeWarnings](#timeWarnings)                   | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-timewarnings.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/timeWarnings")                   |
| [mblCharging](#mblCharging)                     | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-mblcharging.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/mblCharging")                     |
| [mblMobile](#mblMobile)                         | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-mblmobile.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/mblMobile")                         |
| [sort](#sort)                                   | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-sort.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/sort")                                   |
| [networks](#networks)                           | `array`   | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-networks.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/networks")                           |
| [dlu](#dlu)                                     | `number`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-dlu.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/dlu")                                     |

## categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-categoryid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/categoryId")

### categoryId Type

`string`

## childId




`childId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-childid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/childId")

### childId Type

`string`

## title




`title`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-title.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/title")

### title Type

`string`

## blockedTimes




`blockedTimes`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-blockedtimes.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/blockedTimes")

### blockedTimes Type

`string`

## extraTime




`extraTime`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-extratime.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/extraTime")

### extraTime Type

`number`

## extraTimeDay




`extraTimeDay`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-extratimeday.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/extraTimeDay")

### extraTimeDay Type

`number`

## tempBlocked




`tempBlocked`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-tempblocked.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/tempBlocked")

### tempBlocked Type

`boolean`

## tempBlockTime




`tempBlockTime`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-tempblocktime.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/tempBlockTime")

### tempBlockTime Type

`number`

## version




`version`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-version.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/version")

### version Type

`string`

## parentCategoryId




`parentCategoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-parentcategoryid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/parentCategoryId")

### parentCategoryId Type

`string`

## blockAllNotifications




`blockAllNotifications`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-blockallnotifications.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/blockAllNotifications")

### blockAllNotifications Type

`boolean`

## timeWarnings




`timeWarnings`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-timewarnings.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/timeWarnings")

### timeWarnings Type

`number`

## mblCharging




`mblCharging`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-mblcharging.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/mblCharging")

### mblCharging Type

`number`

## mblMobile




`mblMobile`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-mblmobile.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/mblMobile")

### mblMobile Type

`number`

## sort




`sort`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-sort.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/sort")

### sort Type

`number`

## networks




`networks`

-   is required
-   Type: `object[]` ([ServerCategoryNetworkId](serverdatastatus-definitions-servercategorynetworkid.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-networks.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/networks")

### networks Type

`object[]` ([ServerCategoryNetworkId](serverdatastatus-definitions-servercategorynetworkid.md))

## dlu




`dlu`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategorybasedata-properties-dlu.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryBaseData/properties/dlu")

### dlu Type

`number`
