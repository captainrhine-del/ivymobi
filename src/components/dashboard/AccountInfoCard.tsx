import { cn } from "@/lib/utils";
import { Building2, Crown, Clock, Users, HardDrive, Wifi } from "lucide-react";

interface AccountInfoCardProps {
  teamName: string;
  version: string;
  daysRemaining: number;
  teamMembers: number;
  storage: string;
  bandwidth: string;
  className?: string;
}

export function AccountInfoCard({
  teamName,
  version,
  daysRemaining,
  teamMembers,
  storage,
  bandwidth,
  className,
}: AccountInfoCardProps) {
  const items = [
    { label: "团队名称", value: teamName, icon: Building2, color: "text-blue-500" },
    { label: "当前版本", value: version, isLink: true, icon: Crown, color: "text-amber-500" },
    { label: "剩余天数", value: daysRemaining, icon: Clock, color: "text-violet-500" },
    { label: "团队成员", value: teamMembers, icon: Users, color: "text-emerald-500" },
    { label: "文件空间", value: storage, icon: HardDrive, color: "text-rose-500" },
    { label: "文件流量", value: bandwidth, icon: Wifi, color: "text-indigo-500" },
  ];

  return (
    <div className={cn("bg-card rounded-2xl border border-border p-6 relative overflow-hidden", className)}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />
      <h3 className="text-lg font-semibold text-foreground mb-4">账户信息</h3>
      
      <div className="space-y-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0 group hover:bg-muted/30 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center gap-2.5">
              <item.icon className={cn("h-4 w-4", item.color)} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            {item.isLink ? (
              <span className="text-sm text-primary cursor-pointer hover:underline font-medium">{item.value}</span>
            ) : (
              <span className="text-sm text-foreground font-semibold">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
