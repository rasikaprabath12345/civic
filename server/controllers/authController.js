/**
 * Authentication Controller
 * =========================
 * Handles user registration, login, and current user retrieval
 * Manages JWT token generation and password validation
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * @param {String} id - User ID
 * @param {String} role - User role (citizen/admin)
 * @returns {String} - JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Token valid for 7 days
  });
};

/**
 * Register User (Create Account)
 * POST /api/auth/register
 *
 * Body parameters:
 * - name: Full name
 * - NIC: National ID Card
 * - email: Email address
 * - phone: Phone number
 * - password: Password (min 6 chars)
 *
 * Returns: User object + JWT token
 */
const register = async (req, res) => {
  try {
    const { name, NIC, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !NIC || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if user already exists (by email or NIC)
    const existingUser = await User.findOne({
      $or: [{ email }, { NIC }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email or NIC already registered',
      });
    }

    // Create new user
    const user = await User.create({
      name,
      NIC,
      email,
      phone,
      password,
      role: 'citizen', // New users are citizens by default
    });

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Return success response (don't send password)
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        NIC: user.NIC,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

/**
 * Login User
 * POST /api/auth/login
 *
 * Body parameters:
 * - email: User email
 * - password: User password
 *
 * Returns: User object + JWT token
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user by email
    // Note: .select('+password') is used because password field has select: false
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        NIC: user.NIC,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

/**
 * Get Current User
 * GET /api/auth/me
 * Protected route - requires valid JWT token in Authorization header
 *
 * Returns: Current user object
 */
const getCurrentUser = async (req, res) => {
  try {
    // req.user is populated by protect middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        NIC: user.NIC,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Get Current User Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching user',
    });
  }
};

/**
 * Update User Profile
 * PATCH /api/auth/profile/:userId
 * Protected route - requires valid JWT token
 *
 * Body parameters:
 * - name: Full name (optional)
 * - phone: Phone number (optional)
 * - address: Address (optional)
 * - profileImage: Profile image as base64 (optional)
 *
 * Returns: Updated user object
 */
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, phone, address, profileImage } = req.body;

    // Debug logging
    console.log('Update Profile - JWT ID:', req.user.id, 'Type:', typeof req.user.id);
    console.log('Update Profile - URL ID:', userId, 'Type:', typeof userId);

    // Verify user is updating their own profile (convert both to strings for comparison)
    if (req.user.id.toString() !== userId.toString()) {
      console.log('Authorization failed: IDs do not match');
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile',
      });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (profileImage) updateData.profileImage = profileImage;

    // Update user
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        NIC: user.NIC,
        phone: user.phone,
        address: user.address,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Update Profile Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating profile',
    });
  }
};

/**
 * Change User Password
 * PATCH /api/auth/change-password/:userId
 * Protected route - requires valid JWT token
 *
 * Body parameters:
 * - currentPassword: Current password
 * - newPassword: New password (min 6 chars)
 *
 * Returns: Success message
 */
const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Verify user is changing their own password (convert both to strings for comparison)
    if (req.user.id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to change this password',
      });
    }

    // Get user with password field (normally hidden)
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify current password
    const isPasswordMatch = await user.matchPassword(currentPassword);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Change Password Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error changing password',
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
};
