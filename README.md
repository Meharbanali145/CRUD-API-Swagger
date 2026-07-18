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
<img width="1366" height="768" alt="Screenshot (1219)" src="https://github.com/user-attachments/assets/817f12f5-2c9d-4231-b874-bb26679b29bc" />
<img width="1366" height="768" alt="Screenshot (1220)" src="https://github.com/user-attachments/assets/f798df79-35e6-4b04-906e-4ccb08a48dfa" />
<img width="1366" height="768" alt="Screenshot (1221)" src="https://github.com/user-attachments/assets/e69f277d-c357-4605-b1a9-1b459ee1d391" />
<img width="1366" height="768" alt="Screenshot (1222)" src="https://github.com/user-attachments/assets/6f39f08c-5da0-4aee-9854-84fda7a0be1a" />
<img width="1366" height="768" alt="Screenshot (1223)" src="https://github.com/user-attachments/assets/f5a2052a-b5be-4f25-b3d2-145378cc3e10" />
<img width="1366" height="768" alt="Screenshot (1224)" src="https://github.com/user-attachments/assets/5ddedab6-4f95-4746-8873-ad5b1c479edf" />
<img width="1366" height="768" alt="Screenshot (1225)" src="https://github.com/user-attachments/assets/32677c54-de07-4533-b2bb-4a0ae4cfa301" />
<img width="1366" height="768" alt="Screenshot (1226)" src="https://github.com/user-attachments/assets/b5530340-583e-48f7-8b3b-d31ae2b67cad" />
<img width="1366" height="768" alt="Screenshot (1227)" src="https://github.com/user-attachments/assets/755fde20-6fdb-40de-aa30-777dfbb67cc1" />
<img width="1366" height="768" alt="Screenshot (1228)" src="https://github.com/user-attachments/assets/3e75e9a6-7fc7-45e4-a687-ce79892cfa27" />
<img width="1366" height="768" alt="Screenshot (1229)" src="https://github.com/user-attachments/assets/a2e06d3e-e747-499c-afe4-0fcb5346916d" />
<img width="1366" height="768" alt="Screenshot (1230)" src="https://github.com/user-attachments/assets/664674b6-c770-4503-a3ca-0f1766cdcbcc" />


---

## Tech Stack

- Node.js + Express
- swagger-jsdoc + swagger-ui-express for API documentation
