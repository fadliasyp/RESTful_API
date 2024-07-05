# User Api spec

# Register Use Api

Endpoint: POST /api/users

Request Body :

```json
{
  "username": "pzn",
  "password": "rahasia",
  "name": "programer zaman now"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "pzn",
    "name": "Programser Zaman now"
  }
}
```

Respon Body Eror :

```json
{
  "error": "username already register"
}
```

# Login User Api

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "pzn",
  "password": "rahasia"
}
```

Request Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Request Body Eror :

```json
{
  "error": "username or password wrong"
}
```

## Update user Api

Endpoint : PATCH /api/users/current

```json
{
  "name": "programer zaman now lagi", //optional
  "password": "new password" //optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "pzn",
    "name": "Programser Zaman now lagi"
  }
}
```

Respon Body Eror :

```json
{
  "error": "Name length max 100"
}
```

## Get user Api

Endpoint : Get /api/users/current

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "pzn",
    "name": "Programser Zaman now lagi"
  }
}
```

Respon Body Eror :

```json
{
  "error": "Unauthorized"
}
```

## Logout User Api

Endpoint : DELETE /api/users/logout

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": "Ok"
}
```

Respon Body Eror :

```json
{
  "error": "Unauthorized"
}
```
