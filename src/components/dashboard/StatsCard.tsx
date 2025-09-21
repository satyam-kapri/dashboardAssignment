import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  className?: string;
}

export function StatsCard({ title, value, change, trend, className }: StatsCardProps) {
  const isPositive = trend === 'up';
  
  return (
    <div className={cn("stat-card group", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
          isPositive 
            ? "text-success bg-success/10" 
            : "text-destructive bg-destructive/10"
        )}>
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}