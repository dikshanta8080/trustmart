import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default App;