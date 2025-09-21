import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { useDashboardStore } from '@/store/dashboardStore';

export function RevenueChart() {
  const { revenueData } = useDashboardStore();

  const currentWeekTotal = 58211;
  const previousWeekTotal = 58768;

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Revenue</h3>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1" />
            <span className="text-muted-foreground">Current Week</span>
            <span className="font-semibold">${currentWeekTotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">Previous Week</span>
            <span className="font-semibold">${previousWeekTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(var(--chart-1))' }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              strokeDasharray="8 8"
              dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}