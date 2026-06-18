import React from 'react';
import {
  HeartIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  ClockIcon,
  StarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 shrink-0 ml-15 mt-4">

      {/* User Profile Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 ">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 border-2 border-white rounded-full w-3.5 h-3.5"></div>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Alex Johnson</span>

              <svg
                className="w-4 h-4 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-sm text-gray-500">
              Verified
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="bg-white rounded-xl shadow-sm p-2">
        {[
          { icon: Squares2X2Icon, label: 'Overview', id: 'overview' },
          { icon: ShoppingBagIcon, label: 'My Listings', id: 'listings' },
          { icon: ClockIcon, label: 'My Orders', id: 'orders' },
          { icon: HeartIcon, label: 'Wishlist', id: 'wishlist', active: true },
          { icon: StarIcon, label: 'Purchase History', id: 'purchases' },
          { icon: StarIcon, label: 'Sales History', id: 'sales' },
          { icon: StarIcon, label: 'Reviews', id: 'reviews' },
          { icon: Cog6ToothIcon, label: 'Settings', id: 'settings' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />

            <span className="text-sm font-medium">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;