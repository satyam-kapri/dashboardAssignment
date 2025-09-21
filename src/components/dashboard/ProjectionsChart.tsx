import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useDashboardStore } from "@/store/dashboardStore";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Renders a stacked bar where:
 *  - bottom = actual
 *  - top    = projected - actual (only when projected > actual)
 *
 * chartData expected shape: { name: string, actual: number, projected: number }[]
 */
export function ProjectionsChart() {
  const { chartData } = useDashboardStore();
  const { theme } = useTheme();

  const data = useMemo(
    () =>
      (chartData ?? []).map((d: any) => ({
        ...d,
        actual: Number(d.actual ?? 0),
        projDiff: Math.max(Number(d.projected ?? 0) - Number(d.actual ?? 0), 0),
      })),
    [chartData]
  );

  const tickFormatter = (v: number) => {
    if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(0)}M`;
    if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
    return `${v}`;
  };

  const actualColor = theme === "dark" ? "#60A5FA" : "#9FBBD0";
  const projColor = theme === "dark" ? "#3B82F6" : "#DDEBF6";
  const gridStrokeColor = theme === "dark" ? "#4B5563" : "#dcf1ff";
  const axisLineStrokeColor = theme === "dark" ? "#6B7280" : "#b0b0b0";
  const tickFillColor = theme === "dark" ? "#9CA3AF" : "#9aa1a8";

  return (
    <div className="rounded-2xl bg-slate-100 bg-card p-5 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-foreground">
          Projections vs Actuals
        </h3>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid stroke={gridStrokeColor} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: axisLineStrokeColor, strokeWidth: 1 }}
              tickLine={false}
              tick={{ fontSize: 12, fill: tickFillColor }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: tickFillColor }}
              tickFormatter={tickFormatter}
            />

            <Bar
              dataKey="actual"
              stackId="stack"
              fill={actualColor}
              radius={[0, 0, 0, 0]}
            />

            <Bar
              dataKey="projDiff"
              stackId="stack"
              fill={projColor}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
