const express = require('express');
const taskRepository = require('../repositories/task.repository');   
const { route } = require('../app');

const router = express.Router();

router.get('/tasks', (req, res) => {
  const tasks = taskRepository.getAllTasks();
  res.json(tasks);
});
router.get('/tasks/:id', (req, res) => {
    const task = taskRepository.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
});

module.exports = router;
