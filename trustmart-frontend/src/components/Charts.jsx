import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  Legend, Area, AreaChart,
} from "recharts";
import { analyticsData } from "../data/mockData";

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#EC4899", "#F59E0B"];

//weeklyuserschart//
export const WeeklyUsersChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={analyticsData.weeklyUsers} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          formatter={(value) => [value, "Users"]}
        />
        <Area type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={2.5} fill="url(#areaGradient)"
          dot={{ r: 4, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const CategoryPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={analyticsData.categoryBreakdown}
          cx="40%" cy="50%"
          innerRadius={60} outerRadius={90}
          paddingAngle={3} dataKey="value"
        >
          {analyticsData.categoryBreakdown.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }}
          formatter={(value) => [`${value}%`, "Share"]}
        />
        <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
};