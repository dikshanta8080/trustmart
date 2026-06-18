import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import LoginPage from "./pages/LoginPage";

const App = () => {
  // Authentication status - pachi true/false garda hunxa
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/admin/*" element={isAuthenticated ? <AdminRoutes /> : <Navigate to="/login" replace />}   />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;