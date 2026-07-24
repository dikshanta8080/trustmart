import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ProtectedRoute component: guards routes based on authentication and optional role requirements.
// It renders children only if the user is authenticated and (if requiredRole is provided) has that role.
const ProtectedRoute = ({ children, requiredRole }) => {
  // Destructure auth state and user data from the AuthContext
  const { isAuthenticated, user, loading } = useAuth();
  // Safely extract roles; default to empty array if user is null/undefined
  const userRoles = user?.roles || [];

  // While authentication status is being loaded, show a spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no specific role is required, any authenticated user is allowed to proceed
  if (!requiredRole) {
    return children;
  }

  // Check if the user's roles include the required role (case-insensitive,
  // and supports both "ROLE_ADMIN" and "admin" formats)
  const hasRequiredRole = userRoles.some((role) =>
    role === requiredRole ||
    role === `ROLE_${requiredRole.toUpperCase()}` ||
    role.toUpperCase() === requiredRole.toUpperCase()
  );

  // If the user lacks the required role, redirect them (currently to /dashboard)
  if (!hasRequiredRole) {
    if (requiredRole === "admin" || requiredRole === "ROLE_ADMIN") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Access granted – render the protected children
  return children;
};

export default ProtectedRoute;