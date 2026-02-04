import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActivityDetailPanel } from "@/components/activities/ActivityDetailPanel";
import { EmptyActivityPanel } from "@/components/activities/EmptyActivityPanel";

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

const mockActivities: Activity[] = [
  {
    id: "1",
    name: "低压新产品",
    type: "低压新产品",
    status: "进行中",
    createdAt: "2024/04/03",
    expiresAt: "永久有效",
    contactPhone: "13764736607",
    contactEmail: "zhangcong@meach.cn",
  },
  {
    id: "2",
    name: "陈栋测试活动",
    type: "线上展会",
    status: "进行中",
    createdAt: "2023/06/28",
    expiresAt: "永久有效",
    contactPhone: "13800138000",
    contactEmail: "test@example.com",
  },
  {
    id: "3",
    name: "测试",
    type: "展会",
    status: "进行中",
    createdAt: "2023/06/28",
    expiresAt: "永久有效",
    contactPhone: "13900139000",
    contactEmail: "demo@example.com",
  },
];

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = mockActivities.filter((activity) =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Left Panel - Activity List */}
        <div className="flex-1 flex flex-col border-r border-border bg-background">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-medium text-foreground">活动管理</h1>
              <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                <Plus className="h-4 w-4 mr-1" />
                创建活动
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-9 h-9 bg-muted/50 border-0"
              />
            </div>
          </div>

          {/* Activity Table */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px]">活动名称</TableHead>
                  <TableHead className="w-[150px]">类型</TableHead>
                  <TableHead className="w-[100px]">状态</TableHead>
                  <TableHead className="w-[150px]">
                    <span className="flex items-center gap-1">
                      创建时间
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 8L2 4h8L6 8z" />
                      </svg>
                    </span>
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <span className="flex items-center gap-1">
                      到期时间
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 8L2 4h8L6 8z" />
                      </svg>
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow
                    key={activity.id}
                    className={cn(
                      "cursor-pointer",
                      selectedActivity?.id === activity.id && "bg-muted"
                    )}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <TableCell className="font-medium">{activity.name}</TableCell>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>{activity.status}</TableCell>
                    <TableCell>{activity.createdAt}</TableCell>
                    <TableCell>{activity.expiresAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Panel - Details or Empty State */}
        <div className="w-[380px] shrink-0 bg-card overflow-auto">
          {selectedActivity ? (
            <ActivityDetailPanel
              activity={selectedActivity}
              onClose={() => setSelectedActivity(null)}
            />
          ) : (
            <EmptyActivityPanel activityCount={filteredActivities.length} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
