import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />

      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
