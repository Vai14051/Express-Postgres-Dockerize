# PostgreSQL REST API

A simple Node.js REST API built with Express and PostgreSQL. It demonstrates a clean layered architecture — routes → middleware → controller → model — with input validation, centralized error handling, and automatic table creation on startup.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v22+ |
| Framework | Express v5 |
| Database | PostgreSQL (via `pg` Pool) |
| Validation | Joi |
| Config | dotenv |
| Dev server | nodemon |

---

## Project Structure

```
postgres_dockerize/
├── index.js                  # App entry point — registers middleware, routes, error handler
├── config/
│   └── db.js                 # PostgreSQL connection pool
├── data/
│   ├── createUserTable.js    # Auto-creates the users table on startup
│   └── data.sql              # Raw SQL reference
├── routes/
│   └── routes.js             # Route definitions under /api
├── middlewares/
│   ├── inputValidator.js     # Joi validation middleware
│   └── errorHandler.js       # Centralized error handling middleware
├── controllers/
│   └── userController.js     # Request/response logic
├── models/
│   └── userModel.js          # Raw SQL queries (no ORM)
└── .env                      # Environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- Node.js v22+
- A running PostgreSQL instance

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000

DB_User=your_postgres_user
DB_Password=your_postgres_password
DB_Host=localhost
DB_PORT=5432
DB=your_database_name
```

### 3. Run the server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:3000`. The `users` table is created automatically if it does not exist.

---

## API Reference

Base URL: `/api`

### Create User

```
POST /api/createUser
```

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Validation rules**
- `name` — string, min 3 characters, required
- `email` — valid email format, required

**Responses**

| Status | Meaning |
|---|---|
| `201` | User created successfully |
| `400` | Validation error (invalid input) |
| `500` | Internal server error |

**Success response**

```json
{
  "status": 201,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-05-29T10:00:00.000Z"
  }
}
```

**Validation error response**

```json
{
  "status": 400,
  "message": "\"email\" must be a valid email"
}
```

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

The table is created automatically at startup via `data/createUserTable.js`.

---

## Request Lifecycle

```
Client Request
     │
     ▼
 index.js  (express.json, cors)
     │
     ▼
 routes.js  POST /api/createUser
     │
     ▼
 inputValidator.js  (Joi — validates name & email)
     │
     ▼
 userController.js  (createUser — calls model, sends response)
     │
     ▼
 userModel.js  (createUser1 — parameterized SQL query)
     │
     ▼
 PostgreSQL
     │
     ▼ (on unhandled error)
 errorHandler.js  (returns 500 JSON)
```

---

## Available Model Functions

These are defined in `models/userModel.js` and ready to be wired up to routes:

| Function | SQL Operation |
|---|---|
| `getAllUsers()` | `SELECT * FROM users` |
| `getUserByIdService(id)` | `SELECT * FROM users WHERE id = $1` |
| `createUser1(name, email)` | `INSERT INTO users ...` |
| `updateUser(id, name, email)` | `UPDATE users SET ... WHERE id = $1` |
| `deleteUser(id)` | `DELETE FROM users WHERE id = $1` |

All queries use parameterized statements to prevent SQL injection.
