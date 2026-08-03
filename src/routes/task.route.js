const express = require('express');
const taskRepository = require('../repositories/task.repository');

const router = express.Router();

router.get('/tasks', async (req, res) => {
  const tasks = await taskRepository.getAllTasks();
  res.json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
  const task = await taskRepository.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = await taskRepository.createTask(title);
  res.status(201).json(newTask);
});

router.put('/tasks/:id', async (req, res) => {
  const existing = await taskRepository.getTaskById(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Task not found' });

  const { title, done } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const updated = await taskRepository.updateTask(req.params.id, title, done);
  res.json(updated);
});

router.delete('/tasks/:id', async (req, res) => {
  const deleted = await taskRepository.deleteTask(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

module.exports = router;