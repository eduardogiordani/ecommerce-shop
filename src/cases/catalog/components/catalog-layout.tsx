import { ProductCard } from "./product-card";
import { CategoryFilter } from "./category-filter";
import { SearchBar } from "./search-bar";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/cases/products/hooks/use-product";
import { useCategories } from "@/cases/categories/hooks/use-category";

export function CatalogLayout() {
  const navigate = useNavigate();
  const { addToCart, getItemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const { data: categories = [], isLoading: loadingCategories } = useCategories();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.id) return false;

      const matchesCategory =
        selectedCategory === null || product.category.id === selectedCategory;

      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch && product.active;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const cartItemCount = getItemCount();

  if (loadingProducts || loadingCategories) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Skeleton className="h-10 w-full md:w-80" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <Skeleton className="mb-4 aspect-square rounded-lg" />
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-3 h-4 w-1/2" />
              <Skeleton className="mb-3 h-8 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Catálogo de Produtos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore os produtos disponíveis e adicione ao carrinho em poucos cliques.
          </p>
        </div>

        <Button
          onClick={() => navigate("/cart")}
          variant="outline"
          className="relative flex items-center gap-2 rounded-full border-muted-foreground/20 px-4 shadow-sm hover:border-emerald-500 hover:bg-emerald-50"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Carrinho</span>
          {cartItemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Resultado */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 py-16 text-center">
          <p className="mb-2 text-lg font-medium text-muted-foreground">
            Nenhum produto encontrado.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            Tente remover alguns filtros ou buscar por outro termo.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory(null);
              setSearchTerm("");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {filteredProducts.length} produto(s) encontrado(s)
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}



