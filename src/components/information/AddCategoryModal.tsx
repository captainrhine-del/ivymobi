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
import { Label } from "@/components/ui/label";

interface AddCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; thumbnail: File | null }) => void;
}

export function AddCategoryModal({ open, onOpenChange, onSubmit }: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("请输入名称");
      return;
    }
    onSubmit({ name, thumbnail });
    setName("");
    setThumbnail(null);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName("");
    setThumbnail(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal">添加分类</DialogTitle>
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
