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
  const stmt = db.prepare('SELECT * FROM tasks');
  return stmt.all();
}       

module.exports = {
  getAllTasks,
};