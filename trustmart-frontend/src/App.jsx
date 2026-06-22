// src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import AdminRoutes from "./routes/AdminRoutes";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider> 
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
  
        
        {/* Home Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Admin Routes - Protected */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminRoutes />
            </ProtectedRoute>
          } 
        />
        
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;