import React, { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Wishlist from './pages/Wishlist';
import PurchaseHistory from './pages/PurchaseHistory';
import Products from './pages/Products';

function App() {
  // Manage Active tab
   const [activeTab, setActiveTab] = useState('wishlist');

   const currentUser = {
  name: "Dilasha",
  role: "Customer",
};
    
const handleLogout = () => {
  console.log("Logout clicked");
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-6">
          {/* Sidebar  */}
          <div className="w-64 hidden md:block flex-shrink-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Wishlist />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/Products" element={<Products />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
