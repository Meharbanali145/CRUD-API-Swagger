const express = require('express');
const taskRepository = require('../repositories/task.repository');   

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
router.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = taskRepository.createTask(title);
  res.status(201).json(newTask);
});

module.exports = router;
