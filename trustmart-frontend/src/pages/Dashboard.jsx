// src/pages/Dashboard.jsx

import { useState } from "react";
import { Users, Package, CreditCard, Flag, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { WeeklyUsersChart, CategoryPieChart } from "../components/Charts";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Users", value: "24,381", delta: "+8.2%", deltaType: "up", icon: Users, iconBg: "bg-blue-50", iconColor: "text-blue-500", sub: "vs last month" },
  { label: "Total Listings", value: "8,742", delta: "+5.1%", deltaType: "up", icon: Package, iconBg: "bg-purple-50", iconColor: "text-purple-500", sub: "vs last month" },
  { label: "Total Revenue", value: "₹3.2M", delta: "+23%", deltaType: "up", icon: CreditCard, iconBg: "bg-green-50", iconColor: "text-green-500", sub: "vs last month" },
  { label: "Open Reports", value: "47", delta: "+3", deltaType: "down", icon: Flag, iconBg: "bg-red-50", iconColor: "text-red-500", sub: "since yesterday" },
];

const recentActivity = [
  { icon: "👤", text: "New user registered: priya.s@email.com", time: "5 min ago", color: "bg-blue-50" },
  { icon: "📦", text: "New listing pending review: iPhone 14 Pro", time: "12 min ago", color: "bg-purple-50" },
  { icon: "🚩", text: "Report received for listing #5432", time: "35 min ago", color: "bg-red-50" },
  { icon: "✅", text: "Listing approved: Dell XPS 13 Laptop", time: "1 hour ago", color: "bg-green-50" },
  { icon: "⚠️", text: "Fraud alert: suspicious pricing pattern detected", time: "2 hours ago", color: "bg-amber-50" },
  { icon: "👤", text: "User Amit Mishra flagged for review", time: "3 hours ago", color: "bg-blue-50" },
];

const calendarEvents = {
  3: { type: "high", label: "12 reports" },
  7: { type: "medium", label: "5 listings" },
  12: { type: "high", label: "Fraud alert" },
  15: { type: "low", label: "3 users" },
  18: { type: "high", label: "Today" },
  21: { type: "medium", label: "8 reports" },
  24: { type: "low", label: "2 listings" },
  27: { type: "high", label: "Fraud alert" },
  28: { type: "medium", label: "6 users" },
};

const dotColor = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-green-400",
};
//for calendar//
const MiniCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Activity Calendar</h3>
          <p className="text-xs text-gray-400 mt-0.5">Click a day to view events</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">‹</button>
          <span className="text-xs font-medium text-gray-700 w-24 text-center">{monthName} {year}</span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">›</button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => {
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isSelected = day === selectedDay;
          const event = calendarEvents[day];
          return (
            <div
              key={i}
              onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
              className={`relative flex flex-col items-center justify-center h-8 rounded-lg transition-colors
                ${day ? "cursor-pointer" : ""}
                ${isToday ? "bg-indigo-600" : isSelected ? "bg-indigo-50 ring-1 ring-indigo-300" : day ? "hover:bg-gray-50" : ""}
              `}
            >
              {day && (
                <>
                  <span className={`text-xs ${isToday ? "text-white font-semibold" : "text-gray-700"}`}>{day}</span>
                  {event && !isToday && <span className={`absolute bottom-1 w-1 h-1 rounded-full ${dotColor[event.type]}`} />}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day popup */}
      {selectedDay && calendarEvents[selectedDay] && (
        <div className={`mt-3 p-2.5 rounded-lg border text-xs
          ${calendarEvents[selectedDay].type === "high" ? "bg-red-50 border-red-100 text-red-700" :
            calendarEvents[selectedDay].type === "medium" ? "bg-amber-50 border-amber-100 text-amber-700" :
            "bg-green-50 border-green-100 text-green-700"}
        `}>
          <span className="font-medium">June {selectedDay}:</span> {calendarEvents[selectedDay].label}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /><span className="text-[11px] text-gray-500">High</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /><span className="text-[11px] text-gray-500">Medium</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /><span className="text-[11px] text-gray-500">Low</span></div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">{dateStr}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Welcome back, <span className="font-medium text-gray-800">Admin</span></span>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            ↓ Export
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const isUp = s.deltaType === "up";
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center`}>
                  <Icon size={15} className={s.iconColor} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${isUp ? "text-green-600" : "text-red-500"}`}>
                  {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {s.delta}
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              <p className="text-[11px] text-gray-300 mt-0.5">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
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

      {/* Calendar + Activity */}
      <div className="grid grid-cols-3 gap-4">
        <MiniCalendar />
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest platform events</p>
            </div>
            <button
              onClick={() => navigate("/admin/reports")}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View all →
            </button>
          </div>
          <div className="space-y-1">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
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