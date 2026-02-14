import { AdminLayout } from "@/components/layout/AdminLayout";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { AccountInfoCard } from "@/components/dashboard/AccountInfoCard";
import { RecentFilesCard } from "@/components/dashboard/RecentFilesCard";
import {
  Upload,
  UserPlus,
  CalendarPlus,
  Users,
  ArrowUpCircle,
  Link2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const quickActions = [
  { icon: Upload, label: "上传公司资料", gradient: "from-blue-500 to-cyan-400", href: "/company" },
  { icon: UserPlus, label: "邀请成员", gradient: "from-violet-500 to-purple-400", href: "/members" },
  { icon: CalendarPlus, label: "创建活动", gradient: "from-orange-500 to-amber-400", href: "/activities" },
  { icon: Users, label: "查看潜在客户", gradient: "from-emerald-500 to-teal-400", href: "/statistics" },
  { icon: Link2, label: "专属小程序", gradient: "from-indigo-500 to-blue-400", href: "/miniprogram" },
  { icon: ArrowUpCircle, label: "版本升级/扩容", gradient: "from-rose-500 to-pink-400", action: "upgrade" },
];

const stats = [
  { label: "潜在客户总数", value: 128, change: "+12", color: "from-blue-500 to-cyan-500", icon: Users },
  { label: "资料浏览总数", value: 3456, change: "+234", color: "from-violet-500 to-purple-500", icon: TrendingUp },
  { label: "感兴趣总数", value: 89, change: "+8", color: "from-orange-500 to-amber-500", icon: Sparkles },
  { label: "分享总数", value: 567, change: "+45", color: "from-emerald-500 to-teal-500", icon: Link2 },
  { label: "下载总数", value: 234, change: "+18", color: "from-rose-500 to-pink-500", icon: ArrowUpCircle },
  { label: "访问活动总数", value: 78, change: "+5", color: "from-indigo-500 to-blue-500", icon: CalendarPlus },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleQuickAction = (action: typeof quickActions[number]) => {
    if (action.action === "upgrade") {
      toast.info("升级版本请拨打: 400 926 4236");
    } else if (action.href) {
      navigate(action.href);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 p-8 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2">欢迎回来 👋</h1>
            <p className="text-white/80 text-sm">今天是您高效工作的好日子，以下是您的业务概览。</p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-20 -top-8 w-24 h-24 rounded-full bg-white/10 blur-xl" />
        </div>

        {/* Quick Start Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            快速开始
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                icon={action.icon}
                label={action.label}
                gradient={action.gradient}
                onClick={() => handleQuickAction(action)}
              />
            ))}
          </div>
        </div>

        {/* Data Overview */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            数据概览
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                label={stat.label}
                value={stat.value}
                change={`+${stat.change.replace('+', '')}`}
                gradient={stat.color}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AccountInfoCard
            teamName="北京文化有限公司0802"
            version="企业版"
            daysRemaining={1496}
            teamMembers={22}
            storage="51.24 GB"
            bandwidth="763.52 GB"
          />

          {/* Recent Files */}
          <RecentFilesCard />
        </div>
      </div>
    </AdminLayout>
  );
}
