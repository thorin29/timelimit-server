# SerializedUpdateChildTaskAction Schema

```txt
https://timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [SerializedParentAction.schema.json\*](SerializedParentAction.schema.json "open original schema") |

## SerializedUpdateChildTaskAction Type

`object` ([SerializedUpdateChildTaskAction](serializedparentaction-definitions-serializedupdatechildtaskaction.md))

# SerializedUpdateChildTaskAction Properties

| Property                                | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                |
| :-------------------------------------- | --------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [type](#type)                           | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/type")                           |
| [isNew](#isNew)                         | `boolean` | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-isnew.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/isNew")                         |
| [taskId](#taskId)                       | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-taskid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/taskId")                       |
| [categoryId](#categoryId)               | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/categoryId")               |
| [taskTitle](#taskTitle)                 | `string`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-tasktitle.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/taskTitle")                 |
| [extraTimeDuration](#extraTimeDuration) | `number`  | Required | cannot be null | [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-extratimeduration.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/extraTimeDuration") |

## type




`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-type.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value                 | Explanation |
| :-------------------- | ----------- |
| `"UPDATE_CHILD_TASK"` |             |

## isNew




`isNew`

-   is required
-   Type: `boolean`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-isnew.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/isNew")

### isNew Type

`boolean`

## taskId




`taskId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-taskid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/taskId")

### taskId Type

`string`

## categoryId




`categoryId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-categoryid.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/categoryId")

### categoryId Type

`string`

## taskTitle




`taskTitle`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-tasktitle.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/taskTitle")

### taskTitle Type

`string`

## extraTimeDuration




`extraTimeDuration`

-   is required
-   Type: `number`
-   cannot be null
-   defined in: [SerializedParentAction](serializedparentaction-definitions-serializedupdatechildtaskaction-properties-extratimeduration.md "https&#x3A;//timelimit.io/SerializedParentAction#/definitions/SerializedUpdateChildTaskAction/properties/extraTimeDuration")

### extraTimeDuration Type

`number`
