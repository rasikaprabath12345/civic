/**
 * Utilities
 * =======================
 * Helper functions and constants for the application
 */

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Sri Lankan format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+94|0)?[1-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate NIC format (Sri Lankan)
 */
export const isValidNIC = (nic) => {
  const nicRegex = /^[0-9]{9}[vV]$/;
  return nicRegex.test(nic.replace(/\s/g, ''));
};

/**
 * Format phone number
 */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+94 ${cleaned.slice(1)}`;
  }
  return phone;
};

/**
 * Get status badge color
 */
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'processing':
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'rejected':
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

/**
 * Get status icon
 */
export const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'approved':
      return '✅';
    case 'processing':
    case 'in-progress':
      return '⏳';
    case 'pending':
      return '📋';
    case 'rejected':
    case 'cancelled':
      return '❌';
    default:
      return '❓';
  }
};

/**
 * Calculate progress percentage
 */
export const getProgressPercentage = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 25;
    case 'processing':
    case 'in-progress':
      return 66;
    case 'completed':
    case 'approved':
      return 100;
    default:
      return 0;
  }
};

/**
 * Truncate text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

/**
 * Format currency (Sri Lankan Rupee)
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(amount);
};

/**
 * Service categories
 */
export const SERVICE_CATEGORIES = [
  { id: 'appointments', name: 'Appointments', icon: '📅', color: 'from-blue-500 to-blue-600' },
  { id: 'certificates', name: 'Certificates', icon: '📜', color: 'from-green-500 to-green-600' },
  { id: 'complaints', name: 'Complaints', icon: '📢', color: 'from-orange-500 to-orange-600' },
  { id: 'documents', name: 'Documents', icon: '📄', color: 'from-purple-500 to-purple-600' },
];

/**
 * Request statuses
 */
export const REQUEST_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

/**
 * Certificate types
 */
export const CERTIFICATE_TYPES = [
  { value: 'Birth', label: 'Birth Certificate' },
  { value: 'Death', label: 'Death Certificate' },
  { value: 'Marriage', label: 'Marriage Certificate' },
];

/**
 * Delivery methods
 */
export const DELIVERY_METHODS = [
  { value: 'email', label: 'Email (Digital Copy)' },
  { value: 'pickup', label: 'Pickup from Office' },
  { value: 'postal', label: 'Postal Delivery' },
];

export default {
  formatDate,
  formatDateTime,
  isValidEmail,
  isValidPhone,
  isValidNIC,
  formatPhone,
  getStatusColor,
  getStatusIcon,
  getProgressPercentage,
  truncateText,
  formatCurrency,
  SERVICE_CATEGORIES,
  REQUEST_STATUSES,
  CERTIFICATE_TYPES,
  DELIVERY_METHODS,
};
