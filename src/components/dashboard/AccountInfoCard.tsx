import { cn } from "@/lib/utils";

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
    { label: "团队名称", value: teamName },
    { label: "当前版本", value: version, isLink: true },
    { label: "剩余天数", value: daysRemaining },
    { label: "团队成员", value: teamMembers },
    { label: "文件空间", value: storage },
    { label: "文件流量", value: bandwidth },
  ];

  return (
    <div className={cn("bg-card rounded-xl border border-border p-6", className)}>
      <h3 className="text-lg font-medium text-foreground mb-4">账户信息</h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            {item.isLink ? (
              <span className="text-sm text-primary cursor-pointer hover:underline">{item.value}</span>
            ) : (
              <span className="text-sm text-foreground font-medium">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
