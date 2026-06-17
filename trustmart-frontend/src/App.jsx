// src/App.jsx

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;