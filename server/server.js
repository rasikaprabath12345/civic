/**
 * CivicLink LK - Backend Server
 * =============================
 * Main Express server file
 * Sets up middleware, connects to MongoDB, and mounts routes
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const citizenRoutes = require('./routes/citizenRoutes');

// Initialize Express app
const app = express();

/**
 * Middleware Configuration
 * Runs on every request
 */

// Connect to MongoDB
connectDB();

// Body parser - handles JSON and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS - allows requests from frontend (Vite on localhost:5173)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

/**
 * Health Check Endpoint
 * GET / - Returns server status
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CivicLink LK Backend Server is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 * All routes are prefixed with /api
 */

// Authentication routes
// POST /api/auth/register - Register new user
// POST /api/auth/login - Login user
// GET /api/auth/me - Get current user (protected)
app.use('/api/auth', authRoutes);

// Admin routes (protected)
// GET /api/admin/requests - Get all requests
// PATCH /api/admin/requests/:requestId - Update request status
// GET /api/admin/users - Get all users
// GET /api/admin/stats - Get statistics
app.use('/api/admin', adminRoutes);

// Citizen routes (protected)
// GET /api/appointments/my-appointments - Get user's appointments
// POST /api/appointments/create - Create new appointment
// PATCH /api/appointments/:appointmentId/cancel - Cancel appointment
// GET /api/requests/my-requests - Get user's requests
// POST /api/requests/create - Create new request
// GET /api/complaints/my-complaints - Get user's complaints
// POST /api/complaints/submit - Submit new complaint
app.use('/api', citizenRoutes);

/**
 * 404 Error Handler
 * Catches all undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/**
 * Error Handling Middleware
 * Catches any errors from routes and sends error response
 */
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message: message,
  });
});

/**
 * Start Server
 * Listens on PORT from .env or default 5000
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   CivicLink LK Backend Server          ║
║   🚀 Running on http://localhost:${PORT}   ║
╚════════════════════════════════════════╝
  `);
});
