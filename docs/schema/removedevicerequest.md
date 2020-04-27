# RemoveDeviceRequest Schema

```txt
https://timelimit.io/RemoveDeviceRequest
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------------------- |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [RemoveDeviceRequest.schema.json](RemoveDeviceRequest.schema.json "open original schema") |

## RemoveDeviceRequest Type

`object` ([RemoveDeviceRequest](removedevicerequest.md))

# RemoveDeviceRequest Definitions

# RemoveDeviceRequest Properties

| Property                                              | Type     | Required | Nullable       | Defined by                                                                                                                                                             |
| :---------------------------------------------------- | -------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deviceAuthToken](#deviceAuthToken)                   | `string` | Required | cannot be null | [RemoveDeviceRequest](removedevicerequest-properties-deviceauthtoken.md "https&#x3A;//timelimit.io/RemoveDeviceRequest#/properties/deviceAuthToken")                   |
| [parentUserId](#parentUserId)                         | `string` | Required | cannot be null | [RemoveDeviceRequest](removedevicerequest-properties-parentuserid.md "https&#x3A;//timelimit.io/RemoveDeviceRequest#/properties/parentUserId")                         |
| [parentPasswordSecondHash](#parentPasswordSecondHash) | `string` | Required | cannot be null | [RemoveDeviceRequest](removedevicerequest-properties-parentpasswordsecondhash.md "https&#x3A;//timelimit.io/RemoveDeviceRequest#/properties/parentPasswordSecondHash") |
| [deviceId](#deviceId)                                 | `string` | Required | cannot be null | [RemoveDeviceRequest](removedevicerequest-properties-deviceid.md "https&#x3A;//timelimit.io/RemoveDeviceRequest#/properties/deviceId")                                 |

## deviceAuthToken




`deviceAuthToken`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [RemoveDeviceRequest](removedevicerequest-properties-deviceauthtoken.md "https&#x3A;//timelimit.io/RemoveDeviceRequest#/properties/deviceAuthToken")

### deviceAuthToken Type

`string`

## parentUserId




`parentUserId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [RemoveDeviceRequest](removedevicerequest-properties-parentuserid.md "https&#x3A;//timelimit.io/RemoveDeviceRequest#/properties/parentUserId")

### parentUserId Type

`string`

## parentPasswordSecondHash




`parentPasswordSecondHash`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [RemoveDeviceRequest](removedevicerequest-properties-parentpasswordsecondhash.md "https&#x3A;//timelimit.io/RemoveDeviceRequest#/properties/parentPasswordSecondHash")

### parentPasswordSecondHash Type

`string`

## deviceId




`deviceId`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [RemoveDeviceRequest](removedevicerequest-properties-deviceid.md "https&#x3A;//timelimit.io/RemoveDeviceRequest#/properties/deviceId")

### deviceId Type

`string`
