import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Trash2 } from 'lucide-react';
import {wishlistData} from '../data/sampleData'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Wishlist = () => {
  //Manage State
  const [items, setItems] = useState(wishlistData);
  const [sortBy, setSortBy] = useState('newest');

  // Remove Item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  //Sort Items
  const getSortedItems = () => {
    const sorted = [...items];
    if (sortBy === 'price-low') {
      return sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      return sorted.sort((a, b) => b.price - a.price);
    } else {
      return sorted;
    }
  };

  const sortedItems = getSortedItems();

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500" size={28} />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {items.length} items
          </span>
        </div>

        {/* Sort Dropdown */}
        {items.length > 0 && (
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        )}
      </div>

      {/* Items List or Empty State */}
      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Wishlist is empty</h2>
          <p className="text-gray-500 mb-4">Start saving your favorite items</p>
          <Link to="/browse" className="bg-blue-600 text-white px-6 py-2 rounded-lg inline-block">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex flex-col md:flex-row gap-4">
                
                {/* Image */}
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full md:w-48 h-48 object-cover rounded-lg"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-lg hover:text-blue-600">
                        {item.title}
                      </h3>
                    </Link>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="mt-2">
                    <span className="text-2xl font-bold">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-gray-400 line-through ml-2">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Condition Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    item.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                    item.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                    item.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                    item.condition === 'Poor' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800' // Default
                  }`}>
                    {item.condition}
                  </span>

                  {/* Location & Rating */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  {/* Seller */}
                  <div className="mt-3 pt-3 border-t flex items-center gap-2 text-sm">
                    <span>{item.seller}</span>
                    {item.sellerVerified && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                        ✓ Verified
                      </span>
                    )}
                    <span className="text-gray-400">• {item.addedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;