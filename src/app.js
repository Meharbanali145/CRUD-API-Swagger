const express = require('express');
const routes = require('./routes/task.route');
const authRoutes = require('./routes/auth.route');

const app = express();
app.use(express.json());
app.use('/api', routes);
app.use('/auth', authRoutes);

module.exports = app;