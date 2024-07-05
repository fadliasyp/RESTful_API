# Contact Api Spec

## Create Contact Api

Endpoint : POST /api/contacts

Header :

- Authorization : token

Request body :

```json
{
  "first_name": "Eko",
  "last_name": "khannedy",
  "email": "eko@pzn.com",
  "phone": "08123456789"
}
```

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "first_name": "Eko",
    "last_name": "khannedy",
    "email": "eko@pzn.com",
    "phone": "08123456789"
  }
}
```

Response Body Error :

```json
 "error": "Email is not valid format"
```

## Update Contact Api

Endpoint : PUT /api/contacts/:id

Header :

- Authorization : token

Request body :

```json
{
  "first_name": "Eko",
  "last_name": "khannedy",
  "email": "eko@pzn.com",
  "phone": "08123456789"
}
```

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "first_name": "Eko",
    "last_name": "khannedy",
    "email": "eko@pzn.com",
    "phone": "08123456789"
  }
}
```

Response Body Error :

```json
 "error": "Email is not valid format"
```

## Get Contact Api

Endpoint : GET /api/contacts/:id

Header :

- Authorization : token

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "first_name": "Eko",
    "last_name": "khannedy",
    "email": "eko@pzn.com",
    "phone": "08123456789"
  }
}
```

Response Body Error :

```json
 "error": "contact is not found"
```

## Search Contact Api

Endpoint : GET /api/contacts

Header :

- Authorization : token

Query params:

- name : Search by first_name or last_name, using like, optional
- email: Search by email, using like, optional
- phone: Search by phone, using like, optional
- page: number of page, default 1
- size: size per page, default 10

Response Body Sucess :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Eko",
      "last_name": "khannedy",
      "email": "eko@pzn.com",
      "phone": "08123456789"
    },
    {
      "id": 1,
      "first_name": "Eko",
      "last_name": "khannedy",
      "email": "eko@pzn.com",
      "phone": "08123456789"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Contact Api

Endpoint : DELETE /api/contacts/:id

Header :

- Authorization : token

Response Body Sucess :

```json
{
  "data": "Ok"
}
```

Response Body Error :

```json
{
  "error": "contact is not found"
}
```
