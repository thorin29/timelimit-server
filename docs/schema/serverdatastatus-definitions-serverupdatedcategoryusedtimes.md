# ServerUpdatedCategoryUsedTimes Schema

```txt
https://timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryUsedTimes
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                            |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ServerDataStatus.schema.json\*](ServerDataStatus.schema.json "open original schema") |

## ServerUpdatedCategoryUsedTimes Type

`object` ([ServerUpdatedCategoryUsedTimes](serverdatastatus-definitions-serverupdatedcategoryusedtimes.md))

# ServerUpdatedCategoryUsedTimes Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                              |
| :------------------------ | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [categoryId](#categoryId) | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryusedtimes-properties-categoryid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryUsedTimes/properties/categoryId") |
| [times](#times)           | `array`  | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryusedtimes-properties-times.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryUsedTimes/properties/times")           |
| [version](#version)       | `string` | Required | cannot be null | [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryusedtimes-properties-version.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryUsedTimes/properties/version")       |

## categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryusedtimes-properties-categoryid.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryUsedTimes/properties/categoryId")

### categoryId Type

`string`

## times




`times`

-   is required
-   Type: `object[]` ([ServerUsedTimeItem](serverdatastatus-definitions-serverusedtimeitem.md))
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryusedtimes-properties-times.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryUsedTimes/properties/times")

### times Type

`object[]` ([ServerUsedTimeItem](serverdatastatus-definitions-serverusedtimeitem.md))

## version




`version`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ServerDataStatus](serverdatastatus-definitions-serverupdatedcategoryusedtimes-properties-version.md "https&#x3A;//timelimit.io/ServerDataStatus#/definitions/ServerUpdatedCategoryUsedTimes/properties/version")

### version Type

`string`
