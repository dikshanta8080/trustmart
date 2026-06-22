import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Wishlist from './pages/Wishlist';



function App() {
  // Manage Active tab
   const [activeTab, setActiveTab] = useState('wishlist');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-6">
          {/* Sidebar - Left */}
          <div className="w-64 hidden md:block flex-shrink-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          {/* Main Content - Right */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Wishlist />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;