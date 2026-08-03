# Task CRUD API — Containerized with Postgres

A task management REST API that has evolved through three storage backends:
in-memory (A1) → SQLite file (A2) → a real PostgreSQL database running in
Docker (A3, this version). The API itself hasn't changed — only what's
underneath it.

## What this is

An Express-based CRUD API for managing tasks, backed by PostgreSQL. Both the
app and the database run in Docker containers, started together with a
single command via Docker Compose.

## Run it — one command

```bash
git clone https://github.com/Meharbanali145/CRUD-API-Swagger.git
cd CRUD-API-Swagger
cp .env.example .env
docker compose up
```

That's it — no manual Postgres install, no manual `npm install` on your
host, no separate steps. The API will be available at
`http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env` before running. It contains one variable:

```
DATABASE_URL=postgres://postgres:dev@db:5432/tasks
```

This points at the `db` service defined in `compose.yaml` — you don't need
to change it unless you're running the database outside of Docker Compose.

## Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint          | Description                  |
|--------|-------------------|-------------------------------|
| GET    | `/api/tasks`      | List all tasks                |
| GET    | `/api/tasks/:id`  | Get a single task by id        |
| POST   | `/api/tasks`      | Create a new task              |
| PUT    | `/api/tasks/:id`  | Update a task's title/done     |
| DELETE | `/api/tasks/:id`  | Delete a task                   |

### Example request

```bash
curl -i http://localhost:3000/api/tasks
```

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[{"id":1,"title":"Buy milk","done":false},{"id":2,"title":"Walk the dog","done":false},{"id":3,"title":"Finish assignment","done":false}]
```

## Database

On first run, the app automatically creates the `tasks` table and seeds
three example tasks (only if the table is empty — restarting the app never
duplicates the seed data).

### Verifying the data

```bash
docker exec -it taskdb psql -U postgres -d tasks -c "\dt"
docker exec -it taskdb psql -U postgres -d tasks -c "SELECT * FROM tasks;"
```

![Database contents](./screenshots/db-postgres.png)

## Persistence

Task data survives a full stack restart, because it's stored in a Docker
named volume (`taskdata`) rather than inside the container itself:

```bash
docker compose down
docker compose up
```

Tasks created before `down` are still present after `up`.

## Tech stack

- Node.js + Express
- PostgreSQL 16 (Docker)
- Docker Compose
- `pg` (node-postgres) driver