import { useState } from "react";
import { Users, Package, CreditCard, Flag, ArrowUpRight, ArrowDownRight, ShieldAlert, CheckCircle, Clock, AlertTriangle, Plus, FileCheck, BarChart2 } from "lucide-react";
import { WeeklyUsersChart, CategoryPieChart } from "../components/Charts";
import { useNavigate } from "react-router-dom";

// ─── Data ───────────────────────────────────────────────
const stats = [
  {
    label: "Total Users", value: "24,381", delta: "+8.2%", deltaType: "up",
    icon: Users, iconBg: "bg-blue-50", iconColor: "text-blue-500",
    extra1: "Active today: 1,234", extra2: "New this week: 312",
  },
  {
    label: "Total Listings", value: "8,742", delta: "+5.1%", deltaType: "up",
    icon: Package, iconBg: "bg-purple-50", iconColor: "text-purple-500",
    extra1: "Pending: 42", extra2: "Approved: 8,200",
  },
  {
    label: "Total Revenue", value: "₹3.2M", delta: "+23%", deltaType: "up",
    icon: CreditCard, iconBg: "bg-green-50", iconColor: "text-green-500",
    extra1: "This week: ₹84K", extra2: "Today: ₹12K",
  },
  {
    label: "Open Reports", value: "47", delta: "+3", deltaType: "down",
    icon: Flag, iconBg: "bg-red-50", iconColor: "text-red-500",
    extra1: "High priority: 5", extra2: "Resolved today: 18",
  },
];

const recentActivity = [
  { emoji: "🔵", text: "New user registered: priya.s@email.com", time: "5 min ago", color: "bg-blue-50", textColor: "text-blue-600" },
  { emoji: "🟡", text: "New listing pending review: iPhone 14 Pro", time: "12 min ago", color: "bg-amber-50", textColor: "text-amber-600" },
  { emoji: "🔴", text: "Fraud alert: suspicious pricing pattern detected", time: "30 min ago", color: "bg-red-50", textColor: "text-red-600" },
  { emoji: "🟢", text: "Listing approved: Dell XPS 13 Laptop", time: "1 hour ago", color: "bg-green-50", textColor: "text-green-600" },
  { emoji: "🔴", text: "Report received for listing #5432", time: "2 hours ago", color: "bg-red-50", textColor: "text-red-600" },
  { emoji: "🔵", text: "User Amit Mishra flagged for review", time: "3 hours ago", color: "bg-blue-50", textColor: "text-blue-600" },
];

