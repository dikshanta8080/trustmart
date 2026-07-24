import { Users as UsersIcon, UserCheck, UserX, AlertTriangle } from "lucide-react";
import UserTable from "../components/UserTable";
import { users } from "../data/mockData";

/**
 * Static statistics data derived from the mock users array.
 * Each stat object includes a label, computed value, icon component,
 * background/color classes for the icon, and a subtitle.
 */
const stats = [
  {
    label: "Total Users",
    value: users.length, // Total number of users
    icon: UsersIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sub: "All registered users",
  },
  {
    label: "Verified Users",
    value: users.filter((u) => u.verified).length, // Count of verified users
    icon: UserCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    sub: `${Math.round((users.filter((u) => u.verified).length / users.length) * 100)}% of total`, // Percentage of verified users
  },
  {
    label: "Suspended",
    value: users.filter((u) => u.status === "suspended").length, // Count of suspended users
    icon: UserX,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    sub: "Restricted accounts",
  },
  {
    label: "Flagged",
    value: users.filter((u) => u.status === "flagged").length, // Count of flagged users
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    sub: "Needs review",
  },
];

/**
 * Users component – the main page for user management.
 * Displays a header with title and an "Invite User" button,
 * a grid of statistics cards, and a table listing all users.
 */
const Users = () => {
  return (
    <div className="space-y-5">
      {/* -------- Header Section -------- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">User Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and monitor all platform users</p>
        </div>
        {/* Invite user button – placeholder action */}
        <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
          + Invite User
        </button>
      </div>

      {/* -------- Statistics Cards -------- */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon; // Destructure icon component for the current stat
          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
            >
              {/* Icon and label row */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center`}
                >
                  <Icon size={15} className={s.iconColor} />
                </div>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
              {/* Statistic value */}
              <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
              {/* Subtitle / additional info */}
              <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* User Table
          Renders the table component that displays all user data.
          The actual table markup and logic are abstracted in UserTable.
      */}
      <UserTable />
    </div>
  );
};

export default Users;