import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Upload, 
  Link, 
  FolderPlus, 
  Lock,
  ArrowRightLeft,
  Copy,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FileDetailPanel } from "@/components/company/FileDetailPanel";
import { EmptyDetailPanel } from "@/components/company/EmptyDetailPanel";

interface FileItem {
  id: string;
  name: string;
  thumbnail?: string;
  type: string;
  size: string;
  uploadTime: string;
  updateTime: string;
  isPublic: boolean;
  isShareable: boolean;
  isDownloadable: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  aiSynced: boolean;
  description: string;
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "CABS4000V_电脑化胶装联动线.pdf",
    type: "PDF",
    size: "10.86MB",
    uploadTime: "2026/01/19",
    updateTime: "2026/01/19",
    isPublic: true,
    isShareable: true,
    isDownloadable: true,
    createdAt: "2026-01-19 12:59:07",
    updatedAt: "2026-01-19 12:59:07",
    tags: [],
    aiSynced: true,
    description: "",
  },
  {
    id: "2",
    name: "BQ-270VC_无线胶装机.pdf",
    type: "PDF",
    size: "7.26MB",
    uploadTime: "2026/01/19",
    updateTime: "2026/01/19",
    isPublic: true,
    isShareable: true,
    isDownloadable: true,
    createdAt: "2026-01-19 12:59:07",
    updatedAt: "2026-01-19 12:59:07",
    tags: [],
    aiSynced: true,
    description: "",
  },
  {
    id: "3",
    name: "SB-07_7夹式无线胶订机-1.pdf",
    type: "PDF",
    size: "5.38MB",
    uploadTime: "2026/01/19",
    updateTime: "2026/01/19",
    isPublic: true,
    isShareable: true,
    isDownloadable: true,
    createdAt: "2026-01-19 12:59:07",
    updatedAt: "2026-01-19 12:59:07",
    tags: [],
    aiSynced: false,
    description: "",
  },
  {
    id: "4",
    name: "BQ-280PUR_单夹PUR无线胶订机.pdf",
    type: "PDF",
    size: "3.66MB",
    uploadTime: "2026/01/19",
    updateTime: "2026/01/19",
    isPublic: true,
    isShareable: true,
    isDownloadable: true,
    createdAt: "2026-01-19 12:59:07",
    updatedAt: "2026-01-19 12:59:07",
    tags: [],
    aiSynced: false,
    description: "",
  },
  {
    id: "5",
    name: "BQ-500 配置清单 测试用 2025.12.15.pdf",
    type: "PDF",
    size: "421.05KB",
    uploadTime: "2026/01/19",
    updateTime: "2026/01/19",
    isPublic: true,
    isShareable: true,
    isDownloadable: true,
    createdAt: "2026-01-19 12:59:07",
    updatedAt: "2026-01-19 12:59:07",
    tags: [],
    aiSynced: false,
    description: "",
  },
  {
    id: "6",
    name: "BQ-500 配置清单 测试用 2025.12.15.xls",
    type: "XLSX",
    size: "30KB",
    uploadTime: "2026/01/19",
    updateTime: "2026/01/19",
    isPublic: true,
    isShareable: true,
    isDownloadable: true,
    createdAt: "2026-01-19 12:59:07",
    updatedAt: "2026-01-19 12:59:07",
    tags: [],
    aiSynced: false,
    description: "",
  },
  {
    id: "7",
    name: "DCS400 操作手册.pdf",
    type: "PDF",
    size: "707.59KB",
    uploadTime: "2026/01/13",
    updateTime: "2026/01/13",
    isPublic: true,
    isShareable: true,
    isDownloadable: true,
    createdAt: "2026-01-13 10:30:00",
    updatedAt: "2026-01-13 10:30:00",
    tags: [],
    aiSynced: false,
    description: "",
  },
  {
    id: "8",
    name: "UNECE.pdf",
    type: "PDF",
    size: "8.47MB",
    uploadTime: "2025/05/29",
    updateTime: "2025/05/29",
    isPublic: true,
    isShareable: true,
    isDownloadable: true,
    createdAt: "2025-05-29 14:00:00",
    updatedAt: "2025-05-29 14:00:00",
    tags: [],
    aiSynced: false,
    description: "",
  },
];

