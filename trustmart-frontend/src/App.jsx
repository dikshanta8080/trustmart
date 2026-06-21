
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";

const App = () => {
  // Check if user is authenticated from localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  
  // Get user roles
  const getUserRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const roles = user.roles || [];
      
      if (roles.some(role => role === "ROLE_ADMIN" || role === "ADMIN" || role === "admin")) {
        return "admin";
      }
      return "user";
    } catch {
      return "user";
    }
  };

  const userRole = getUserRole();

  // For now, redirect user to login (since UserDashboard doesn't exist yet)
  const getRedirectPath = () => {
    if (!isAuthenticated) return "/login";
    if (userRole === "admin") return "/admin/dashboard";
    // Temporary: redirect user to login until UserDashboard is created
    return "/login";
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      
      {/* Home Route - Redirect based on role */}
      <Route 
        path="/" 
        element={<Navigate to={getRedirectPath()} replace />} 
      />
      
      {/* Admin Routes - Protected */}
      <Route 
        path="/admin/*" 
        element={
          isAuthenticated ? (
            <AdminRoutes />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      
      {/* User Dashboard - Temporarily redirect to login */}
      <Route 
        path="/user/dashboard" 
        element={<Navigate to="/login" replace />} 
      />
      
      {/* Catch all - Must be LAST */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;