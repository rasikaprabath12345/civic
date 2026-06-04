/**
 * Complaint Model
 * ===============
 * Defines the schema for citizen complaints against government services
 */

const mongoose = require('mongoose');

/**
 * Complaint Schema
 * Fields:
 * - userId: Reference to the citizen who filed the complaint
 * - subject: Complaint subject/title
 * - description: Detailed complaint description
 * - category: Type of complaint (service quality, corruption, delay, etc.)
 * - status: Complaint status (submitted, in-progress, resolved)
 * - priority: Complaint priority (low, medium, high)
 * - attachments: File attachments
 * - createdAt: Timestamp of complaint submission
 */
const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['service-quality', 'corruption', 'delay', 'unprofessional-conduct', 'other'],
      default: 'other',
    },
    status: {
      type: String,
      enum: ['submitted', 'in-progress', 'resolved'],
      default: 'submitted',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    attachments: [
      {
        filename: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Complaint', complaintSchema);
