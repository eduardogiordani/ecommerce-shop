import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { useProduct } from "@/cases/products/hooks/use-product";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useProduct(id!);

//CARRINHO ########################################
const handleAddToCart = () => {
  if (product) {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
    setQuantity(1);

    navigate("/cart");
  }
};
//CARRINHO ########################################
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-20 w-full mb-6" />
            <Skeleton className="h-12 w-40 mb-6" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product ) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">
          </p>
          <Button onClick={() => navigate("/catalog")}>
            Voltar ao catálogo
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/catalog")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar ao catálogo
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Sem imagem</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex gap-2 mb-4">
            <span className="text-sm bg-gray-100 px-3 py-1 rounded">
              {product.category.name}
            </span>
            {product.brand && (
              <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                {product.brand.name}
              </span>
            )}
            <span
              className={`text-sm px-3 py-1 rounded ${
                product.active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.active ? "Disponível" : "Indisponível"}
            </span>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description || "Sem descrição disponível."}
          </p>

          <div className="mb-6">
            <p className="text-4xl font-bold text-green-600">
              R$ {product.price}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantidade</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleAddToCart}
            disabled={!product.active}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.active ? "Adicionar ao carrinho" : "Produto indisponível"}
          </Button>
        </div>
      </div>
    </div>
  );
}
