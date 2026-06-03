/**
 * Database Configuration
 * =====================
 * Handles MongoDB connection using Mongoose
 * Called once when server starts
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 * Uses MONGODB_URI from .env
 * Logs success/error messages
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    // Exit process if DB connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
