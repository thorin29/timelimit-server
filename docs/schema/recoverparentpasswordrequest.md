# RecoverParentPasswordRequest Schema

```txt
https://timelimit.io/RecoverParentPasswordRequest
```




| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                                  |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Can be instantiated | Yes        | Unknown status | No           | Forbidden         | Forbidden             | none                | [RecoverParentPasswordRequest.schema.json](RecoverParentPasswordRequest.schema.json "open original schema") |

## RecoverParentPasswordRequest Type

`object` ([RecoverParentPasswordRequest](recoverparentpasswordrequest.md))

# RecoverParentPasswordRequest Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                                  |
| :------------------------------ | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mailAuthToken](#mailauthtoken) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-properties-mailauthtoken.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/properties/mailAuthToken") |
| [password](#password)           | `object` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/properties/password")    |

## mailAuthToken




`mailAuthToken`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-properties-mailauthtoken.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/properties/mailAuthToken")

### mailAuthToken Type

`string`

## password




`password`

-   is required
-   Type: `object` ([ParentPassword](recoverparentpasswordrequest-definitions-parentpassword.md))
-   cannot be null
-   defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/properties/password")

### password Type

`object` ([ParentPassword](recoverparentpasswordrequest-definitions-parentpassword.md))

# RecoverParentPasswordRequest Definitions

## Definitions group ParentPassword

Reference this group by using

```json
{"$ref":"https://timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword"}
```

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                  |
| :------------------------ | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hash](#hash)             | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-hash.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/hash")             |
| [secondHash](#secondhash) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-secondhash.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/secondHash") |
| [secondSalt](#secondsalt) | `string` | Required | cannot be null | [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-secondsalt.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/secondSalt") |

### hash




`hash`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-hash.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/hash")

#### hash Type

`string`

### secondHash




`secondHash`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-secondhash.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/secondHash")

#### secondHash Type

`string`

### secondSalt




`secondSalt`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [RecoverParentPasswordRequest](recoverparentpasswordrequest-definitions-parentpassword-properties-secondsalt.md "https&#x3A;//timelimit.io/RecoverParentPasswordRequest#/definitions/ParentPassword/properties/secondSalt")

#### secondSalt Type

`string`
