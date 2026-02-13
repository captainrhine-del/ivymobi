import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  change?: string;
  className?: string;
  gradient?: string;
  icon?: LucideIcon;
}

export function StatCard({ label, value, change = "+0", className, gradient = "from-primary to-primary", icon: Icon }: StatCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border p-5 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300",
      className
    )}>
      {/* Decorative gradient corner */}
      <div className={cn("absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity", gradient)} />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          {Icon && (
            <div className={cn("w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center", gradient)}>
              <Icon className="h-3.5 w-3.5 text-white" />
            </div>
          )}
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className={cn(
            "text-xs font-medium px-1.5 py-0.5 rounded-full",
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
          )}>
            {change}
          </span>
        </div>
        
        {/* Mini sparkline */}
        <div className="flex items-end gap-[3px] h-6 mt-3">
          {[35, 55, 40, 70, 50, 80, 45, 90, 60, 75, 50, 85].map((height, i) => (
            <div
              key={i}
              className={cn("w-1.5 rounded-full bg-gradient-to-t opacity-60 group-hover:opacity-100 transition-opacity", gradient)}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
