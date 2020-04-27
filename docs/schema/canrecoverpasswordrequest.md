# CanRecoverPasswordRequest Schema

```txt
https://timelimit.io/CanRecoverPasswordRequest
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                            |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------- |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [CanRecoverPasswordRequest.schema.json](CanRecoverPasswordRequest.schema.json "open original schema") |

## CanRecoverPasswordRequest Type

`object` ([CanRecoverPasswordRequest](canrecoverpasswordrequest.md))

# CanRecoverPasswordRequest Definitions

# CanRecoverPasswordRequest Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                         |
| :------------------------------ | -------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mailAuthToken](#mailAuthToken) | `string` | Required | cannot be null | [CanRecoverPasswordRequest](canrecoverpasswordrequest-properties-mailauthtoken.md "https&#x3A;//timelimit.io/CanRecoverPasswordRequest#/properties/mailAuthToken") |
| [parentUserId](#parentUserId)   | `string` | Required | cannot be null | [CanRecoverPasswordRequest](canrecoverpasswordrequest-properties-parentuserid.md "https&#x3A;//timelimit.io/CanRecoverPasswordRequest#/properties/parentUserId")   |

## mailAuthToken




`mailAuthToken`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [CanRecoverPasswordRequest](canrecoverpasswordrequest-properties-mailauthtoken.md "https&#x3A;//timelimit.io/CanRecoverPasswordRequest#/properties/mailAuthToken")

### mailAuthToken Type

`string`

## parentUserId




`parentUserId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [CanRecoverPasswordRequest](canrecoverpasswordrequest-properties-parentuserid.md "https&#x3A;//timelimit.io/CanRecoverPasswordRequest#/properties/parentUserId")

### parentUserId Type

`string`
