import { Button } from "@/components/ui/button";

interface FileDetailPanelProps {
  file: {
    id: string;
    name: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
    isShareable: boolean;
    isDownloadable: boolean;
    tags: string[];
    aiSynced: boolean;
    description: string;
  };
}

export function FileDetailPanel({ file }: FileDetailPanelProps) {
  return (
    <div className="p-4 h-full overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-base font-medium text-foreground flex-1 break-all pr-2">
          {file.name}
        </h2>
        <Button size="sm" variant="default" className="shrink-0">
          重命名
        </Button>
      </div>

      {/* Thumbnail */}
      <div className="mb-4">
        <div className="w-full aspect-[4/3] bg-muted rounded-lg border border-border flex items-center justify-center overflow-hidden">
          {file.thumbnail ? (
            <img 
              src={file.thumbnail} 
              alt={file.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-muted-foreground text-sm">文件预览</div>
          )}
        </div>
        <div className="mt-2 flex justify-end">
          <Button size="sm" variant="default">
            更换缩略图
          </Button>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-4">
        {/* Created Time */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">创建时间</span>
          <span className="text-sm text-foreground">{file.createdAt}</span>
        </div>

        {/* Updated Time */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">更新时间</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">{file.updatedAt}</span>
            <Button size="sm" variant="default">
              上传新版本
            </Button>
          </div>
        </div>

        {/* Permissions */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">权限</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 text-sm text-foreground">
              {file.isPublic && <span>公开</span>}
              {file.isShareable && <span>可分享</span>}
              {file.isDownloadable && <span>可下载</span>}
            </div>
            <Button size="sm" variant="default">
              更换权限
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">标签</span>
          <div className="flex items-center gap-2">
            {file.tags.length > 0 ? (
              <div className="flex items-center gap-1">
                {file.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-foreground">{tag}</span>
                ))}
              </div>
            ) : null}
            <Button size="sm" variant="default">
              更改标签
            </Button>
          </div>
        </div>

        {/* AI Sync */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">AI大模型同步</span>
          <span className="text-sm text-foreground">
            {file.aiSynced ? "已上传至AI大模型" : "未同步"}
          </span>
        </div>

        {/* Description */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">简介</span>
          <div className="flex items-center gap-2">
            {file.description && (
              <span className="text-sm text-foreground">{file.description}</span>
            )}
            <Button size="sm" variant="default">
              更改简介
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
