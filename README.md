# Task API with Swagger

A simple CRUD (Create, Read, Update, Delete) REST API for managing tasks, built with **Express.js** and documented with **Swagger UI**. Tasks are stored in memory (no database yet) — data resets whenever the server restarts.

This project was built as the Week 02 first assignment for my internship at FlyRank AI.

---

## Install & Run

```bash
npm install && node app.js
```

Once running:
- API base URL: `http://localhost:3000`
- Interactive Swagger docs: `http://localhost:3000/api-docs`

---

## Endpoints

| Method | Endpoint       | Description                              | Success | Error |
|--------|----------------|-------------------------------------------|---------|-------|
| GET    | `/`            | Home / welcome message                    | 200     | —     |
| GET    | `/api`         | API metadata (name, version, endpoints)   | 200     | —     |
| GET    | `/health`      | Health check with timestamp               | 200     | —     |
| GET    | `/tasks`       | Get all tasks                             | 200     | —     |
| GET    | `/tasks/:id`   | Get a single task by ID                   | 200     | 404   |
| POST   | `/tasks`       | Create a new task (`title` required)      | 201     | 400   |
| PUT    | `/tasks/:id`   | Update a task's `title` and `done` status | 200     | 400 / 404 |
| DELETE | `/tasks/:id`   | Delete a task by ID                       | 200     | 404   |

---

## Example Request

```bash
curl -i http://localhost:3000/tasks
```

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 152
ETag: W/"98-abc123def456"
Date: Sat, 18 Jul 2026 21:50:12 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"tasks":[{"id":1,"title":"task1","done":false},{"id":2,"title":"task02","done":false},{"id":3,"title":"task03","done":false}]}
```

---

## Swagger UI

Interactive API documentation is available at `/api-docs`:
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/635a562c-4ef7-4413-b558-63f5d1f84a79" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/e62ac160-bc61-4dff-9b2e-4c92aa9aa401" />


---

## Tech Stack

- Node.js + Express
- swagger-jsdoc + swagger-ui-express for API documentation
