// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRoles = user.roles || [];

  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If no specific role required, just allow access
  if (!requiredRole) {
    return children;
  }

  // Check if user has required role
  const hasRequiredRole = userRoles.some(role => 
    role === requiredRole || 
    role === `ROLE_${requiredRole.toUpperCase()}` ||
    role.toUpperCase() === requiredRole.toUpperCase()
  );

  // If doesn't have required role, redirect
  if (!hasRequiredRole) {
    // If trying to access admin but is user
    if (requiredRole === "admin" || requiredRole === "ROLE_ADMIN") {
      return <Navigate to="/user/dashboard" replace />;
    }
    // If trying to access user but is admin
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;