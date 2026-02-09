import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  content: string;
  savedAt: string;
  sentAt?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "测试",
    content: "这是一条测试通知内容。",
    savedAt: "2025.04.14 13:23",
  },
  {
    id: "2",
    title: "样本通上线使用",
    content: "大家可以通过样本通去快速分享资料给自己的客户，同时可以获取有效线索。培训时间将定为下周五3点。请相关部门人员准时参加。\n\n使用手册请在公司资料-样本通使用手册中查阅。",
    savedAt: "2025.04.14 13:21",
    sentAt: "2025.04.14 13:28",
  },
];

export default function Notifications() {
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [selectedId, setSelectedId] = useState<string | null>(mockNotifications[1]?.id || null);

  const selectedNotification = notifications.find((n) => n.id === selectedId);

  const handleCreate = () => {
    console.log("Creating new notification...");
  };

  const handleDelete = () => {
    console.log("Deleting notification:", selectedId);
  };

  const handleEdit = () => {
    console.log("Editing notification:", selectedId);
  };

  const handleRevoke = () => {
    console.log("Revoking notification:", selectedId);
  };

  return (
    <AdminLayout>
      <div className="flex h-full">
        {/* Left Panel - Notification List */}
        <div className="w-[400px] border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-border">
            <h1 className="text-lg font-medium text-foreground">通知管理</h1>
            <Button onClick={handleCreate} size="sm">
              新建通知
            </Button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => setSelectedId(notification.id)}
                className={cn(
                  "p-4 border-b border-border cursor-pointer transition-colors flex items-center justify-between",
                  selectedId === notification.id
                    ? "bg-muted"
                    : "hover:bg-muted/50"
                )}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    保存：{notification.savedAt}
                  </p>
                  {notification.sentAt && (
                    <p className="text-sm text-muted-foreground">
                      发送：{notification.sentAt}
                    </p>
                  )}
                  {!notification.sentAt && (
                    <p className="text-sm text-muted-foreground">发送：</p>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 ml-2" />
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                暂无通知
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Detail View */}
        <div className="flex-1 flex flex-col">
          {selectedNotification ? (
            <>
              {/* Detail Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-medium text-foreground">
                  {selectedNotification.title}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDelete}
                  >
                    删除
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    disabled={!!selectedNotification.sentAt}
                  >
                    编辑
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleRevoke}
                    disabled={!selectedNotification.sentAt}
                  >
                    撤回
                  </Button>
                </div>
              </div>

              {/* Detail Content */}
              <div className="flex-1 p-6 overflow-auto">
                <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedNotification.content}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              请选择一条通知查看详情
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
