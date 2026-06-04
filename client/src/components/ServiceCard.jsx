/**
 * Service Card Component
 * =======================
 * Displays a government service card with icon, title, and description
 */

import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, href, color = 'from-blue-500 to-blue-600', badge = null }) => {
  return (
    <Link
      to={href}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
    >
      <div className={`bg-gradient-to-br ${color} h-24 flex items-center justify-center relative`}>
        <span className="text-4xl">{icon}</span>
        {badge && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;
