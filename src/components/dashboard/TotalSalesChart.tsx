import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const salesData = [
  { name: 'Direct', value: 300.56, color: 'hsl(var(--chart-1))' },
  { name: 'Affiliate', value: 135.18, color: 'hsl(var(--chart-3))' },
  { name: 'Sponsored', value: 154.02, color: 'hsl(var(--chart-4))' },
  { name: 'E-mail', value: 48.96, color: 'hsl(var(--chart-5))' },
];

const RADIAN = Math.PI / 180;

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function TotalSalesChart() {
  const total = salesData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Total Sales</h3>
        <div className="text-right">
          <p className="text-2xl font-bold">38.6%</p>
          <p className="text-sm text-muted-foreground">Growth</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {salesData.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <span className="text-sm font-semibold">${item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}