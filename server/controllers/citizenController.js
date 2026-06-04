/**
 * Citizen Controller
 * ==================
 * Handles citizen-specific operations: appointments, requests, complaints
 */

const Appointment = require('../models/Appointment');
const Request = require('../models/Request');
const Complaint = require('../models/Complaint');

/**
 * Get User's Appointments
 * GET /api/appointments/my-appointments
 */
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error('Get Appointments Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch appointments',
    });
  }
};

/**
 * Create New Appointment
 * POST /api/appointments/create
 */
const createAppointment = async (req, res) => {
  try {
    const { service, date, location, notes } = req.body;

    if (!service || !date || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide service, date, and location',
      });
    }

    const appointment = await Appointment.create({
      userId: req.user.id,
      service,
      date,
      location,
      notes,
    });

    return res.status(201).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Create Appointment Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create appointment',
    });
  }
};

/**
 * Cancel Appointment
 * PATCH /api/appointments/:appointmentId/cancel
 */
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error('Cancel Appointment Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to cancel appointment',
    });
  }
};

/**
 * Get User's Requests
 * GET /api/requests/my-requests
 */
const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error('Get Requests Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch requests',
    });
  }
};

/**
 * Get User's Complaints
 * GET /api/complaints/my-complaints
 */
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    console.error('Get Complaints Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch complaints',
    });
  }
};

/**
 * Submit Complaint
 * POST /api/complaints/submit
 */
const submitComplaint = async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;

    if (!subject || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subject and description',
      });
    }

    const complaint = await Complaint.create({
      userId: req.user.id,
      subject,
      description,
      category: category || 'other',
      priority: priority || 'medium',
    });

    return res.status(201).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    console.error('Submit Complaint Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit complaint',
    });
  }
};

/**
 * Create Request
 * POST /api/requests/create
 */
const createRequest = async (req, res) => {
  try {
    const { type, details } = req.body;

    if (!type || !details) {
      return res.status(400).json({
        success: false,
        message: 'Please provide request type and details',
      });
    }

    const request = await Request.create({
      userId: req.user.id,
      type,
      details,
    });

    return res.status(201).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Create Request Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create request',
    });
  }
};

module.exports = {
  getMyAppointments,
  createAppointment,
  cancelAppointment,
  getMyRequests,
  getMyComplaints,
  submitComplaint,
  createRequest,
};
