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
    <div className="bg-card rounded-lg overflow-hidden">
      {categories.map((category, index) => (
        <div
          key={category.id}
          onClick={() => onCategoryClick?.(category)}
          className={cn(
            "flex items-center px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors",
            index !== categories.length - 1 && "border-b border-border"
          )}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground mr-3 cursor-grab" />
          <Folder className="h-6 w-6 text-admin-folder mr-3 fill-admin-folder" />
          <span className="flex-1 text-foreground">{category.name}</span>
          <span className="text-muted-foreground text-sm mr-2">分类</span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}
