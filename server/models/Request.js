/**
 * Request Model
 * =============
 * Defines the schema for citizen requests (certificates, complaints, etc.)
 */

const mongoose = require('mongoose');

/**
 * Request Schema
 * Fields:
 * - userId: Reference to the user who made the request
 * - type: Type of request (certificate, complaint, appointment, etc.)
 * - status: Request status (pending, processing, completed)
 * - details: Request details/description
 * - createdAt: Timestamp of request creation
 * - updatedAt: Timestamp of last update
 */
const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['certificate', 'complaint', 'appointment', 'other'],
      default: 'other',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed'],
      default: 'pending',
    },
    details: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Request', requestSchema);
