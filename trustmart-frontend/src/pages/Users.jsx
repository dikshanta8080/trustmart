import { Users as UsersIcon, UserCheck, UserX, AlertTriangle } from "lucide-react";
import UserTable from "../components/UserTable";
import { users } from "../data/mockData";

const stats = [
  {
    label: "Total Users",
    value: users.length,
    icon: UsersIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sub: "All registered users",
  },
  {
    label: "Verified Users",
    value: users.filter((u) => u.verified).length,
    icon: UserCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    sub: `${Math.round((users.filter((u) => u.verified).length / users.length) * 100)}% of total`,
  },
  {
    label: "Suspended",
    value: users.filter((u) => u.status === "suspended").length,
    icon: UserX,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    sub: "Restricted accounts",
  },
  {
    label: "Flagged",
    value: users.filter((u) => u.status === "flagged").length,
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    sub: "Needs review",
  },
];

const Users = () => {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">User Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and monitor all platform users</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
          + Invite User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center`}>
                  <Icon size={15} className={s.iconColor} />
                </div>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <UserTable />

    </div>
  );
};

export default Users;