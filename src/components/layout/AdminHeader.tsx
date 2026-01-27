import { Bell, Globe, User } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold italic text-foreground">ivydemo</span>
        <span className="text-muted-foreground">ivydemo</span>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-4 w-4" />
          <span className="text-sm">通知</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <Globe className="h-4 w-4" />
          <span className="text-sm">中文</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-sm">前往网页客户端</span>
        </button>
        
        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
          <User className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
