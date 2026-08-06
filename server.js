require('dotenv').config();
const { initDb } = require('./src/db/db');
const app = require('./src/app');

async function start() {
  await initDb();
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening and connected to Supabase");
  });
}

start();