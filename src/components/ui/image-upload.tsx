import { useCallback, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("文件大小不能超过5M");
      return;
    }
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      alert("只支持jpg、jpeg、png格式");
      return;
    }
    
    onChange(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDelete = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground",
          preview && "p-2"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleInputChange}
          className="hidden"
        />
        
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-40 mx-auto object-contain" />
        ) : (
          <div className="text-center space-y-2">
            <p className="text-foreground">拖拽或点击上传</p>
            <p className="text-sm text-muted-foreground">支持5M及以内的jpg、jpeg、png图片</p>
            <p className="text-sm text-muted-foreground">图片推荐尺寸: 960px*600px</p>
          </div>
        )}
      </div>
      
      {(preview || value) && (
        <button
          type="button"
          onClick={handleDelete}
          className="text-destructive text-sm hover:underline"
        >
          删除
        </button>
      )}
    </div>
  );
}
