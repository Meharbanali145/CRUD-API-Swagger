const { pool } = require('../db/db');

async function getAllTasks() {
  const { rows } = await pool.query('SELECT * FROM tasks');
  return rows;
}

async function getTaskById(id) {
  const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return rows[0];
}

async function createTask(title, done = false) {
  const { rows } = await pool.query(
    'INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *',
    [title, done]
  );
  return rows[0];
}

async function updateTask(id, title, done) {
  const { rows } = await pool.query(
    'UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *',
    [title, done, id]
  );
  return rows[0];
}

async function deleteTask(id) {
  const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};