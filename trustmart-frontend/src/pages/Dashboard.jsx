import { Users, Package, CreditCard, Flag } from "lucide-react";
import StatsCard from "../components/StatsCard";
import { WeeklyUsersChart, CategoryPieChart } from "../components/Charts";

const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard
          label="Total Users"
          value="24,381"
          delta="↑ 12% this month"
          deltaType="up"
          icon={Users}
          iconColor="text-blue-500"