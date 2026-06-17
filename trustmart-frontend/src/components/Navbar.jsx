import { useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";

const pageTitles = {
  "/admin/dashboard": "Analytics Dashboard",
  "/admin/users": "User Management",
  "/admin/listings": "Listing Moderation",
  "/admin/fraud": "Fraud Monitoring",
  "/admin/reports": "Reports Handling",
  "/admin/categories": "Category Management",
};

const Navbar = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Admin Panel";

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      
      {/* Page title */}
      <h2 className="text-sm font-medium text-gray-900">{title}</h2>

      {/* Right side */}
      <div className="flex items-center gap-4">
        
        {/* Search bar */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-600 outline-none w-40 placeholder-gray-400"
          />
        </div>

        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <Bell size={19} className="text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Admin avatar */}
        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-semibold cursor-pointer">
          AD
        </div>

      </div>
    </div>
  );
};

export default Navbar;