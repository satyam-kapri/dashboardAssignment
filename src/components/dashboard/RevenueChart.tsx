import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useDashboardStore } from "@/store/dashboardStore";
import { useTheme } from "@/components/ThemeProvider";

export function RevenueChart() {
  const { revenueData = [] } = useDashboardStore();
  const { theme } = useTheme();

  const currentWeekTotal = 58211;
  const previousWeekTotal = 68768; // matches header in screenshot

  const gridStrokeColor = theme === "dark" ? "#4B5563" : "#e6edf2";
  const axisLineStrokeColor = theme === "dark" ? "#6B7280" : "#cbcbcb";
  const tickFillColor = theme === "dark" ? "#9CA3AF" : "#9CA3AF";
  const currentWeekLineColor = theme === "dark" ? "#60A5FA" : "#0f172a";
  const previousWeekLineColor = theme === "dark" ? "#3B82F6" : "#8AAEE8";
  const previousWeekGradientColor = theme === "dark" ? "#3B82F6" : "#8AAEE8";

  return (
    <div className="bg-slate-100 p-6 rounded-2xl dark:bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Revenue</h3>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: currentWeekLineColor }}
            />
            <span className="text-muted-foreground">Current Week</span>
            <span className="font-semibold ml-1">
              ${currentWeekTotal.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: previousWeekLineColor }}
            />
            <span className="text-muted-foreground">Previous Week</span>
            <span className="font-semibold ml-1">
              ${previousWeekTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={revenueData} margin={{ top: 20, bottom: 10 }}>
            {/* light background grid */}
            <CartesianGrid
              stroke={gridStrokeColor}
              vertical={false}
              strokeDasharray="1 1"
            />

            <XAxis
              dataKey="name"
              axisLine={{ stroke: axisLineStrokeColor, strokeWidth: 1 }}
              tickLine={false}
              padding={{ left: 20, right: 20 }}
              tick={{ fill: tickFillColor, fontSize: 13, fontWeight: 500 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickFillColor, fontSize: 13 }}
              // no hard-coding → scale automatically to data
            />

            {/* subtle blue gradient fill under previous line */}
            <defs>
              <linearGradient id="prevGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={previousWeekGradientColor}
                  stopOpacity={0.12}
                />
                <stop
                  offset="100%"
                  stopColor={previousWeekGradientColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="previous"
              fill="url(#prevGradient)"
              stroke="none"
            />

            <Line
              type="monotone"
              dataKey="previous"
              stroke={previousWeekLineColor}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
              strokeLinecap="round"
            />

            <Line
              type="monotone"
              dataKey="current"
              stroke={currentWeekLineColor}
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6 }}
              strokeLinecap="round"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
