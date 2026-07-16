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
const Listings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Listings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="bg-white rounded-xl shadow p-5 border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <h2 className="text-2xl font-bold">{item.value}</h2>
                  <p className="text-sm text-gray-400">{item.sub}</p>
                </div>

                <div className={`${item.iconBg} p-3 rounded-lg`}>
                  <Icon className={`${item.iconColor}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listings;