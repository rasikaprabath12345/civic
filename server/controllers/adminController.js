/**
 * Admin Controller
 * ================
 * Handles admin operations: fetching requests, users, and statistics
 */

const User = require('../models/User');
const Request = require('../models/Request');

/**
 * Get All Requests
 * GET /api/admin/requests
 * Returns all citizen requests
 */
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

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
 * Get All Users
 * GET /api/admin/users
 * Returns all registered users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Get Users Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users',
    });
  }
};

/**
 * Get Admin Statistics
 * GET /api/admin/stats
 * Returns count of requests by status and complaints
 */
const getStats = async (req, res) => {
  try {
    const total = await Request.countDocuments();
    const pending = await Request.countDocuments({ status: 'pending' });
    const processing = await Request.countDocuments({ status: 'processing' });
    const completed = await Request.countDocuments({ status: 'completed' });
    const complaints = await Request.countDocuments({ type: 'complaint' });

    return res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        processing,
        completed,
        complaints,
      },
    });
  } catch (error) {
    console.error('Get Stats Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch statistics',
    });
  }
};

/**
 * Update Request Status
 * PATCH /api/admin/requests/:requestId
 * Updates the status of a specific request
 */
const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!['pending', 'processing', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const request = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    ).populate('userId', 'name email');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Update Request Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update request',
    });
  }
};

module.exports = {
  getAllRequests,
  getAllUsers,
  getStats,
  updateRequestStatus,
};
