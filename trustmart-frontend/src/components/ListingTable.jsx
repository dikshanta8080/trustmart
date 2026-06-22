// src/components/ListingTable.jsx

import { useState } from "react";
import { Search, Eye, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { listings } from "../data/mockData";

const statusPill = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
};

const categoryPill = {
  Phones: "bg-blue-50 text-blue-700",
  Vehicles: "bg-green-50 text-green-700",
  Electronics: "bg-purple-50 text-purple-700",
  Furniture: "bg-gray-100 text-gray-600",
};

const ListingTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [data, setData] = useState(listings);

  const filtered = data.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.seller.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    const matchCategory = categoryFilter === "all" || l.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  const handleApprove = (id) => {
    setData((prev) => prev.map((l) => l.id === id ? { ...l, status: "approved" } : l));
  };

  const handleReject = (id) => {
    setData((prev) => prev.map((l) => l.id === id ? { ...l, status: "rejected" } : l));
  };

  const handleRemove = (id) => {
    setData((prev) => prev.filter((l) => l.id !== id));
  };

  const categories = [...new Set(listings.map((l) => l.category))];

  return (
    <div className="bg-white border border-gray-200 rounded-xl">

      {/* Filter bar */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or seller..."
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
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          ↓ Export
        </button>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <span className="text-4xl mb-3">📭</span>
          <p className="text-sm font-medium">No listings found</p>
          <p className="text-xs mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Listing</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Seller</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Category</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Price</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Condition</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Location</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Submitted</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-800">{listing.title}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{listing.seller}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryPill[listing.category] || "bg-gray-100 text-gray-600"}`}>
                      {listing.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">
                    ₹{listing.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{listing.condition}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{listing.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{listing.submitted}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusPill[listing.status]}`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                        <Eye size={14} className="text-gray-500" />
                      </button>
                      {listing.status === "pending" && (
                        <>
                          <button onClick={() => handleApprove(listing.id)} className="p-1.5 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                            <CheckCircle size={14} className="text-green-500" />
                          </button>
                          <button onClick={() => handleReject(listing.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                            <XCircle size={14} className="text-red-400" />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleRemove(listing.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                        <Trash2 size={14} className="text-red-400" />
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
        <p className="text-xs text-gray-400">Showing {filtered.length} of {data.length} listings</p>
        <div className="flex items-center gap-1">
          <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">← Prev</button>
          <button className="px-2.5 py-1 text-xs bg-indigo-600 text-white rounded-lg">1</button>
          <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500">Next →</button>
        </div>
      </div>

    </div>
  );
};

export default ListingTable;