const topCategories = [
  { name: "Electronics", listings: 3200, color: "bg-blue-500", pct: 88 },
  { name: "Vehicles", listings: 2100, color: "bg-green-500", pct: 58 },
  { name: "Furniture", listings: 1574, color: "bg-purple-500", pct: 43 },
  { name: "Phones", listings: 1311, color: "bg-pink-500", pct: 36 },
  { name: "Clothing", listings: 542, color: "bg-amber-500", pct: 15 },
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

const dotColor = { high: "bg-red-400", medium: "bg-amber-400", low: "bg-green-400" };

// ─── Mini Calendar ───────────────────────────────────────
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
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
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
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => {
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isSelected = day === selectedDay;
          const event = calendarEvents[day];
          return (
            <div
              key={i}
              onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
              className={`relative flex flex-col items-center justify-center h-8 rounded-lg transition-all
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
      {selectedDay && calendarEvents[selectedDay] && (
        <div className={`mt-3 p-2.5 rounded-lg border text-xs
          ${calendarEvents[selectedDay].type === "high" ? "bg-red-50 border-red-100 text-red-700" :
            calendarEvents[selectedDay].type === "medium" ? "bg-amber-50 border-amber-100 text-amber-700" :
            "bg-green-50 border-green-100 text-green-700"}
        `}>
          <span className="font-medium">June {selectedDay}:</span> {calendarEvents[selectedDay].label}
        </div>
      )}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /><span className="text-[11px] text-gray-500">High</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /><span className="text-[11px] text-gray-500">Medium</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /><span className="text-[11px] text-gray-500">Low</span></div>
      </div>
    </div>
  );
};

// ─── Dashboard ───────────────────────────────────────────
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
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors">
            ↓ Export
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 font-medium">Quick actions:</span>
        <button onClick={() => navigate("/admin/categories")} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition-colors">
          <Plus size={12} /> Add Category
        </button>
        <button onClick={() => navigate("/admin/listings")} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs hover:bg-gray-50 transition-colors">
          <FileCheck size={12} /> Approve Listings
        </button>
        <button onClick={() => navigate("/admin/reports")} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs hover:bg-gray-50 transition-colors">
          <Flag size={12} /> View Reports
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs hover:bg-gray-50 transition-colors">
          <BarChart2 size={12} /> Export Data
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const isUp = s.deltaType === "up";
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
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
              <div className="mt-2 pt-2 border-t border-gray-100 space-y-0.5">
                <p className="text-[11px] text-gray-500">{s.extra1}</p>
                <p className="text-[11px] text-gray-400">{s.extra2}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending Actions + Fraud Preview + Verification */}
      <div className="grid grid-cols-3 gap-4">

        {/* Pending Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800">⭐ Pending Actions</h3>
            <p className="text-xs text-gray-400 mt-0.5">Requires your attention</p>
          </div>
          <div className="space-y-3">
            <div onClick={() => navigate("/admin/listings")} className="flex items-center justify-between p-2.5 bg-amber-50 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-amber-600" />
                <span className="text-xs text-amber-800">Listing Approvals</span>
              </div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-200 px-2 py-0.5 rounded-full">42</span>
            </div>
            <div onClick={() => navigate("/admin/reports")} className="flex items-center justify-between p-2.5 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
              <div className="flex items-center gap-2">
                <Flag size={14} className="text-red-500" />
                <span className="text-xs text-red-800">Pending Reports</span>
              </div>
              <span className="text-xs font-semibold text-red-700 bg-red-200 px-2 py-0.5 rounded-full">18</span>
            </div>
            <div onClick={() => navigate("/admin/users")} className="flex items-center justify-between p-2.5 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-purple-500" />
                <span className="text-xs text-purple-800">Flagged Users</span>
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-200 px-2 py-0.5 rounded-full">7</span>
            </div>
            <div onClick={() => navigate("/admin/fraud")} className="flex items-center justify-between p-2.5 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors">
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-orange-500" />
                <span className="text-xs text-orange-800">Fraud Alerts</span>
              </div>
              <span className="text-xs font-semibold text-orange-700 bg-orange-200 px-2 py-0.5 rounded-full">12</span>
            </div>
          </div>
        </div>

        {/* Fraud Monitoring Preview */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">🛡️ Fraud Alerts</h3>
              <p className="text-xs text-gray-400 mt-0.5">Active threats overview</p>
            </div>
            <button onClick={() => navigate("/admin/fraud")} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">View all →</button>
          </div>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-400 mt-1">Total active alerts</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /><span className="text-xs text-gray-600">High Risk</span></div>
              <span className="text-xs font-semibold text-red-600">3</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-red-400 h-1.5 rounded-full" style={{ width: "25%" }} /></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /><span className="text-xs text-gray-600">Medium Risk</span></div>
              <span className="text-xs font-semibold text-amber-600">5</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-amber-400 h-1.5 rounded-full" style={{ width: "42%" }} /></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /><span className="text-xs text-gray-600">Low Risk</span></div>
              <span className="text-xs font-semibold text-green-600">4</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-green-400 h-1.5 rounded-full" style={{ width: "33%" }} /></div>
          </div>
        </div>

        {/* User Verification */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800">✅ User Verification</h3>
            <p className="text-xs text-gray-400 mt-0.5">Trust & safety overview</p>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F3F4F6" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6366F1" strokeWidth="3"
                  strokeDasharray="77.5 22.5" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-900">77%</span>
                <span className="text-[10px] text-gray-400">verified</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2"><CheckCircle size={13} className="text-green-500" /><span className="text-xs text-gray-700">Verified Users</span></div>
              <span className="text-xs font-semibold text-green-700">18,200</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2"><AlertTriangle size={13} className="text-gray-400" /><span className="text-xs text-gray-700">Unverified</span></div>
              <span className="text-xs font-semibold text-gray-600">6,181</span>
            </div>
          </div>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-800">User Growth</h3>
            <p className="text-xs text-gray-400 mt-0.5">New registrations — last 7 days</p>
          </div>
          <WeeklyUsersChart />
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Listings by Category</h3>
            <p className="text-xs text-gray-400 mt-0.5">Current distribution</p>
          </div>
          <CategoryPieChart />
        </div>
      </div>

      {/* Top Categories Table + Calendar + Activity */}
      <div className="grid grid-cols-3 gap-4">

        {/* Top Categories */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800">Top Categories</h3>
            <p className="text-xs text-gray-400 mt-0.5">By listing count</p>
          </div>
          <div className="space-y-3">
            {topCategories.map((cat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700">{cat.name}</span>
                  <span className="text-xs font-medium text-gray-600">{cat.listings.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`${cat.color} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <MiniCalendar />

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
              <p className="text-xs text-gray-400 mt-0.5">Latest platform events</p>
            </div>
            <button onClick={() => navigate("/admin/reports")} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
              View all →
            </button>
          </div>
          <div className="space-y-1">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-xs flex-shrink-0 mt-0.5`}>
                  {item.emoji}
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