const express = require('express');
const db = require('../db/db');
const app = express();
app.use(express.json());

const count = db.prepare('SELECT COUNT(*) AS count FROM tasks').get().count;
if (count === 0) {
  const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  insert.run('Buy milk', 0);
  insert.run('Walk the dog', 0);
  insert.run('Finish assignment', 0);
}

function getAllTasks() {
  const stmt =db.prepare('SELECT * FROM tasks');
  return stmt.all();
} 

function getTaskById(id){
    const stmt  =db.prepare('SELECT * FROM tasks WHERE id = ?');
    return stmt.get(id);   
}

function createTask(title) {
  const info = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)').run(title, 0);
  return { id: info.lastInsertRowid, title, done: 0 };
}

function updateTask(id, title, done) {
  db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?')
    .run(title, done ? 1 : 0, id);
  return getTaskById(id);
}

function deleteTask(id) {
  const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return info.changes > 0; // true if a row was actually deleted
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};