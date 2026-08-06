const express = require('express');
const routes = require('./routes/task.route');
const authRoutes = require('./routes/auth.route');
const publicRoutes = require('./routes/public.route');
const protectedRoutes = require('./routes/protected.route');

const app = express();
app.use(express.json());
app.use('/api', routes);
app.use('/auth', authRoutes);
app.use('/public', publicRoutes);
app.use('/protected', protectedRoutes);

module.exports = app;