import { Bell, Globe, ExternalLink, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminHeader() {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      {/* Company Name */}
      <div className="flex items-center">
        <span className="text-lg font-medium text-foreground">北京文化有限公司0802</span>
      </div>
      
      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索..."
            className="w-64 pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
        
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>
        
        {/* Language */}
        <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Globe className="h-4 w-4" />
          <span className="text-sm">中文</span>
        </button>
        
        {/* External Link */}
        <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <span className="text-sm">前往网页客户端</span>
          <ExternalLink className="h-4 w-4" />
        </button>
        
        {/* User Avatar */}
        <button className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center hover:border-primary/50 transition-colors">
          <User className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
