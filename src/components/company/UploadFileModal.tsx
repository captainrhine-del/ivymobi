import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPath?: string;
}

export function UploadFileModal({ 
  open, 
  onOpenChange, 
  currentPath = "公司资料" 
}: UploadFileModalProps) {
  // Permission states
  const [browsePermission, setBrowsePermission] = useState<"public" | "leads" | "members">("public");
  const [allowShare, setAllowShare] = useState(true);
  const [allowDownload, setAllowDownload] = useState(true);
  const [pdfWatermark, setPdfWatermark] = useState(false);
  const [videoWatermark, setVideoWatermark] = useState(false);
  
  // File upload states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    // TODO: Implement actual file upload
    console.log("Uploading files with permissions:", {
      browsePermission,
      allowShare,
      allowDownload,
      pdfWatermark,
      videoWatermark,
      files: selectedFiles,
    });
    onOpenChange(false);
    setSelectedFiles([]);
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold">上传</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {/* Storage Path */}
          <div className="mb-6 text-sm text-muted-foreground">
            存储路径：<span className="text-foreground">{currentPath}</span>
          </div>

          <div className="flex gap-8">
            {/* Step 1: Select Permissions */}
            <div className="flex-1 space-y-5">
              <h3 className="font-medium text-base">第1步：选择权限</h3>

              {/* Browse Permission */}
              <div className="space-y-3">
                <Label className="text-sm text-foreground">浏览</Label>
                <RadioGroup
                  value={browsePermission}
                  onValueChange={(v) => setBrowsePermission(v as "public" | "leads" | "members")}
                  className="flex items-center gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public" className="font-normal cursor-pointer">公开</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="leads" id="leads" />
                    <Label htmlFor="leads" className="font-normal cursor-pointer">留资的客户</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="members" id="members" />
                    <Label htmlFor="members" className="font-normal cursor-pointer">部分成员</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Allow Share */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-foreground">是否允许分享</span>
                    <Switch
                      checked={allowShare}
                      onCheckedChange={setAllowShare}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    开启时，在分享后自动公开文件夹和文件
                  </p>
                </div>
              </div>

              {/* Allow Download */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-foreground">允许下载文件</span>
                    <Switch
                      checked={allowDownload}
                      onCheckedChange={setAllowDownload}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    开启时，成员可下载，分享后浏览者也可下载（成员分享时在分享设置里也可设置禁止下载）
                  </p>
                </div>
              </div>

              {/* PDF Watermark */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">为PDF添加水印</span>
                    <Switch
                      checked={pdfWatermark}
                      onCheckedChange={setPdfWatermark}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    开启时，浏览PDF时将显示浏览者的个人信息
                  </p>
                </div>
              </div>

              {/* Video Watermark */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">为视频添加水印（仅限网页端）</span>
                    <Switch
                      checked={videoWatermark}
                      onCheckedChange={setVideoWatermark}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    开启时，浏览视频时将显示浏览者的个人信息
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Upload Files */}
            <div className="flex-1 space-y-3">
              <h3 className="font-medium text-base">第2步：上传文件</h3>
              
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors min-h-[280px] flex flex-col items-center justify-center",
                  isDragging 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-muted-foreground/50",
                  selectedFiles.length > 0 && "p-4"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                
                {selectedFiles.length === 0 ? (
                  <div className="text-muted-foreground cursor-pointer">
                    <Upload className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">选择并确定权限后上传</p>
                    <p className="text-xs mt-2">点击或拖拽文件到此区域</p>
                  </div>
                ) : (
                  <div className="w-full space-y-2 max-h-[240px] overflow-auto" onClick={(e) => e.stopPropagation()}>
                    {selectedFiles.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm"
                      >
                        <span className="truncate flex-1 text-left">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0"
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      继续添加文件
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center mt-6">
            <Button onClick={handleConfirm} className="px-8">
              确定
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
