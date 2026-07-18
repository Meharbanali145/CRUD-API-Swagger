const express = require("express");
const app = express();

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

app.get("/", (req, res) => {
    res.status(200).send("Hello Server");
});

app.get("/api", (req, res) => {
  res.status(200).json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date(),
  });
});

app.get("/tasks", (req, res) => {
  return res.status(200).json({
    tasks,
  });
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      error: `Task ${req.params.id} not found`,
    });
  }

  return res.status(200).json({ task });
});

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

  return res.status(201).json({
    msg: "Task Created",
    newTask,
  });
});

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

  return res.status(200).json({
    UpdateTask: tasks[taskIndex],
  });
});

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

  return res.status(200).json({
    msg: `Task having id ${req.params.id} has deleted`,
    tasks,
  });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});