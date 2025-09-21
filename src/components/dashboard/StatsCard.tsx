import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  trend,
  className,
}: StatsCardProps) {
  const isPositive = trend === "up";
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "text-gray-200" : "text-black-500";
  const valueColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <div
      className={cn(
        "rounded-2xl p-6 bg-white hover:shadow-md transition-shadow dark:bg-gray-800",
        className
      )}
    >
      <div className="flex flex-col space-y-3">
        {/* Title */}
        <p className={cn("text-sm font-medium", textColor)}>{title}</p>

        {/* Value + Change */}
        <div className="flex items-center justify-between">
          <p className={cn("text-2xl font-bold tracking-tight", valueColor)}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          <div
            className={cn(
              "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-black dark:text-white"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositive ? "+" : ""}
            {change.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
