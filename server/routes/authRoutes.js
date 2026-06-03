/**
 * Authentication Routes
 * =====================
 * Defines all auth-related endpoints
 * Public routes: register, login
 * Protected route: getCurrentUser
 */

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Public Routes (No authentication required)
 */

// Register new user
// POST /api/auth/register
// Body: { name, NIC, email, phone, password }
router.post('/register', register);

// Login user
// POST /api/auth/login
// Body: { email, password }
router.post('/login', login);

/**
 * Protected Routes (Authentication required)
 */

// Get current logged-in user
// GET /api/auth/me
// Headers: Authorization: Bearer <token>
router.get('/me', protect, getCurrentUser);

module.exports = router;
