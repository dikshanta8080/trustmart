import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const userRoles = user?.roles || [];

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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!requiredRole) {
    return children;
  }

  const hasRequiredRole = userRoles.some(
    (role) =>
      role === requiredRole ||
      role === `ROLE_${requiredRole.toUpperCase()}` ||
      role.toUpperCase() === requiredRole.toUpperCase()
  );

  if (!hasRequiredRole) {
    if (requiredRole === "admin" || requiredRole === "ROLE_ADMIN") {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;