import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { analyticsData } from "../data/mockData";

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#EC4899", "#9CA3AF"];

// Line chart — weekly new users
export const WeeklyUsersChart = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-800 mb-4">
        New Users — Last 7 Days
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={analyticsData.weeklyUsers}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #E5E7EB",
            }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 4, fill: "#3B82F6" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

