import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Label } from "@/components/ui/label";

interface AddArticleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; thumbnail: File | null; content: string }) => void;
}

export function AddArticleModal({ open, onOpenChange, onSubmit }: AddArticleModalProps) {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("请输入名称");
      return;
    }
    onSubmit({ name, thumbnail, content });
    setName("");
    setThumbnail(null);
    setContent("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName("");
    setThumbnail(null);
    setContent("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal">添加文章</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-start gap-4">
            <Label className="w-20 text-right pt-2 shrink-0">
              <span className="text-destructive">*</span>名称
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1"
              placeholder=""
            />
          </div>
          
          <div className="flex items-start gap-4">
            <Label className="w-20 text-right pt-2 shrink-0">缩略图</Label>
            <div className="flex-1">
              <ImageUpload value={thumbnail} onChange={setThumbnail} />
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Label className="w-20 text-right pt-2 shrink-0">
              <span className="text-destructive">*</span>正文
            </Label>
            <div className="flex-1">
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            确定
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
