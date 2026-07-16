import { purchaseData } from "../data/sampleData";
import { 
  ShoppingBagIcon, 
  CubeIcon, 
  TagIcon, 
  ChartBarIcon,
  ClockIcon,
  ArrowPathIcon 
} from "@heroicons/react/24/outline";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


function PurchaseHistory() {
  const { stats, orders } = purchaseData;

  const statCards = [
    { label: "Total Spent", value: stats.totalSpent, icon: ShoppingBagIcon },
    { label: "Items Bought", value: stats.itemsBought, icon: CubeIcon },
    { label: "Top Category", value: stats.topCategory, icon: TagIcon },
    { label: "Avg. Purchase", value: stats.avgPurchase, icon: ChartBarIcon },
  ];

  return (
    <div>
      {/* Header with Icon */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <ClockIcon className="w-7 h-7 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">Sold by Sarah Chen • Jun 12, 2026</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Orders Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">My Orders</h2>
          <span className="text-sm text-gray-500">{orders.length} items</span>
        </div>

        {/* Order Items */}
        {orders.map((order) => (
          <div
            key={order.id}
            className="px-6 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex items-center gap-4"
          >
            {/* Product Image */}
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
              {order.image}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {order.name}
              </h3>
              <p className="text-sm text-gray-500">
                Sold by {order.seller} • {order.date}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${order.statusColor}`}></span>
                <span className="text-sm text-gray-600">{order.status}</span>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <p className="text-lg font-bold text-gray-900">{order.price}</p>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1">
                  <ArrowPathIcon className="w-4 h-4" />
                  Buy Again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseHistory;