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

module.exports = {
  register,
  login,
  getCurrentUser,
};
