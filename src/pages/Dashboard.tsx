"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProjectionsChart } from "@/components/dashboard/ProjectionsChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RevenueByLocation } from "@/components/dashboard/RevenueByLocation";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { TotalSalesChart } from "@/components/dashboard/TotalSalesChart";
import { useDashboardStore } from "@/store/dashboardStore";

export default function Dashboard() {
  const { stats } = useDashboardStore();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            eCommerce
          </h1>
        </div>
      </div>

      {/* Stats & Projections - SAME ROW */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Stats Cards - left side */}
        <div className="grid grid-cols-2 gap-6 lg:col-span-2">
          <StatsCard
            title="Customers"
            value={stats.customers.value}
            change={stats.customers.change}
            trend={stats.customers.trend}
            className="bg-sky-100 dark:bg-blue-900/20"
          />
          <StatsCard
            title="Orders"
            value={stats.orders.value}
            change={stats.orders.change}
            trend={stats.orders.trend}
            className="bg-slate-100 dark:bg-gray-700"
          />
          <StatsCard
            title="Revenue"
            value={`$${stats.revenue.value}`}
            change={stats.revenue.change}
            trend={stats.revenue.trend}
            className="bg-slate-100 dark:bg-gray-700"
          />
          <StatsCard
            title="Growth"
            value={`${stats.growth.value}%`}
            change={stats.growth.change}
            trend={stats.growth.trend}
            className="bg-slate-200 dark:bg-blue-900/40"
          />
        </div>

        {/* Projections chart - right side */}
        <div className="lg:col-span-2">
          <ProjectionsChart />
        </div>
      </div>

      {/* Revenue & Location */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <RevenueChart />
        </div>
        <RevenueByLocation />
      </div>

      {/* Products & Total Sales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <ProductsTable />
        </div>
        <TotalSalesChart />
      </div>
    </div>
  );
}
