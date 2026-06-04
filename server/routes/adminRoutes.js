/**
 * Admin Routes
 * ============
 * Defines all admin-related endpoints
 * All routes require authentication and admin role
 */

const express = require('express');
const router = express.Router();
const {
  getAllRequests,
  getAllUsers,
  getStats,
  updateRequestStatus,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * Protected Routes (Authentication + Admin role required)
 */

// Get all requests
// GET /api/admin/requests
router.get('/requests', protect, authorize('admin'), getAllRequests);

// Update request status
// PATCH /api/admin/requests/:requestId
router.patch('/requests/:requestId', protect, authorize('admin'), updateRequestStatus);

// Get all users
// GET /api/admin/users
router.get('/users', protect, authorize('admin'), getAllUsers);

// Get statistics
// GET /api/admin/stats
router.get('/stats', protect, authorize('admin'), getStats);

module.exports = router;
