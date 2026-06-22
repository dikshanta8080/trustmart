import { useNavigate } from 'react-router-dom';

// Mock data (fallback when API is not available)
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
  {
    id: 1,
    item: 'iPhone 15 Pro Max',
    price: 1200,
    date: '2026-06-20',
    buyer: 'John D.'
  },
  {
    id: 2,
    item: 'Sony XM5 Headphones',
    price: 350,
    date: '2026-06-18',
    buyer: 'David P.'
  },
  {
    id: 3,
    item: 'Herman Miller Chair',
    price: 850,
    date: '2026-06-15',
    buyer: 'Sarah M.'
  },
];

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back, User!
          </p>
        </div>

        <button
          onClick={() => navigate('/sell')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Sell Product
        </button>
      </div>
    </div>
  );
}