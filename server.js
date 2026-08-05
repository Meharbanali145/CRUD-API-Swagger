require('dotenv').config();
const { initDb } = require('./src/db/db');
const app = require('./src/app');
const supabase = require('./supabaseClient');

async function start() {
  await initDb();
  app.listen(3000, () => {
    console.log("Server is listening on port 3000 and connected to Supabase");
  });
}

start();