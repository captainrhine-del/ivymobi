import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableCategoryRow } from "./DraggableCategoryRow";

interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
  onReorder?: (categories: Category[]) => void;
}

export function CategoryList({ categories, onCategoryClick, onReorder }: CategoryListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);
      
      const newCategories = [...categories];
      const [removed] = newCategories.splice(oldIndex, 1);
      newCategories.splice(newIndex, 0, removed);
      
      onReorder?.(newCategories);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {categories.map((category, index) => (
            <DraggableCategoryRow
              key={category.id}
              category={category}
              isLast={index === categories.length - 1}
              onClick={onCategoryClick}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
