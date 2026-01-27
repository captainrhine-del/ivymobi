import { AdminLayout } from "@/components/layout/AdminLayout";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { AccountInfoCard } from "@/components/dashboard/AccountInfoCard";
import {
  Upload,
  UserPlus,
  CalendarPlus,
  Users,
  ArrowUpCircle,
  Link2,
} from "lucide-react";

const quickActions = [
  { icon: Upload, label: "上传公司资料" },
  { icon: UserPlus, label: "邀请成员" },
  { icon: CalendarPlus, label: "创建活动" },
  { icon: Users, label: "查看潜在客户" },
  { icon: ArrowUpCircle, label: "版本升级/扩容" },
  { icon: Link2, label: "专属小程序" },
];

const stats = [
  { label: "潜在客户总数", value: 0 },
  { label: "资料浏览总数", value: 0 },
  { label: "感兴趣总数", value: 0 },
  { label: "分享总数", value: 0 },
  { label: "下载总数", value: 0 },
  { label: "访问活动总数", value: 0 },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Quick Start Section */}
        <div>
          <h2 className="text-lg font-medium text-foreground mb-4">快速开始</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                icon={action.icon}
                label={action.label}
              />
            ))}
          </div>
        </div>

        {/* Account Info & Data Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AccountInfoCard
            teamName="北京文化有限公司0802"
            version="企业版"
            daysRemaining={1496}
            teamMembers={22}
            storage="51.24 GB"
            bandwidth="763.52 GB"
          />

          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">数据概览</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
