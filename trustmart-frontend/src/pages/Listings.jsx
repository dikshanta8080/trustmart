// src/pages/Listings.jsx

import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import ListingTable from "../components/ListingTable";
import { listings } from "../data/mockData";

const stats = [
  {
    label: "Total Listings",
    value: listings.length,
    icon: Package,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
    sub: "All listings",
  },
  {
    label: "Pending Review",
    value: listings.filter((l) => l.status === "pending").length,
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    sub: "Needs approval",
  },
  {
    label: "Approved",
    value: listings.filter((l) => l.status === "approved").length,
    icon: CheckCircle,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    sub: "Live listings",
  },
  {
    label: "Rejected",
    value: listings.filter((l) => l.status === "rejected").length,
    icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    sub: "Removed listings",
  },
];

const Listings = () => {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Listing Moderation</h1>
          <p className="text-xs text-gray-400 mt-0.5">Review and manage all product listings</p>
        </div>
        <span className="text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium">
          {listings.filter((l) => l.status === "pending").length} pending approval
        </span>
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
      <ListingTable />

    </div>
  );
};

export default Listings;