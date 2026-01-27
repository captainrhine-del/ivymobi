import { GripVertical, Folder, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
}

export function CategoryList({ categories, onCategoryClick }: CategoryListProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {categories.map((category, index) => (
        <div
          key={category.id}
          onClick={() => onCategoryClick?.(category)}
          className={cn(
            "flex items-center px-4 py-4 cursor-pointer hover:bg-muted/50 transition-colors",
            index !== categories.length - 1 && "border-b border-border"
          )}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground/50 mr-3 cursor-grab" />
          <div className="w-10 h-8 bg-folder rounded flex items-center justify-center mr-3">
            <Folder className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="flex-1 text-foreground">{category.name}</span>
          <span className="text-muted-foreground text-sm mr-2">分类</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}
