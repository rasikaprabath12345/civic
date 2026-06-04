/**
 * User Model
 * ==========
 * Defines the schema for users (citizens and admins)
 * Includes validation and password hashing
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * Fields:
 * - name: Full name of user
 * - NIC: National Identity Card (unique)
 * - email: Email address (unique)
 * - phone: Phone number
 * - password: Hashed password
 * - role: 'citizen' or 'admin'
 * - createdAt: Timestamp of account creation
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    NIC: {
      type: String,
      required: [true, 'Please provide NIC'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Don't return password by default in queries
    },
    role: {
      type: String,
      enum: ['citizen', 'admin'],
      default: 'citizen',
    },
    profileImage: {
      type: String, // Stores base64 encoded image or image URL
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/**
 * Middleware: Hash password before saving
 * Runs ONLY if password is modified
 * Uses bcryptjs with 10 salt rounds for security
 */
userSchema.pre('save', async function (next) {
  // If password hasn't been modified, skip hashing
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt (cost factor: 10)
    const salt = await bcrypt.genSalt(10);
    // Hash password with salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Method: Compare password for login
 * @param {String} enteredPassword - Password entered by user during login
 * @returns {Boolean} - True if passwords match, false otherwise
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export User model
module.exports = mongoose.model('User', userSchema);
