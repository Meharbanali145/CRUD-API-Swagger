const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('tasks.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  )
`);

module.exports = db;