/**
 * Citizen Routes
 * ==============
 * Defines all citizen-specific endpoints
 * All routes require authentication
 */

const express = require('express');
const router = express.Router();
const {
  getMyAppointments,
  createAppointment,
  cancelAppointment,
  getMyRequests,
  getMyComplaints,
  submitComplaint,
  createRequest,
} = require('../controllers/citizenController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Appointment Routes
 */
router.get('/appointments/my-appointments', protect, getMyAppointments);
router.post('/appointments/create', protect, createAppointment);
router.patch('/appointments/:appointmentId/cancel', protect, cancelAppointment);

/**
 * Request Routes
 */
router.get('/requests/my-requests', protect, getMyRequests);
router.post('/requests/create', protect, createRequest);

/**
 * Complaint Routes
 */
router.get('/complaints/my-complaints', protect, getMyComplaints);
router.post('/complaints/submit', protect, submitComplaint);

module.exports = router;
