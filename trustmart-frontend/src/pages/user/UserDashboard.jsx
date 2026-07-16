// src/pages/user/UserDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, ShoppingBag, Heart, TrendingUp, TrendingDown, 
  DollarSign, Eye, Clock, Star, Package, MessageSquare,
  CheckCircle, AlertCircle
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { dashboardAPI } from '../../utils/api';  //  API import

//  Mock data (fallback when API is not available)
const MOCK_USER = {
  name: 'Nisha Acharya',
  email: 'nisha@example.com',
  address: 'Jhumka, Sunsari',
  roles: ['ROLE_USER']
};

const MOCK_STATS = {
  totalListings: 12,
  totalSales: 1234,
  totalOrders: 8,
  profileViews: 342,
  thisMonthGrowth: 18,
  monthlyOrdersGrowth: 12,
};

const MOCK_ACTIVITY = [
  { action: 'Listed iPhone 15 Pro Max', time: '2 hours ago' },
  { action: 'Sold Sony XM5 Headphones to David Park', time: '1 day ago' },
  { action: 'Purchased Herman Miller Chair', time: '2 days ago' },
  { action: 'Received 5-star review from Marcus W.', time: '3 days ago' },
];

const MOCK_REVENUE = [
  { month: 'Jan', value: 350 },
  { month: 'Feb', value: 500 },
  { month: 'Mar', value: 700 },
  { month: 'Apr', value: 1050 },
  { month: 'May', value: 1200 },
  { month: 'Jun', value: 1400 },
];

const MOCK_ORDERS = [
  { month: 'Jan', orders: 4 },
  { month: 'Feb', orders: 6 },
  { month: 'Mar', orders: 8 },
  { month: 'Apr', orders: 16 },
  { month: 'May', orders: 24 },
  { month: 'Jun', orders: 32 },
];

const MOCK_PENDING = {
  offers: 2,
  ordersToShip: 1,
  reviewsToRespond: 3,
};

const MOCK_SALES = [
  { id: 1, item: 'iPhone 15 Pro Max', price: 1200, date: '2026-06-20', buyer: 'John D.' },
  { id: 2, item: 'Sony XM5 Headphones', price: 350, date: '2026-06-18', buyer: 'David P.' },
  { id: 3, item: 'Herman Miller Chair', price: 850, date: '2026-06-15', buyer: 'Sarah M.' },
];

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for API data
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [pendingActions, setPendingActions] = useState(null);
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(userData || MOCK_USER);
    fetchDashboardData();
  }, []);

  //  Fetch data from API, fallback to mock on error
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Attempt to call all dashboard endpoints in parallel
      const [statsRes, activityRes, revenueRes, ordersRes, pendingRes, salesRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentActivity(),
        dashboardAPI.getRevenueTrend(),
        dashboardAPI.getMonthlyOrders(),
        dashboardAPI.getPendingActions(),
        dashboardAPI.getSalesHistory()
      ]);

      // Set real data from API
      setStats(statsRes.data);
      setRecentActivity(activityRes.data);
      setRevenueData(revenueRes.data);
      setOrderData(ordersRes.data);
      setPendingActions(pendingRes.data);
      setSalesHistory(salesRes.data);

    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(err.message || 'Failed to load dashboard data');
      
      //  Fallback to mock data if API fails
      setStats(MOCK_STATS);
      setRecentActivity(MOCK_ACTIVITY);
      setRevenueData(MOCK_REVENUE);
      setOrderData(MOCK_ORDERS);
      setPendingActions(MOCK_PENDING);
      setSalesHistory(MOCK_SALES);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchDashboardData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const currentUser = user || MOCK_USER;
  const data = stats || MOCK_STATS;
  const activity = recentActivity.length ? recentActivity : MOCK_ACTIVITY;
  const revenue = revenueData.length ? revenueData : MOCK_REVENUE;
  const orders = orderData.length ? orderData : MOCK_ORDERS;
  const pending = pendingActions || MOCK_PENDING;
  const sales = salesHistory.length ? salesHistory : MOCK_SALES;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, {currentUser?.name || 'User'}!
          </p>
        </div>
        <button 
          onClick={() => navigate('/sell')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <Package className="w-4 h-4" />
          + Sell Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Package}
          label="My Listings"
          value={data.totalListings}
          change={`+${data.thisMonthGrowth}%`}
          positive
        />
        <StatCard 
          icon={DollarSign}
          label="Total Sales"
          value={`$${data.totalSales}`}
          change="+2 this month"
          positive
        />
        <StatCard 
          icon={ShoppingBag}
          label="My Orders"
          value={data.totalOrders}
          change={`+${data.monthlyOrdersGrowth}%`}
          positive
        />
        <StatCard 
          icon={Eye}
          label="Profile Views"
          value={data.profileViews}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={orders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#8b5cf6" name="Orders" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Actions & Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            Pending Actions
          </h3>
          <div className="space-y-3">
            <PendingItem 
              label="Offers waiting for your response" 
              count={pending.offers} 
              color="blue"
              icon={MessageSquare}
            />
            <PendingItem 
              label="Orders ready to ship" 
              count={pending.ordersToShip} 
              color="green"
              icon={ShoppingBag}
            />
            <PendingItem 
              label="Reviews you haven't responded to" 
              count={pending.reviewsToRespond} 
              color="purple"
              icon={Star}
            />
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:underline font-medium">
            View All Actions →
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            Recent Sales
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {sales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">{sale.item}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <User className="w-3 h-3" />
                    {sale.buyer}
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs">{sale.date}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${sale.price}</p>
                  <span className="text-xs text-gray-400">Sold</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:underline font-medium">
            View All Sales →
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {activity.map((act, index) => (
            <div key={index} className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{act.action}</p>
                <p className="text-sm text-gray-500">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Badge */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
        <CheckCircle className="w-6 h-6 text-blue-600" />
        <div>
          <p className="font-medium text-blue-800">Verified Seller</p>
          <p className="text-sm text-blue-600">Your account is fully verified</p>
        </div>
      </div>
    </div>
  );
}

// Sub-components

const StatCard = ({ icon: Icon, label, value, change, positive }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p className={`text-sm mt-1 flex items-center gap-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
);

const PendingItem = ({ label, count, color, icon: Icon }) => {
  const colorMap = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
  };
  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`p-1 rounded-full ${colors.bg}`}>
          <Icon className={`w-4 h-4 ${colors.text}`} />
        </div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
        {count}
      </span>
    </div>
  );
};