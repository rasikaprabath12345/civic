/**
 * Appointment Model
 * =================
 * Defines the schema for citizen appointments with government offices
 */

const mongoose = require('mongoose');

/**
 * Appointment Schema
 * Fields:
 * - userId: Reference to the citizen who booked the appointment
 * - service: Type of service (Grama Sevaka, Land Registry, etc.)
 * - date: Appointment date and time
 * - location: Office location
 * - status: Appointment status (pending, confirmed, completed, cancelled)
 * - notes: Additional notes
 * - createdAt: Timestamp of booking
 */
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: String,
      required: true,
      enum: ['Grama Sevaka', 'Land Registry', 'Birth Registration', 'Death Registration', 'Marriage Registration', 'Other'],
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
