import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: CategoryDTO[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Categorias
      </h2>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectCategory(null)}
          className={
            selectedCategory === null
              ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
              : "border-muted-foreground/30"
          }
        >
          Todos
        </Button>

        {categories.map((category) => {
          const isActive = selectedCategory === category.id;

          return (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              onClick={() => onSelectCategory(category.id!)}
              className={
                isActive
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                  : "border-muted-foreground/30 text-muted-foreground hover:border-emerald-400 hover:text-foreground"
              }
            >
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}