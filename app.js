const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Task API with Swagger",
      version: "1.0.0",
      description: "Simple CRUD API built with Express and documented using Swagger.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      {
        name: "General",
        description: "General API endpoints",
      },
      {
        name: "Tasks",
        description: "Task CRUD operations",
      },
    ],
  },
  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [
  {
    id: 1,
    title: "task1",
    done: false,
  },
  {
    id: 2,
    title: "task02",
    done: false,
  },
  {
    id: 3,
    title: "task03",
    done: false,
  },
];

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - General
 *     summary: Home endpoint
 *     description: Returns a welcome message.
 *     responses:
 *       200:
 *         description: Server is running.
 */
app.get("/", (req, res) => {
  res.status(200).send("Hello Server");
});

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - General
 *     summary: API Information
 *     description: Returns API metadata.
 *     responses:
 *       200:
 *         description: API details.
 */
app.get("/api", (req, res) => {
  res.status(200).json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - General
 *     summary: Health Check
 *     description: Check if the API is running.
 *     responses:
 *       200:
 *         description: API is healthy.
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date(),
  });
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get all tasks
 *     description: Returns a list of all tasks.
 *     responses:
 *       200:
 *         description: List of tasks.
 */
app.get("/tasks", (req, res) => {
  res.status(200).json({
    tasks,
  });
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get task by ID
 *     description: Returns a single task.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found.
 *       404:
 *         description: Task not found.
 */
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${req.params.id} not found`,
    });
  }

  res.status(200).json({ task });
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a new task
 *     description: Creates a new task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Swagger
 *               done:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Task created.
 *       400:
 *         description: Invalid request.
 */
app.post("/tasks", (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      msg: "Title is missing",
    });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: req.body.title,
    done: req.body.done || false,
  };

  tasks.push(newTask);

  res.status(201).json({
    msg: "Task Created",
    newTask,
  });
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Update a task
 *     description: Updates title and done status.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated.
 *       404:
 *         description: Task not found.
 */
app.put("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      msg: `Task id ${req.params.id} not found`,
    });
  }

  if (req.body.title === undefined) {
    return res.status(400).json({
      msg: "title is missing",
    });
  }

  if (req.body.done === undefined) {
    return res.status(400).json({
      msg: "done is missing",
    });
  }

  tasks[taskIndex].title = req.body.title;
  tasks[taskIndex].done = req.body.done;

  res.status(200).json({
    UpdateTask: tasks[taskIndex],
  });
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete a task
 *     description: Deletes a task by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted.
 *       404:
 *         description: Task not found.
 */
app.delete("/tasks/:id", (req, res) => {
  const deleteTask = tasks.findIndex(
    (d) => d.id === parseInt(req.params.id)
  );

  if (deleteTask === -1) {
    return res.status(404).json({
      msg: `Unknown id ${req.params.id}`,
    });
  }

  tasks.splice(deleteTask, 1);

  res.status(200).json({
    msg: `Task having id ${req.params.id} has deleted`,
    tasks,
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Swagger UI: http://localhost:3000/api-docs");
});