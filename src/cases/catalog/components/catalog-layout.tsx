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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-12 w-full mb-6" />
        <div className="flex gap-2 mb-6">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="aspect-square mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-8 w-24 mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Catálogo de Produtos</h1>
        <Button
          onClick={() => navigate("/cart")}
          variant="outline"
          className="relative"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Carrinho
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum produto encontrado com os filtros selecionados.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            {filteredProducts.length} produto(s) encontrado(s)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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


