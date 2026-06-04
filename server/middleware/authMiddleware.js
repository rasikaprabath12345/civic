/**
 * Authentication Middleware
 * ========================
 * Verifies JWT tokens and protects routes
 * Used to ensure only authenticated users access protected endpoints
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify JWT Token
 * Checks if valid JWT exists in Authorization header
 * If valid, attaches user info to request object
 * If invalid, returns 401 error
 */
const protect = (req, res, next) => {
  try {
    // Extract token from Authorization header (format: "Bearer <token>")
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request for use in controllers
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

/**
 * Middleware: Check if user is admin
 * Must be used AFTER protect middleware
 * Returns 403 if user is not an admin
 */
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }
  next();
};

/**
 * Middleware: Check if user is citizen
 * Must be used AFTER protect middleware
 * Returns 403 if user is not a citizen
 */
const isCitizen = (req, res, next) => {
  if (req.user.role !== 'citizen') {
    return res.status(403).json({
      success: false,
      message: 'Citizen access required',
    });
  }
  next();
};

/**
 * Middleware: Authorize specific roles
 * Generic middleware to check if user has required role(s)
 * Usage: authorize('admin') or authorize(['admin', 'moderator'])
 */
const authorize = (requiredRoles) => {
  return (req, res, next) => {
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `${roles.join(' or ')} access required`,
      });
    }
    next();
  };
};

module.exports = {
  protect,
  isAdmin,
  isCitizen,
  authorize,
};
