import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShieldAlert,
  Flag,
  Tag,
} from "lucide-react";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/listings", label: "Listings", icon: Package },
  { path: "/admin/fraud", label: "Fraud Monitoring", icon: ShieldAlert, badge: 5 },
  { path: "/admin/reports", label: "Reports", icon: Flag, badge: 12 },
  { path: "/admin/categories", label: "Categories", icon: Tag },
];
