import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadTime: string;
  updateTime: string;
}

interface DraggableFileRowProps {
  file: FileItem;
  isSelected: boolean;
  onSelect: (fileId: string, checked: boolean) => void;
}

export function DraggableFileRow({ file, isSelected, onSelect }: DraggableFileRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        "border-b border-border hover:bg-muted/30 transition-colors cursor-pointer",
        isSelected && "bg-primary/5",
        isDragging && "opacity-50 bg-muted/50 shadow-lg"
      )}
      onClick={() => onSelect(file.id, !isSelected)}
    >
      <td className="p-3 w-10" onClick={(e) => e.stopPropagation()}>
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </td>
      <td className="p-3 w-12" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(file.id, !!checked)}
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
