# SerializedUpdateTimelimitRuleAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateTimelimitRuleAction Type

`object` ([SerializedUpdateTimelimitRuleAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction.md))

# SerializedUpdateTimelimitRuleAction Properties

| Property                | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                        |
| :---------------------- | --------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [type](#type)           | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/type")           |
| [ruleId](#ruleId)       | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/ruleId")       |
| [time](#time)           | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/time")           |
| [days](#days)           | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-days.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/days")           |
| [extraTime](#extraTime) | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-extratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/extraTime") |

## type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                     | Explanation |
| :------------------------ | ----------- |
| `"UPDATE_TIMELIMIT_RULE"` |             |

## ruleId




`ruleId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-ruleid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/ruleId")

### ruleId Type

`string`

## time




`time`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-time.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/time")

### time Type

`number`

## days




`days`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-days.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/days")

### days Type

`number`

## extraTime




`extraTime`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatetimelimitruleaction-properties-extratime.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateTimelimitRuleAction/properties/extraTime")

### extraTime Type

`boolean`
