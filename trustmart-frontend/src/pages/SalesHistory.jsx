import React from 'react';
import { salesData } from '../data/sampleData';
import {
  CurrencyDollarIcon,
  CubeIcon,
  ChartBarIcon,
  TagIcon,
  EyeIcon,
  ArrowPathIcon,
  ChartBarSquareIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function SalesHistory() {
  const { stats, monthlyData, recentSales } = salesData;
   

  const statCards = [
    { label: 'Total Revenue', value: stats.totalRevenue, icon: CurrencyDollarIcon, change: '+23%' },
    { label: 'Items Sold', value: stats.itemsSold, icon: CubeIcon, change: '+5' },
    { label: 'Avg. Price', value: stats.avgPrice, icon: ChartBarIcon, change: null },
    { label: 'Best Category', value: stats.bestCategory, icon: TagIcon, change: null },
  ];

  const maxSales = Math.max(...monthlyData.map(d => d.sales));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <ChartBarSquareIcon className="w-7 h-7 text-blue-500"/>
          <h1 className="text-2xl font-bold text-gray-900">Sales History</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">Track your sales performance</p>
      </div>
    </div>
  );
}

export default SalesHistory; 