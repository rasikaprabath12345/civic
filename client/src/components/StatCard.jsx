/**
 * Stat Card Component
 * =======================
 * Displays statistics with icon, label, and value
 */

import React from 'react';

const StatCard = ({ icon, label, value, color = 'from-blue-500 to-blue-600', trend = null }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        {trend && (
          <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-300' : 'text-red-300'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-sm opacity-90 mb-2">{label}</div>
      <div className="text-3xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</div>
    </div>
  );
};

export default StatCard;
