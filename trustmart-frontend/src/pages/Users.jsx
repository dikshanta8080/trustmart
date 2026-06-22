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