import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: ProductDTO;
  onAddToCart: (product: ProductDTO) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    if (product.id) {
      navigate(`/catalog/products/${product.id}`);
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div
        className="cursor-pointer"
        onClick={handleProductClick}
      >
        <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">Sem imagem</span>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description || "Sem descrição"}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {product.category.name}
          </span>
          {product.brand && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {product.brand.name}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-green-600 mb-3">
          R$ {product.price}
        </p>
      </div>
      <Button
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Adicionar ao carrinho
      </Button>
    </div>
  );
}
