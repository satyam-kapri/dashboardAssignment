"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "@/components/ThemeProvider";

export function TotalSalesChart() {
  const { theme } = useTheme();

  const salesData = [
    {
      name: "Direct",
      value: 300.56,
      color: theme === "dark" ? "#60A5FA" : "#000000",
    },
    {
      name: "Affiliate",
      value: 135.18,
      color: theme === "dark" ? "#3B82F6" : "#A7F3D0",
    },
    {
      name: "Sponsored",
      value: 154.02,
      color: theme === "dark" ? "#2563EB" : "#93C5FD",
    },
    {
      name: "E-mail",
      value: 48.96,
      color: theme === "dark" ? "#1D4ED8" : "#BAE6FD",
    },
  ];

  // Custom tooltip bubble
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percent = (
        (payload[0].value /
          salesData.reduce((sum, entry) => sum + entry.value, 0)) *
        100
      ).toFixed(1);

      return (
        <div className="px-2 py-1 rounded-md bg-gray-800 text-white text-xs font-medium shadow">
          {percent}%
        </div>
      );
    }
    return null;
  };

  const strokeColor = theme === "dark" ? "#1F2937" : "#ffffff";
  const textColor = theme === "dark" ? "#E5E7EB" : "#4B5563";

  return (
    <div className="bg-slate-100 rounded-2xl p-6 dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-2">Total Sales</h3>

      {/* Donut Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke={strokeColor}
              strokeWidth={4}
              cornerRadius={10} // 👈 Rounded corners here
            >
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
              wrapperStyle={{ outline: "none" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-3 mt-3">
        {salesData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-700 dark:text-gray-300">
                {item.name}
              </span>
            </div>
            <span className="font-semibold">${item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
