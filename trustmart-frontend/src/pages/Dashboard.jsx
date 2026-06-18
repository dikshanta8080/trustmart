// src/pages/Dashboard.jsx

import { useState } from "react";
import { Users, Package, CreditCard, Flag } from "lucide-react";
import StatsCard from "../components/StatsCard";
import { WeeklyUsersChart, CategoryPieChart } from "../components/Charts";

const recentActivity = [
  { icon: "👤", text: "New user registered: priya.s@email.com", time: "5 min ago", color: "bg-blue-50" },
  { icon: "📦", text: "New listing pending review: iPhone 14 Pro", time: "12 min ago", color: "bg-purple-50" },
  { icon: "🚩", text: "Report received for listing #5432", time: "35 min ago", color: "bg-red-50" },
  { icon: "✅", text: "Listing approved: Dell XPS 13 Laptop", time: "1 hour ago", color: "bg-green-50" },
  { icon: "⚠️", text: "Fraud alert: suspicious pricing pattern detected", time: "2 hours ago", color: "bg-amber-50" },
];

// Calendar events — jun din activity xa
const calendarEvents = {
  3: "high", 7: "medium", 12: "high", 15: "low",
  18: "high", 21: "medium", 24: "low", 27: "high", 28: "medium",
};

const MiniCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const dotColor = {
    high: "bg-red-400",
    medium: "bg-amber-400",
    low: "bg-green-400",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Activity Calendar</h3>
          <p className="text-xs text-gray-400 mt-0.5">Click a day to view events</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 text-sm">‹</button>
          <span className="text-xs font-medium text-gray-700">{monthName} {year}</span>
          <button onClick={nextMonth} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 text-sm">›</button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => {
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const event = calendarEvents[day];
          return (
            <div key={i} className={`relative flex flex-col items-center justify-center h-8 rounded-lg cursor-pointer transition-colors
              ${day ? "hover:bg-gray-50" : ""}
              ${isToday ? "bg-indigo-600 hover:bg-indigo-700" : ""}
            `}>
              {day && (
                <>
                  <span className={`text-xs ${isToday ? "text-white font-semibold" : "text-gray-700"}`}>
                    {day}
                  </span>
                  {event && !isToday && (
                    <span className={`absolute bottom-1 w-1 h-1 rounded-full ${dotColor[event]}`} />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /><span className="text-[11px] text-gray-500">High activity</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /><span className="text-[11px] text-gray-500">Medium</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /><span className="text-[11px] text-gray-500">Low</span></div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Platform health overview</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          ↓ Export
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard label="Total Users" value="24,381" delta="↑ 8.2% this month" deltaType="up" icon={Users} iconColor="text-blue-500" />
        <StatsCard label="Total Listings" value="8,742" delta="↑ 5.1% this month" deltaType="up" icon={Package} iconColor="text-purple-500" />
        <StatsCard label="Total Revenue" value="₹3.2M" delta="↑ 23% this month" deltaType="up" icon={CreditCard} iconColor="text-green-500" />
        <StatsCard label="Open Reports" value="47" delta="↑ 3 today" deltaType="down" icon={Flag} iconColor="text-red-500" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-800">User Growth</h3>
            <p className="text-xs text-gray-400 mt-0.5">New registrations — last 7 days</p>
          </div>
          <WeeklyUsersChart />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Listings by Category</h3>
            <p className="text-xs text-gray-400 mt-0.5">Current distribution</p>
          </div>
          <CategoryPieChart />
        </div>
      </div>

      {/* Calendar + Recent Activity */}
      <div className="grid grid-cols-3 gap-4">

        <MiniCalendar />

        {/* Recent Activity */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
            <p className="text-xs text-gray-400 mt-0.5">Latest platform events</p>
          </div>
          <div className="space-y-2">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-xs flex-shrink-0 mt-0.5`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-relaxed">{item.text}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;