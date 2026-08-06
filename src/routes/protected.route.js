const express = require('express');
const requireAuth = require('../middlewares/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * /protected/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Missing or invalid token
 */
router.get('/profile', requireAuth, (req, res) => {
  const { id, email, created_at } = req.user;
  res.status(200).json({ id, email, created_at });
});

/**
 * @swagger
 * /protected/dashboard:
 *   get:
 *     summary: Get dashboard welcome message
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome message
 *       401:
 *         description: Missing or invalid token
 */
router.get('/dashboard', requireAuth, (req, res) => {
  res.status(200).json({ msg: `Welcome ${req.user.email}` });
});



module.exports = router;