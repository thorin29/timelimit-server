# ClientPullChangesRequest Schema

```txt
https://timelimit.io/ClientPullChangesRequest
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                          |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [ClientPullChangesRequest.schema.json](ClientPullChangesRequest.schema.json "open original schema") |

## ClientPullChangesRequest Type

`object` ([ClientPullChangesRequest](clientpullchangesrequest.md))

# ClientPullChangesRequest Definitions

## Definitions group ClientDataStatus

Reference this group by using

```json
{"$ref":"https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus"}
```

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                            |
| :-------------------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [devices](#devices)         | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-devices.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/devices")         |
| [apps](#apps)               | `object` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-apps.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/apps")               |
| [categories](#categories)   | `object` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-categories.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/categories")   |
| [users](#users)             | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-users.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/users")             |
| [clientLevel](#clientLevel) | `number` | Optional | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-clientlevel.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/clientLevel") |

### devices




`devices`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-devices.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/devices")

#### devices Type

`string`

### apps




`apps`

-   is required
-   Type: `object` ([Details](clientpullchangesrequest-definitions-clientdatastatus-properties-apps.md))
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-apps.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/apps")

#### apps Type

`object` ([Details](clientpullchangesrequest-definitions-clientdatastatus-properties-apps.md))

### categories




`categories`

-   is required
-   Type: `object` ([Details](clientpullchangesrequest-definitions-clientdatastatus-properties-categories.md))
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-categories.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/categories")

#### categories Type

`object` ([Details](clientpullchangesrequest-definitions-clientdatastatus-properties-categories.md))

### users




`users`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-users.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/users")

#### users Type

`string`

### clientLevel




`clientLevel`

-   is optional
-   Type: `number`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-clientlevel.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/clientLevel")

#### clientLevel Type

`number`

## Definitions group CategoryDataStatus

Reference this group by using

```json
{"$ref":"https://timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus"}
```

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                          |
| :-------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [base](#base)         | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-base.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/base")         |
| [apps](#apps)         | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-apps.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/apps")         |
| [rules](#rules)       | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-rules.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/rules")       |
| [usedTime](#usedTime) | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-usedtime.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/usedTime") |
| [tasks](#tasks)       | `string` | Optional | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-tasks.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/tasks")       |

### base




`base`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-base.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/base")

#### base Type

`string`

### apps




`apps`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-apps.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/apps")

#### apps Type

`string`

### rules




`rules`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-rules.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/rules")

#### rules Type

`string`

### usedTime




`usedTime`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-usedtime.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/usedTime")

#### usedTime Type

`string`

### tasks




`tasks`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-categorydatastatus-properties-tasks.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/definitions/CategoryDataStatus/properties/tasks")

#### tasks Type

`string`

# ClientPullChangesRequest Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                                                          |
| :---------------------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [deviceAuthToken](#deviceAuthToken) | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-properties-deviceauthtoken.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/properties/deviceAuthToken") |
| [status](#status)                   | `object` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/properties/status")        |

## deviceAuthToken




`deviceAuthToken`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-properties-deviceauthtoken.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/properties/deviceAuthToken")

### deviceAuthToken Type

`string`

## status




`status`

-   is required
-   Type: `object` ([ClientDataStatus](clientpullchangesrequest-definitions-clientdatastatus.md))
-   cannot be null
-   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus.md "https&#x3A;//timelimit.io/ClientPullChangesRequest#/properties/status")

### status Type

`object` ([ClientDataStatus](clientpullchangesrequest-definitions-clientdatastatus.md))
