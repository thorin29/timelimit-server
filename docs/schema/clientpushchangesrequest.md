# ClientPushChangesRequest Schema

```txt
https://timelimit.io/ClientPushChangesRequest
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                          |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [ClientPushChangesRequest.schema.json](ClientPushChangesRequest.schema.json "open original schema") |

## ClientPushChangesRequest Type

`object` ([ClientPushChangesRequest](clientpushchangesrequest.md))

# ClientPushChangesRequest Properties

| Property                            | Type     | Required | Nullable       | Defined by                                                                                                                                                          |
| :---------------------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [deviceAuthToken](#deviceAuthToken) | `string` | Required | cannot be null | [ClientPushChangesRequest](clientpushchangesrequest-properties-deviceauthtoken.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/deviceAuthToken") |
| [actions](#actions)                 | `array`  | Required | cannot be null | [ClientPushChangesRequest](clientpushchangesrequest-properties-actions.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions")                 |

## deviceAuthToken




`deviceAuthToken`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [ClientPushChangesRequest](clientpushchangesrequest-properties-deviceauthtoken.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/deviceAuthToken")

### deviceAuthToken Type

`string`

## actions




`actions`

-   is required
-   Type: `object[]` ([Details](clientpushchangesrequest-properties-actions-items.md))
-   cannot be null
-   defined in: [ClientPushChangesRequest](clientpushchangesrequest-properties-actions.md "https&#x3A;//timelimit.io/ClientPushChangesRequest#/properties/actions")

### actions Type

`object[]` ([Details](clientpushchangesrequest-properties-actions-items.md))
