# ClientDataStatus Schema

```txt
https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ClientPullChangesRequest.schema.json*](ClientPullChangesRequest.schema.json "open original schema") |

## ClientDataStatus Type

`object` ([ClientDataStatus](clientpullchangesrequest-definitions-clientdatastatus.md))

# ClientDataStatus Properties

| Property                    | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                       |
| :-------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [devices](#devices)         | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-devices.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/devices")         |
| [apps](#apps)               | `object` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-apps.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/apps")               |
| [categories](#categories)   | `object` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-categories.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/categories")   |
| [users](#users)             | `string` | Required | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-users.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/users")             |
| [clientLevel](#clientlevel) | `number` | Optional | cannot be null | [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-clientlevel.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/clientLevel") |

## devices



`devices`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-devices.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/devices")

### devices Type

`string`

## apps



`apps`

*   is required

*   Type: `object` ([Details](clientpullchangesrequest-definitions-clientdatastatus-properties-apps.md))

*   cannot be null

*   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-apps.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/apps")

### apps Type

`object` ([Details](clientpullchangesrequest-definitions-clientdatastatus-properties-apps.md))

## categories



`categories`

*   is required

*   Type: `object` ([Details](clientpullchangesrequest-definitions-clientdatastatus-properties-categories.md))

*   cannot be null

*   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-categories.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/categories")

### categories Type

`object` ([Details](clientpullchangesrequest-definitions-clientdatastatus-properties-categories.md))

## users



`users`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-users.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/users")

### users Type

`string`

## clientLevel



`clientLevel`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [ClientPullChangesRequest](clientpullchangesrequest-definitions-clientdatastatus-properties-clientlevel.md "https://timelimit.io/ClientPullChangesRequest#/definitions/ClientDataStatus/properties/clientLevel")

### clientLevel Type

`number`
