import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProjectionsChart } from '@/components/dashboard/ProjectionsChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RevenueByLocation } from '@/components/dashboard/RevenueByLocation';
import { ProductsTable } from '@/components/dashboard/ProductsTable';
import { TotalSalesChart } from '@/components/dashboard/TotalSalesChart';
import { useDashboardStore } from '@/store/dashboardStore';

export default function Dashboard() {
  const { stats } = useDashboardStore();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">eCommerce</h1>
          <p className="text-muted-foreground">Overview of your online store performance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Customers"
          value={stats.customers.value}
          change={stats.customers.change}
          trend={stats.customers.trend}
          className="bg-primary-light/10"
        />
        <StatsCard
          title="Orders"
          value={stats.orders.value}
          change={stats.orders.change}
          trend={stats.orders.trend}
        />
        <StatsCard
          title="Revenue"
          value={`$${stats.revenue.value}`}
          change={stats.revenue.change}
          trend={stats.revenue.trend}
        />
        <StatsCard
          title="Growth"
          value={`${stats.growth.value}%`}
          change={stats.growth.change}
          trend={stats.growth.trend}
          className="bg-success/5"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectionsChart />
        <RevenueChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductsTable />
        </div>
        <div className="space-y-6">
          <RevenueByLocation />
          <TotalSalesChart />
        </div>
      </div>
    </div>
  );
}