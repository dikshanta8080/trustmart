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
       {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <span className="text-4xl mb-3">📭</span>
          <p className="text-sm font-medium">No users found</p>
          <p className="text-xs mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">User</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Email</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Joined</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Listings</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Rating</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Verified</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                  {/* Avatar + name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColor[i % avatarColor.length]}`}>
                        {user.avatar}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{user.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>

                  {/* Joined */}
                  <td className="px-4 py-3 text-sm text-gray-500">{user.joined}</td>

                  {/* Listings */}
                  <td className="px-4 py-3 text-sm text-gray-700">{user.listings}</td>

                  {/* Rating */}
                  <td className="px-4 py-3">
                    {user.rating ? (
                      <span className="text-sm text-gray-700">⭐ {user.rating}</span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusPill[user.status]}`}>
                      {user.status}
                    </span>
                  </td>

                  {/* Verified */}
                  <td className="px-4 py-3">
                    {user.verified ? (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle size={13} /> Verified
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Unverified</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                        <Eye size={14} className="text-gray-500" />
                      </button>
                      {!user.verified && (
                        <button
                          onClick={() => handleVerify(user.id)}
                          className="p-1.5 hover:bg-green-50 rounded-lg transition-colors"
                          title="Verify"
                        >
                          <CheckCircle size={14} className="text-green-500" />
                        </button>
                      )}
                      <button
                        onClick={() => handleSuspend(user.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title={user.status === "suspended" ? "Restore" : "Suspend"}
                      >
                        {user.status === "suspended"
                          ? <Shield size={14} className="text-green-500" />
                          : <ShieldOff size={14} className="text-red-400" />
                        }
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-400">Showing {filtered.length} of {data.length} users</p>
        <div className="flex items-center gap-1">
          <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">← Prev</button>
          <button className="px-2.5 py-1 text-xs bg-indigo-600 text-white rounded-lg">1</button>
          <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">Next →</button>
        </div>
      </div>

    </div>
  );
};

export default UserTable;
