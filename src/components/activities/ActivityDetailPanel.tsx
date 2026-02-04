import { Button } from "@/components/ui/button";

interface Activity {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  expiresAt: string;
  contactPhone: string;
  contactEmail: string;
}

interface ActivityDetailPanelProps {
  activity: Activity;
  onClose: () => void;
}

export function ActivityDetailPanel({ activity }: ActivityDetailPanelProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Activity Name */}
      <h2 className="text-xl font-semibold text-foreground">{activity.name}</h2>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex">
          <span className="text-muted-foreground w-20 shrink-0">类型</span>
          <span className="text-foreground">{activity.type}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground w-20 shrink-0">状态</span>
          <span className="text-foreground">{activity.status}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground w-20 shrink-0">创建时间</span>
          <span className="text-foreground">{activity.createdAt} 11:58:14</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground w-20 shrink-0">到期时间</span>
          <span className="text-foreground">{activity.expiresAt}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground w-20 shrink-0">联系电话</span>
          <span className="text-foreground">{activity.contactPhone}</span>
        </div>
        <div className="flex">
          <span className="text-muted-foreground w-20 shrink-0">联系邮箱</span>
          <span className="text-foreground">{activity.contactEmail}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          修改活动
        </Button>
        <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          删除
        </Button>
      </div>

      {/* Share Section */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-foreground">分享方式</h3>
        
        <div className="flex gap-4">
          {/* Mini Program QR */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center border border-border">
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <rect x="10" y="10" width="30" height="30" fill="currentColor" className="text-foreground" />
                <rect x="60" y="10" width="30" height="30" fill="currentColor" className="text-foreground" />
                <rect x="10" y="60" width="30" height="30" fill="currentColor" className="text-foreground" />
                <rect x="45" y="45" width="10" height="10" fill="currentColor" className="text-foreground" />
                <rect x="60" y="60" width="15" height="15" fill="currentColor" className="text-foreground" />
                <rect x="80" y="60" width="10" height="30" fill="currentColor" className="text-foreground" />
                <rect x="60" y="80" width="15" height="10" fill="currentColor" className="text-foreground" />
              </svg>
            </div>
            <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              下载小程序码
            </Button>
          </div>

          {/* Web QR */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center border border-border">
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <rect x="10" y="10" width="25" height="25" fill="currentColor" className="text-foreground" />
                <rect x="65" y="10" width="25" height="25" fill="currentColor" className="text-foreground" />
                <rect x="10" y="65" width="25" height="25" fill="currentColor" className="text-foreground" />
                <rect x="40" y="10" width="5" height="5" fill="currentColor" className="text-foreground" />
                <rect x="50" y="15" width="5" height="5" fill="currentColor" className="text-foreground" />
                <rect x="40" y="40" width="20" height="20" fill="currentColor" className="text-foreground" />
                <rect x="65" y="45" width="10" height="10" fill="currentColor" className="text-foreground" />
                <rect x="80" y="65" width="10" height="25" fill="currentColor" className="text-foreground" />
                <rect x="65" y="75" width="10" height="10" fill="currentColor" className="text-foreground" />
              </svg>
            </div>
            <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              下载二维码
            </Button>
          </div>
        </div>

        {/* Copy Link Button */}
        <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          复制网页链接
        </Button>
      </div>
    </div>
  );
}
