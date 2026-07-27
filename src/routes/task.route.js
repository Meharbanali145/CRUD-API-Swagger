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
router.put('/tasks/:id', (req, res) => {
  const existing = taskRepository.getTaskById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Task not found' });

  const { title, done } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const updated = taskRepository.updateTask(req.params.id, title, done);
  res.json(updated);
});

router.delete('/tasks/:id', (req, res) => {
  const deleted = taskRepository.deleteTask(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

module.exports = router;
