# Simple CRUD API

Simple GRUD API using Node.js and TypeScript

## Notes

PORT can be set in .env file

use .env.example as a template

## Installation

```bash
npm install
```

## Build project

```bash
npm build
```

## Run project

```bash
# Run in development mode
npm start:dev

# Run in production mode
npm start:prod
```

## Test

```bash
npm test
```

## API Endpoints

### Get all users

```bash
GET /api/users
```

### Get user by id

```bash
GET /api/users/{userId}
```

### Create user

```bash
POST /api/users
```

### Update user

```bash
PUT /api/users/{userId}
```

### Delete user

```bash
DELETE /api/users/{userId}
```
