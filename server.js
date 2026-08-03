const { initDb } = require('./src/db/db');
const app = require('./src/app');

async function start() {
  await initDb();
  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
}

start();