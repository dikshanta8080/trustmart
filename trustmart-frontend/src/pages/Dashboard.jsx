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
          />
        <StatsCard
          label="Active Listings"
          value="8,742"
          delta="↑ 8% this month"
          deltaType="up"
          icon={Package}
          iconColor="text-green-500"
        />
        <StatsCard
          label="Transactions"
          value="₹3.2M"
          delta="↑ 19% this month"
          deltaType="up"
          icon={CreditCard}
          iconColor="text-purple-500"
        />
        <StatsCard
          label="Open Reports"
          value="47"
          delta="↑ 3 today"
          deltaType="down"
          icon={Flag}
          iconColor="text-red-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <WeeklyUsersChart />
        <CategoryPieChart />
      </div>

    </div>
  );
};

export default Dashboard;