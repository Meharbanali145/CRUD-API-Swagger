const app = require('./src/app');
require('./src/db/db'); // just to ensure db/table init runs

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});