import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Tag, 
  BarChart3,
  Eye,
  RotateCcw,
  CheckCircle,
  Truck,
  Clock,
  XCircle
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { purchaseData, statsData } from '../data/purchaseData';

const PurchaseHistory = () => {
  // ✅ Data state ma rakheko
  const [orders, setOrders] = useState(purchaseData);
  const [stats] = useState(statsData);

  // ✅ Stats ma icons add garne
  const statsWithIcons = [
    { icon: DollarSign, label: stats[0].label, value: stats[0].value },
    { icon: Package, label: stats[1].label, value: stats[1].value },
    { icon: Tag, label: stats[2].label, value: stats[2].value },
    { icon: BarChart3, label: stats[3].label, value: stats[3].value }
  ];

  // ✅ Status Badge Config
  const getStatusConfig = (status) => {
    const config = {
      'Delivered': { icon: CheckCircle, color: 'bg-green-50 text-green-700 border-green-200' },
      'Shipped': { icon: Truck, color: 'bg-blue-50 text-blue-700 border-blue-200' },
      'Processing': { icon: Clock, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      'Cancelled': { icon: XCircle, color: 'bg-red-50 text-red-700 border-red-200' }
    };
    return config[status] || config['Processing'];
  };

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchase History</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statsWithIcons.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <stat.icon className="w-4 h-4" />
              <span>{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4">
                
                {/* Product Image */}
                <Link to={`/product/${order.id}`} className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={order.image} 
                      alt={order.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link to={`/product/${order.id}`}>
                      <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600">
                        {order.product}
                      </h3>
                    </Link>
                    
                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                    <span className="font-medium text-gray-900">${order.price}</span>
                    <span>Sold by {order.seller}</span>
                    <span>{order.date}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                  <button className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 hover:bg-blue-50 rounded-lg transition">
                    <Eye className="w-4 h-4" />
                    View Order
                  </button>
                  <button className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 hover:bg-blue-50 rounded-lg transition">
                    <RotateCcw className="w-4 h-4" />
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-gray-600 font-medium">No purchase history</h3>
          <p className="text-gray-400 text-sm mt-1">Start shopping to see your orders here</p>
          <Link to="/browse" className="inline-block mt-4 text-blue-600 text-sm hover:underline">
            Browse Products →
          </Link>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;