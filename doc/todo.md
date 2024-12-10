# Todo API Specs

## Create Todo

Endpoint : POST /api/todo

Request Header :
- Authorization : token

Request Body :
```json
{
  "title": "Learn Hono",
  "description": "Understand the basics of Hono framework and create a simple project",
  "status": "todo",
  "category": "learning"
}
```

Response Body :

- Success (HTTP 201 Created) :
```json
{
  "data" : {
    "id" : 1,
    "title": "Learn Hono",
    "description": "Understand the basics of Hono framework and create a simple project",
    "status": "todo",
    "category": "learning"
  }
}
```
- Failed (HTTP 400 Bad Request) :
```json
{
  "errors": "Invalid input data"
}
```

## Get Todo

Endpoint : GET /api/todo/{idTodo}

Request Header :
- Authorization : token

Response Body :

- Success (HTTP 200 OK) :
```json
{
  "data" : {
    "id" : 1,
    "title": "Learn Hono",
    "description": "Understand the basics of Hono framework and create a simple project",
    "status": "todo",
    "category": "learning"
  }
}
```

- Failed (HTTP 404 Not Found) : 
```json
{
  "errors": "Todo not found"
}
```

## Update Todo

Endpoint : PUT /api/todo/{idTodo}

Request Header :
- Authorization : token

Request Body :
```json
{
    "title": "Learn Hono",
    "description": "Understand the basics of Hono framework and create a simple project",
    "status": "todo",
    "category": "learning"
}
```

Response Body :

- Success (HTTP 200 OK) :
```json
{
  "data" : {
    "id" : 1,
    "title": "Learn Hono",
    "description": "Understand the basics of Hono framework and create a simple project",
    "status": "todo",
    "category": "learning"
  }
}
```
- Failed (HTTP 400 Bad Request) :
```json
{
  "errors": "Invalid input data"
}
```

## Remove Todo

Endpoint : POST /api/todo/{idTodo}

Request Header :
- Authorization : token

Response Body :

- Success (HTTP 200 OK) :
```json
{
  "data" : true
}
```

- Failed (HTTP 404 Not Found) :
```json
{
  "errors": "Todo not found"
}
```

- Failed (HTTP 401 Unauthorized) :
```json
{
  "errors": "Unauthorized access"
}
```

## Search Todo

Endpoint : POST /api/todo

Request Header :
- Authorization : token

Query Params :
- todo (string) : search to title or description
- status (string) : search to status
- category (string) : search to category

Response Body :

- Success (HTTP 200 OK) :
```json
{
  "data" : [
    {
      "id" : 1,
      "title": "Learn Hono",
      "description": "Understand the basics of Hono framework and create a simple project",
      "status": "todo",
      "category": "learning"
    },
    {
      "id" : 2,
      "title": "Learn Hono",
      "description": "Understand the basics of Hono framework and create a simple project",
      "status": "todo",
      "category": "learning"
    }
  ]
}
```
- Failed (HTTP 404 Not Found) :
```json
{
  "errors": "Todo not found"
}
```

