# Adress Api Spec

## Create Address Api

Endpoint : POST /api/contacts/:
contactId/addresses

Header :

- Authorization : token

Request body :

```json
{
  "street": "jalan apa",
  "city": "kota apa",
  "province": "provinsi apa",
  "contry": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "contry": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contry is required"
}
```

## Update Address Api

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Header :

- Authorization : token

Request body :

```json
{
  "street": "jalan apa",
  "city": "kota apa",
  "province": "provinsi apa",
  "contry": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "contry": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contry is required"
}
```

## Get Address Api

Endpoint : GET /api/contact/:contactId/addresses/:addressId

Header :

- Authorization : token

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "contry": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## List Address Api

Endpoint : GET /api/contact/:contactId/addresses

Header :

- Authorization : token

Response Body Sucess :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan apa",
      "city": "kota apa",
      "province": "provinsi apa",
      "contry": "Negara apa",
      "postal_code": "Kode pos"
    },
    {
      "id": 2,
      "street": "jalan apa",
      "city": "kota apa",
      "province": "provinsi apa",
      "contry": "Negara apa",
      "postal_code": "Kode pos"
    }
  ]
}
```

Respon Body Error :

```json
{
  "error": "contact is not found"
}
```

## Remove Address Api

Endpoint : DELETE /api/contact/:contactId/addresses/:addresessId

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": "oke"
}
```

Response Body Sucess :

```json
{
  "errors": "address is not found"
}
```
