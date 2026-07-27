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

module.exports = {
  getAllTasks,
  getTaskById,
  createTask
};