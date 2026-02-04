import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  gradient?: "blue" | "green" | "purple" | "orange" | "pink";
  className?: string;
}

const gradientStyles = {
  blue: "from-[hsl(209,100%,55%)] to-[hsl(209,100%,70%)]",
  green: "from-[hsl(142,76%,36%)] to-[hsl(142,76%,50%)]",
  purple: "from-[hsl(280,100%,55%)] to-[hsl(280,100%,70%)]",
  orange: "from-[hsl(25,95%,53%)] to-[hsl(25,95%,65%)]",
  pink: "from-[hsl(330,81%,60%)] to-[hsl(330,81%,75%)]",
};

export function StatisticsCard({
  title,
  value,
  change,
  changeLabel = "较上周期",
  icon: Icon,
  gradient = "blue",
  className,
}: StatisticsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-transform hover:scale-[1.02]",
        "bg-gradient-to-br",
        gradientStyles[gradient],
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-white/10" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">{title}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          </div>
          {Icon && (
            <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>

        {change !== undefined && (
          <div className="mt-3 flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {isPositive ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-white/70">{changeLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
