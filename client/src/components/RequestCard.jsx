/**
 * Request Card Component
 * =======================
 * Displays a request/application card with status and details
 */

import React from 'react';

const RequestCard = ({ request, onClick = null }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'processing':
        return '⏳';
      case 'pending':
        return '📋';
      case 'rejected':
        return '❌';
      default:
        return '❓';
    }
  };

  const handleClick = () => {
    if (onClick) onClick(request);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{request.type}</h4>
          <p className="text-xs text-gray-500">ID: {request._id?.substring(0, 12)}...</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ml-2 ${getStatusColor(request.status)}`}>
          {getStatusIcon(request.status)} {request.status}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-3">
        <p>Submitted: {new Date(request.createdAt).toLocaleDateString()}</p>
      </div>

      {request.description && (
        <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
      )}
    </div>
  );
};

export default RequestCard;
