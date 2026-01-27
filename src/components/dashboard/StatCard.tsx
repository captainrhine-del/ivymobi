import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number | string;
  change?: string;
  className?: string;
}

export function StatCard({ label, value, change = "+0", className }: StatCardProps) {
  return (
    <div className={cn("bg-card rounded-xl border border-border p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <HelpCircle className="h-4 w-4 text-muted-foreground/50" />
      </div>
      
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{change}</span>
        </div>
        
        {/* Mini bar chart */}
        <div className="flex items-end gap-0.5 h-8">
          {[40, 60, 35, 80, 55, 70, 45, 90, 65, 50].map((height, i) => (
            <div
              key={i}
              className="w-1.5 bg-admin-chart-bar rounded-t-sm"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
