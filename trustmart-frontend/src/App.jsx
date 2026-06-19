import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";


const App = () => {
  const isAuthenticated = false;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      
      {/* Home Route - Only one "/" route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/*" 
        element={isAuthenticated ? <AdminRoutes /> : <Navigate to="/login" replace />} 
      />
      
      {/* Catch all - Must be LAST */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;