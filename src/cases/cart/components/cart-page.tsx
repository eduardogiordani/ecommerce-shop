import { useCart } from "@/cases/cart/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
          <p className="text-gray-500 mb-6">
            Adicione produtos ao carrinho para continuar comprando
          </p>
          <Button onClick={() => navigate("/catalog")}>
            Ir para o catálogo
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
        Continuar comprando
      </Button>

      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex items-center gap-4"
              >
                <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Sem imagem</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-lg font-bold text-green-600">
                    R$ {item.price}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    R$ {item.price * item.quantity}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar carrinho
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  R$ {cart.total}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Itens</span>
                <span className="font-semibold">
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  R$ {cart.total}
                </span>
              </div>
            </div>

            <Button className="w-full" size="lg" disabled>
              Finalizar Compra
              <span className="text-xs ml-2">(Em breve)</span>
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              O checkout será implementado na próxima fase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
