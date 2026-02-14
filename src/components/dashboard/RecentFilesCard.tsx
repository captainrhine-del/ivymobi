import { useState } from "react";
import { FileText, FileSpreadsheet, FileImage, File, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentFile {
  name: string;
  type: string;
  updatedAt: string;
}

const recentFiles: RecentFile[] = [
  { name: "CABS4000V_电脑化胶装联动线.pdf", type: "PDF", updatedAt: "2026/01/19" },
  { name: "BQ-270VC_无线胶装机.pdf", type: "PDF", updatedAt: "2026/01/19" },
  { name: "SB-07_7夹式无线胶订机-1.pdf", type: "PDF", updatedAt: "2026/01/19" },
  { name: "BQ-280PUR_单夹PUR无线胶订机.pdf", type: "PDF", updatedAt: "2026/01/19" },
  { name: "BQ-500 配置清单 测试用.xls", type: "XLSX", updatedAt: "2026/01/19" },
  { name: "DCS400 操作手册.pdf", type: "PDF", updatedAt: "2026/01/13" },
  { name: "UNECE.pdf", type: "PDF", updatedAt: "2025/05/29" },
  { name: "产品宣传册2026.pdf", type: "PDF", updatedAt: "2025/04/15" },
];

const typeIconMap: Record<string, { icon: typeof FileText; color: string }> = {
  PDF: { icon: FileText, color: "text-red-500 bg-red-50 dark:bg-red-950/30" },
  XLSX: { icon: FileSpreadsheet, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
  XLS: { icon: FileSpreadsheet, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
  PNG: { icon: FileImage, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
  JPG: { icon: FileImage, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
};

function getFileIcon(type: string) {
  return typeIconMap[type] || { icon: File, color: "text-muted-foreground bg-muted" };
}

export function RecentFilesCard() {
  const [expanded, setExpanded] = useState(false);
  const displayFiles = expanded ? recentFiles : recentFiles.slice(0, 5);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
      <h3 className="text-lg font-semibold text-foreground mb-4">最近更新的文件</h3>
      <div className="space-y-2">
        {displayFiles.map((file, i) => {
          const { icon: Icon, color } = getFileIcon(file.type);
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.type} · {file.updatedAt}</p>
              </div>
            </div>
          );
        })}
      </div>
      {recentFiles.length > 5 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3 text-muted-foreground"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>收起 <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>展开全部 ({recentFiles.length}) <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      )}
    </div>
  );
}
