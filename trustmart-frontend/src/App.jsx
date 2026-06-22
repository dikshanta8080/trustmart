import React, { useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Wishlist from './pages/Wishlist';
import UserDashboard from './pages/user/UserDashboard';

//  Temporary: Mock user for testing UI
const mockUser = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  address: 'Kathmandu, Nepal',
  roles: ['ROLE_USER']
};

const UserApp = () => {
  const [activeTab, setActiveTab] = useState('wishlist');
  const { user, logout } = useAuth();

  //  Use mock user if no real user
  const currentUser = user || mockUser;

  const handleLogout = () => {
    // Just go to login page
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-6">
          <div className="w-64 hidden md:block flex-shrink-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Wishlist />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

//  Main App
const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/*  Temporary: Bypass auth for testing */}
        <Route path="/*" element={<UserApp />} />
        
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;