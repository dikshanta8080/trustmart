import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
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

// Component definition
const Listings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
          >
            <div className={`${stat.iconBg} p-3 rounded-full`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//  Default export – this is what was missing
export default Listings;