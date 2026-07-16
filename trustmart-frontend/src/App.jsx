import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import Users from "./pages/Users";
import Listings from "./pages/Listings";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const isAuthenticated = false; // Replace with real auth logic later

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />      {/* <-- ADD THIS */}
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />

      {/* Protected routes (only if authenticated) */}
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
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
     

      {/* Admin routes – if you want to protect them, you can wrap AdminRoutes */}
      <Route
        path="/admin/*"
        element={
          isAuthenticated ? <AdminRoutes /> : <Navigate to="/login" replace />
        }
      />

      {/* Fallback for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;