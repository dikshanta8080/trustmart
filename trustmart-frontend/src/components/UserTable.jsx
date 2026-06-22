import { useState } from "react";
import { Search, Shield, ShieldOff, Eye, CheckCircle } from "lucide-react";
import { users } from "../data/mockData";

const statusPill = {
  active: "bg-green-50 text-green-700",
  flagged: "bg-amber-50 text-amber-700",
  suspended: "bg-red-50 text-red-700",
  unverified: "bg-gray-100 text-gray-500",
};

const avatarColor = [
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-green-100 text-green-700",
];

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [data, setData] = useState(users);

  const filtered = data.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSuspend = (id) => {
    setData((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u
      )
    );
  };

  const handleVerify = (id) => {
    setData((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, verified: true, status: "active" } : u
      )
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl">

      {/* Filter bar */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="flagged">Flagged</option>
          <option value="suspended">Suspended</option>
          <option value="unverified">Unverified</option>
        </select>
        <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          ↓ Export
        </button>
      </div>
