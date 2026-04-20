import { getDashboardStats } from "@/lib/service/dashboard.service";
import StatCard from "../components/dashboard/StatCard";


export default async function DashboardOverview() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Posts" value={stats.postCount} />
        <StatCard title="Total Categories" value={stats.categoryCount} />
        <StatCard title="Total Users" value={stats.userCount} />
      </div>

      {/* Future Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Next Upgrade</h2>

        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Top performing posts (by views)</li>
          <li>Recent posts</li>
          <li>Draft vs published ratio</li>
          <li>Traffic analytics (Google Analytics)</li>
        </ul>
      </div>
    </div>
  );
}