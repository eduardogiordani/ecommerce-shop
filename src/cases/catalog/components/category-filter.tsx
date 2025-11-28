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
      <h2 className="text-lg font-semibold mb-3">Categorias</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onSelectCategory(null)}
          size="sm"
        >
          Todos
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onSelectCategory(category.id!)}
            size="sm"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
