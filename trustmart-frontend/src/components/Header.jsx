import React from 'react';
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  PlusIcon,
  BellIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';


const Header = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-3">
    <div className="flex items-center">
      
      {/* Logo */}
      <div className="w-40 shrink-0 -ml-6 mr-6 ">
        <h1 className="text-3xl font-bold text-blue-600">
          TrustMart
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-3xl relative mx-8">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products, brands, categories..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Navigation */}
      <div className="shrink-0 ml-auto">
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">
            Home
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-600 whitespace-nowrap">
            Browse
          </a>

          {/* Sell Button */}
          <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap">
            <PlusIcon className="w-4 h-4" />
            Sell
          </button>

          {/* Notification */}
        <button className="relative text-gray-600 hover:text-blue-600">
        <BellIcon className="w-6 h-6" />
        </button>

        {/* Chat */}
        <button className="relative text-gray-600 hover:text-blue-600">
        <ChatBubbleLeftIcon className="w-6 h-6" />
        </button>

        {/* Profile */}
        <button className="text-gray-600 hover:text-blue-600">
        <UserCircleIcon className="w-7 h-7" />
        </button>
    </nav>
    </div>

    </div>
  </div>
</header>
  );
};

export default Header;