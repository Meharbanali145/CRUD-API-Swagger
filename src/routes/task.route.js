const express = require('express');
const taskRepository = require('../repositories/task.repository');   

const router = express.Router();

router.get('/tasks', (req, res) => {
  const tasks = taskRepository.getAllTasks();
  res.json(tasks);
});

module.exports = router;
