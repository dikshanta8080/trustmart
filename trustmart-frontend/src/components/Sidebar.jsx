import React from 'react';
import {
  HeartIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  ClockIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  StarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { userProfileData } from '../data/sampleData'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const location = useLocation();
  return (
    <aside className="w-64 shrink-0 -ml-15 mt-0">

      {/* User Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 ">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={userProfileData.avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {userProfileData.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 border-2 border-white rounded-full w-3.5 h-3.5"></div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{userProfileData.name}</span>

                    {userProfileData.isVerified && (
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
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    {userProfileData.isVerified ? 'Verified' : 'Member'}
                  </p>
                </div>
              </div>
            </div>

      {/* Navigation Links */}
      <nav className="bg-white rounded-xl shadow-sm p-2">
        {[
          { icon: Squares2X2Icon, label: 'Overview', id: 'overview', path: '/' },
          { icon: ShoppingCartIcon, label: 'Cart', id: 'listings', path: '/cart' },
          { icon: ShoppingBagIcon, label: 'My Orders', id: 'orders', path: '/orders' },
          { icon: HeartIcon, label: 'Wishlist', id: 'wishlist', path: '/wishlist' },
          { icon: ClockIcon, label: 'Purchase History', id: 'purchases', path: '/purchase-history' },
          { icon: ChartBarIcon, label: 'Sales History', id: 'sales', path: '/sales' },
          { icon: StarIcon, label: 'Reviews', id: 'reviews', path: '/reviews' },
          { icon: Cog6ToothIcon, label: 'Settings', id: 'settings', path: '/settings' }
        ].map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
};


export default Sidebar;