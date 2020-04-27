# SerializedTimeLimitRule Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedTimeLimitRule Type

`object` ([SerializedTimeLimitRule](serializedparentaction-definitions-serializedtimelimitrule.md))

# SerializedTimeLimitRule Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                  |
| :------------------------ | --------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ruleId](#ruleId)         | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/ruleId")         |
| [categoryId](#categoryId) | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/categoryId") |
| [time](#time)             | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/time")             |
| [days](#days)             | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-days.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/days")             |
| [extraTime](#extraTime)   | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-extratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/extraTime")   |

## ruleId




`ruleId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/ruleId")

### ruleId Type

`string`

## categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/categoryId")

### categoryId Type

`string`

## time




`time`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/time")

### time Type

`number`

## days




`days`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-days.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/days")

### days Type

`number`

## extraTime




`extraTime`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedtimelimitrule-properties-extratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedTimeLimitRule/properties/extraTime")

### extraTime Type

`boolean`
