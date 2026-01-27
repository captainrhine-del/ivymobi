import { useLocation, Link } from "react-router-dom";
import {
  Home,
  FileText,
  Briefcase,
  Sparkles,
  Users,
  BarChart3,
  Smartphone,
  Bell,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "首页", href: "/" },
  { icon: FileText, label: "资讯管理", href: "/information" },
  { icon: Briefcase, label: "公司资料", href: "/company" },
  { icon: Sparkles, label: "活动", href: "/activities" },
  { icon: Users, label: "成员管理", href: "/members" },
  { icon: BarChart3, label: "数据统计", href: "/statistics" },
  { icon: Smartphone, label: "专属小程序", href: "/miniprogram" },
  { icon: Bell, label: "通知管理", href: "/notifications" },
  { icon: Settings, label: "设置", href: "/settings" },
];

export function AdminSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-card border-r border-border flex flex-col shrink-0 transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <FileText className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="ml-3 font-medium text-foreground">企业控制台</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/" && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>
    </aside>
  );
}
