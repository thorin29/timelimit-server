# CreateRegisterDeviceTokenRequest Schema

```txt
https://timelimit.io/CreateRegisterDeviceTokenRequest
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                                          |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [CreateRegisterDeviceTokenRequest.schema.json](CreateRegisterDeviceTokenRequest.schema.json "open original schema") |

## CreateRegisterDeviceTokenRequest Type

`object` ([CreateRegisterDeviceTokenRequest](createregisterdevicetokenrequest.md))

# CreateRegisterDeviceTokenRequest Definitions

# CreateRegisterDeviceTokenRequest Properties

| Property                                              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                    |
| :---------------------------------------------------- | -------- | -------- | -------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [deviceAuthToken](#deviceAuthToken)                   | `string` | Required | cannot be null | [CreateRegisterDeviceTokenRequest](createregisterdevicetokenrequest-properties-deviceauthtoken.md "https&#x3A;//timelimit.io/CreateRegisterDeviceTokenRequest#/properties/deviceAuthToken")                   |
| [parentId](#parentId)                                 | `string` | Required | cannot be null | [CreateRegisterDeviceTokenRequest](createregisterdevicetokenrequest-properties-parentid.md "https&#x3A;//timelimit.io/CreateRegisterDeviceTokenRequest#/properties/parentId")                                 |
| [parentPasswordSecondHash](#parentPasswordSecondHash) | `string` | Required | cannot be null | [CreateRegisterDeviceTokenRequest](createregisterdevicetokenrequest-properties-parentpasswordsecondhash.md "https&#x3A;//timelimit.io/CreateRegisterDeviceTokenRequest#/properties/parentPasswordSecondHash") |

## deviceAuthToken




`deviceAuthToken`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [CreateRegisterDeviceTokenRequest](createregisterdevicetokenrequest-properties-deviceauthtoken.md "https&#x3A;//timelimit.io/CreateRegisterDeviceTokenRequest#/properties/deviceAuthToken")

### deviceAuthToken Type

`string`

## parentId




`parentId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [CreateRegisterDeviceTokenRequest](createregisterdevicetokenrequest-properties-parentid.md "https&#x3A;//timelimit.io/CreateRegisterDeviceTokenRequest#/properties/parentId")

### parentId Type

`string`

## parentPasswordSecondHash




`parentPasswordSecondHash`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [CreateRegisterDeviceTokenRequest](createregisterdevicetokenrequest-properties-parentpasswordsecondhash.md "https&#x3A;//timelimit.io/CreateRegisterDeviceTokenRequest#/properties/parentPasswordSecondHash")

### parentPasswordSecondHash Type

`string`
