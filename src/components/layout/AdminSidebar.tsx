import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Home,
  Package,
  FileText,
  Briefcase,
  Megaphone,
  Users,
  BarChart3,
  Smartphone,
  Grid3X3,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "首页", href: "/" },
  { icon: Package, label: "产品管理", href: "/products" },
  { icon: FileText, label: "资讯管理", href: "/information" },
  { icon: Briefcase, label: "公司资料", href: "/company" },
  { icon: Megaphone, label: "活动", href: "/activities" },
  { icon: Users, label: "成员管理", href: "/members" },
  { icon: BarChart3, label: "数据统计", href: "/statistics" },
  { icon: Smartphone, label: "专属小程序", href: "/miniprogram" },
  { icon: Grid3X3, label: "智能样本", href: "/samples" },
  { icon: Bell, label: "通知管理", href: "/notifications" },
  { icon: Settings, label: "设置", href: "/settings" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-20 bg-card border-r border-border flex flex-col items-center py-4 shrink-0">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href || 
          (item.href !== "/" && location.pathname.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full py-3 px-2 text-xs transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn("h-5 w-5 mb-1", isActive && "text-primary")} />
            <span className="text-center leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
