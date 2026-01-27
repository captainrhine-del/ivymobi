import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function QuickActionCard({ icon: Icon, label, onClick, className }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border",
        "hover:shadow-card-hover hover:border-primary/20 transition-all duration-200",
        "group cursor-pointer",
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-admin-icon-bg flex items-center justify-center group-hover:scale-105 transition-transform">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </button>
  );
}
