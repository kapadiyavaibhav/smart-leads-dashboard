# Smart Leads CRM - API Documentation

Base URL:
http://localhost:5000/api

## Authentication

### Register User
POST /auth/register

Request Body:
```json
{
  "name":"John Doe",
  "email":"john@example.com",
  "password":"123456"
}
```

Response:
```json
{
  "message":"User registered successfully",
  "token":"jwt_token"
}
```

---

### Login User
POST /auth/login

Request Body:
```json
{
  "email":"john@example.com",
  "password":"123456"
}
```

Response:
```json
{
  "message":"Login successful",
  "token":"jwt_token"
}
```

---

## Leads

### Get Leads
GET /leads

Headers:
Authorization: Bearer token

---

### Create Lead
POST /leads

Request Body:
```json
{
  "name":"Client Name",
  "email":"client@example.com",
  "status":"new",
  "source":"website"
}
```

---

### Update Lead
PUT /leads/:id

Request Body:
```json
{
  "name":"Updated Name",
  "email":"updated@example.com",
  "status":"qualified",
  "source":"instagram"
}
```

---

### Delete Lead
DELETE /leads/:id

Headers:
Authorization: Bearer token

---

### Export CSV
GET /leads/export/csv

Headers:
Authorization: Bearer token