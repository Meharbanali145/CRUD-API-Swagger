const express = require('express');
const requireAuth = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/profile', requireAuth, (req, res) => {
  const { id, email, created_at } = req.user;
  res.status(200).json({ id, email, created_at });
});

router.get('/dashboard', requireAuth, (req, res) => {
  res.status(200).json({ msg: `Welcome ${req.user.email}` });
});

module.exports = router;