export default function CompanyMaterials() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const hasSelection = selectedFiles.length > 0;
  const selectedFile = selectedFiles.length === 1 
    ? mockFiles.find(f => f.id === selectedFiles[0]) 
    : null;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(mockFiles.map(f => f.id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles([...selectedFiles, fileId]);
    } else {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    }
  };

  const isAllSelected = selectedFiles.length === mockFiles.length && mockFiles.length > 0;

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Left: File List */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-border">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h1 className="text-lg font-medium text-foreground mb-4">公司资料</h1>
            <div className="flex items-center justify-between">
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {hasSelection ? (
                  <>
                    <Button size="sm" className="gap-1.5">
                      <ArrowRightLeft className="h-4 w-4" />
                      移动
                    </Button>
                    <Button size="sm" className="gap-1.5">
                      <Copy className="h-4 w-4" />
                      复制
                    </Button>
                    <Button size="sm" variant="destructive" className="gap-1.5">
                      <Trash2 className="h-4 w-4" />
                      删除
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" className="gap-1.5">
                      <Upload className="h-4 w-4" />
                      上传文件
                    </Button>
                    <Button size="sm" className="gap-1.5">
                      <Link className="h-4 w-4" />
                      创建网页链接
                    </Button>
                    <Button size="sm" className="gap-1.5">
                      <FolderPlus className="h-4 w-4" />
                      新建文件夹
                    </Button>
                  </>
                )}
              </div>
              {/* Search */}
              <div className="relative w-64">
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="bg-muted/30 sticky top-0">
                <tr className="border-b border-border">
                  <th className="w-12 p-3">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">名称</th>
                  <th className="w-20 text-center p-3 text-sm font-medium text-muted-foreground">权限</th>
                  <th className="w-20 text-center p-3 text-sm font-medium text-muted-foreground">类型</th>
                  <th className="w-24 text-right p-3 text-sm font-medium text-muted-foreground">大小</th>
                  <th className="w-28 text-center p-3 text-sm font-medium text-muted-foreground">上传时间</th>
                  <th className="w-28 text-center p-3 text-sm font-medium text-muted-foreground">更新时间</th>
                </tr>
              </thead>
              <tbody>
                {mockFiles.map((file) => {
                  const isSelected = selectedFiles.includes(file.id);
                  return (
                    <tr
                      key={file.id}
                      className={cn(
                        "border-b border-border hover:bg-muted/30 transition-colors cursor-pointer",
                        isSelected && "bg-primary/5"
                      )}
                      onClick={() => handleSelectFile(file.id, !isSelected)}
                    >
                      <td className="p-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectFile(file.id, !!checked)}
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0">
                            <FileTypeIcon type={file.type} />
                          </div>
                          <span className="text-sm text-foreground truncate">{file.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <Lock className="h-4 w-4 text-muted-foreground mx-auto" />
                      </td>
                      <td className="p-3 text-center text-sm text-muted-foreground">{file.type}</td>
                      <td className="p-3 text-right text-sm text-muted-foreground">{file.size}</td>
                      <td className="p-3 text-center text-sm text-muted-foreground">{file.uploadTime}</td>
                      <td className="p-3 text-center text-sm text-muted-foreground">{file.updateTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="w-80 shrink-0 bg-card">
          {selectedFile ? (
            <FileDetailPanel file={selectedFile} />
          ) : (
            <EmptyDetailPanel fileCount={mockFiles.length} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function FileTypeIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    PDF: "text-red-500",
    XLSX: "text-green-600",
    XLS: "text-green-600",
    DOC: "text-blue-600",
    DOCX: "text-blue-600",
  };

  return (
    <span className={cn("text-xs font-medium", colors[type] || "text-muted-foreground")}>
      {type}
    </span>
  );
}
