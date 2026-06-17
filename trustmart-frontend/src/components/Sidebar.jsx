// src/components/Sidebar.jsx

import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Package, ShieldAlert, Flag, Tag } from "lucide-react";
import { reports, fraudAlerts } from "../data/mockData";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/listings", label: "Listings", icon: Package },
  { 
    path: "/admin/fraud", 
    label: "Fraud Monitoring", 
    icon: ShieldAlert, 
    badge: fraudAlerts.filter(a => a.severity === "high").length || null
  },
  { 
    path: "/admin/reports", 
    label: "Reports", 
    icon: Flag, 
    badge: reports.filter(r => r.status === "open" || r.status === "escalated").length || null
  },
  { path: "/admin/categories", label: "Categories", icon: Tag },
];

const Sidebar = () => {
  return (
    <div className="w-56 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-200">
        <h1 className="text-base font-semibold text-gray-900">TrustMart</h1>
        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-3">
        {navItems.map(({ path, label, icon: Icon, badge }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-sm border-l-2 transition-all ${
                isActive
                  ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            <Icon size={17} />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom — admin info */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-semibold">
            AD
          </div>
          <div>
            <p className="text-xs font-medium text-gray-800">Admin</p>
            <p className="text-xs text-gray-400">Super admin</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;