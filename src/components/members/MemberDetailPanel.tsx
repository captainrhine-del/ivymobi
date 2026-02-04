import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Ban, Pencil } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  groupId: string;
  avatar?: string;
  department?: string;
  position?: string;
  status?: string;
  groups?: string[];
  receiveNotifications?: boolean;
}

interface MemberDetailPanelProps {
  member: Member | null;
  groupName?: string;
}

export function MemberDetailPanel({ member, groupName }: MemberDetailPanelProps) {
  if (!member) {
    return (
      <div className="w-[320px] border-l border-border bg-card flex items-center justify-center">
        <p className="text-muted-foreground">选择成员查看详情</p>
      </div>
    );
  }

  return (
    <div className="w-[320px] border-l border-border bg-card flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-medium text-foreground">成员详情</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 h-8 px-2">
            <Trash2 className="h-4 w-4" />
            删除
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 gap-1 h-8 px-3">
            <Ban className="h-4 w-4" />
            停用
          </Button>
          <Button size="sm" className="gap-1 h-8 px-3">
            <Pencil className="h-4 w-4" />
            编辑
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Personal Info Section */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-4">个人信息</h3>
            
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24 border-2 border-border">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name */}
            <h4 className="text-xl font-semibold text-foreground text-center mb-6">
              {member.name}
            </h4>

            {/* Info Grid */}
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-sm text-muted-foreground w-16 shrink-0">手机号</span>
                <span className="text-sm text-foreground font-medium">{member.phone}</span>
              </div>
              <div className="flex items-start">
                <span className="text-sm text-muted-foreground w-16 shrink-0">邮箱</span>
                <span className="text-sm text-foreground font-medium break-all">{member.email}</span>
              </div>
              <div className="flex items-start">
                <span className="text-sm text-muted-foreground w-16 shrink-0">部门</span>
                <span className="text-sm text-foreground">{member.department || "-"}</span>
              </div>
              <div className="flex items-start">
                <span className="text-sm text-muted-foreground w-16 shrink-0">职位</span>
                <span className="text-sm text-foreground font-medium">{member.position || "-"}</span>
              </div>
              <div className="flex items-start">
                <span className="text-sm text-muted-foreground w-16 shrink-0">状态</span>
                <span className="text-sm text-foreground">{member.status || "已激活"}</span>
              </div>
              <div className="flex items-start">
                <span className="text-sm text-muted-foreground w-16 shrink-0">群组</span>
                <div className="flex flex-wrap gap-1">
                  {(member.groups || [groupName]).filter(Boolean).map((group, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-sm text-muted-foreground w-16 shrink-0">接收通知</span>
                <span className="text-sm text-foreground">
                  {member.receiveNotifications !== undefined 
                    ? (member.receiveNotifications ? "是" : "否") 
                    : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Team Info Section */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-4">团队信息</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <span className="text-sm text-muted-foreground w-16 shrink-0">LOGO</span>
                <div className="w-16 h-16 border border-border rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 bg-primary rounded" />
                    <span className="text-xs font-medium text-foreground">样本通</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-sm text-muted-foreground w-16 shrink-0">公司名称</span>
                <span className="text-sm text-foreground">北京品冠天成科技有限公司</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
