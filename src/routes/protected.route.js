const express = require('express');
const supabase = require('../config/supabaseClient');
const router = express.Router();

router.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  res.status(200).json({
    id: data.user.id,
    email: data.user.email,
    created_at: data.user.created_at
  });
});

module.exports = router;