import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Folder, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface DraggableCategoryRowProps {
  category: Category;
  isLast: boolean;
  onClick?: (category: Category) => void;
}

export function DraggableCategoryRow({ category, isLast, onClick }: DraggableCategoryRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onClick?.(category)}
      className={cn(
        "flex items-center px-4 py-4 cursor-pointer hover:bg-muted/50 transition-colors bg-card",
        !isLast && "border-b border-border",
        isDragging && "opacity-50 shadow-lg z-10 relative"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded mr-2"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground/50" />
      </div>
      <div className="w-10 h-8 bg-folder rounded flex items-center justify-center mr-3">
        <Folder className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
      </div>
      <span className="flex-1 text-foreground">{category.name}</span>
      <span className="text-muted-foreground text-sm mr-2">分类</span>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}
