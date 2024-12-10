# User API Spec

## Register User

Endpoint : POST /api/users

Request Body : 
```json
{
  "username" : "fathur",
  "password" : "12345",
  "name" : "Fathurrahman"
}
```

Response Body :

- Success (HTTP 201 Created) :
```json
{
  "data": {
    "username": "fathur",
    "name" : "fathurrahman"
  }
}
```

- Failed (HTTP 400 Bad Request) :
```json
{
  "errors" : "Username must not blank"
}
```


## Login User

Endpoint : POST /api/users/login

Request Body :
```json
{
  "username" : "fathur",
  "password" : "12345"
}
```
Response Body :

- Success (HTTP 200 OK) :
```json
{
  "data": {
    "username": "fathur",
    "name" : "fathurrahman",
    "token" : "abcdefg"
  }
}
```

- Failed (HTTP 401 Unauthorized) :
```json
{
  "errors" : "Invalid username or password"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- Authorization : token

Response Body :

- Success (HTTP 200 OK) :
```json
{
  "data": {
    "username": "fathur",
    "name" : "fathurrahman"
  }
}
```

- Failed (HTTP 401 Unauthorized) :
```json
{
  "errors": "Unauthorized, token is invalid or expired"
}
```


## Update User

Endpoint : PATCH /api/users/current

Request Header :
- Authorization : token

Request Body (_Optional Fields_) :
```json
{
  "name": "New Name",
  "password": "New Password"
}
```

Response Body :

- Success (HTTP 200 OK) :
```json
{
  "data": {
    "username": "fathur",
    "name" : "fathurrahman"
  }
}
```

- Failed (HTTP 400 Bad Request) :
```json
{
  "errors": "Failed to update user, invalid input"
}
```


## Logout User

Endpoint : Delete /api/users/current

Request Header :
- Authorization : token

Response Body :

- Success (HTTP 200 OK) :
```json
{
  "data" : true
}
```

- Failed (HTTP 401 Unauthorized) : 
```json
{
  "errors": "Unauthorized, token is invalid"
}
```
