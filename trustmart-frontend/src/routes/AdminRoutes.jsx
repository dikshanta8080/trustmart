import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Listings from "../pages/Listings";
import Reports from "../pages/Reports";
import Categories from "../pages/Categories";
import FraudMonitoring from "../pages/FraudMonitoring";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Default redirect to dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="listings" element={<Listings />} />
        <Route path="reports" element={<Reports />} />
        <Route path="categories" element={<Categories />} />
        <Route path="fraud" element={<FraudMonitoring />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;