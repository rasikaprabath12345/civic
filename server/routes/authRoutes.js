/**
 * Authentication Routes
 * =====================
 * Defines all auth-related endpoints
 * Public routes: register, login
 * Protected route: getCurrentUser, updateProfile, changePassword
 */

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
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

// Update user profile
// PATCH /api/auth/profile/:userId
// Headers: Authorization: Bearer <token>
// Body: { name, phone, address, profileImage }
router.patch('/profile/:userId', protect, updateProfile);

// Change password
// PATCH /api/auth/change-password/:userId
// Headers: Authorization: Bearer <token>
// Body: { currentPassword, newPassword }
router.patch('/change-password/:userId', protect, changePassword);

module.exports = router;
