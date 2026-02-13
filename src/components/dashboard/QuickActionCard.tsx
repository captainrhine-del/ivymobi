import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  gradient?: string;
}

export function QuickActionCard({ icon: Icon, label, onClick, className, gradient = "from-primary to-primary" }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border",
        "hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-all duration-300",
        "group cursor-pointer relative overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300" />
      <div className={cn(
        "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center",
        "group-hover:scale-110 group-hover:shadow-lg transition-all duration-300",
        gradient
      )}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <span className="text-sm font-medium text-foreground relative z-10">{label}</span>
    </button>
  );
}
