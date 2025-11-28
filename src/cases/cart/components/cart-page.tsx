import { useCart } from "@/cases/cart/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight">
            Seu carrinho está vazio
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Adicione produtos ao seu carrinho!
          </p>
            <Button
              onClick={() => navigate("/catalog")}
              variant="outline"
              className="rounded-full px-6 border-emerald-500 text-emerald-700 hover:bg-emerald-50"
            >
              Ir para o catálogo
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Topo */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/catalog")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Continuar comprando
        </Button>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {totalItems} item(s) no carrinho
        </span>
      </div>

      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Carrinho de Compras
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Lista de itens */}
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
            >
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="px-2 text-center text-[10px] text-muted-foreground">
                    Sem imagem
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="mb-1 text-sm font-semibold leading-tight">
                  {item.name}
                </h3>
                  <p className="text-sm font-bold text-emerald-600">
                    R$ {Number(item.price).toFixed(2)}
                  </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="h-8 w-8"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="min-w-[90px] text-right">
                <p className="text-sm font-bold">
                  R$ {Number(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="mt-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar carrinho
            </Button>
          </div>
        </div>

        {/* Resumo */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Resumo do Pedido</h2>

            <div className="mb-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">
                  R$ {cart.total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Itens</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className="font-semibold text-emerald-600">
                  Grátis
                </span>
              </div>
            </div>

            <div className="mb-6 border-t pt-4">
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-emerald-600">
                  R$ {cart.total.toFixed(2)}
                </span>
              </div>
            </div>
              <Button
                variant="outline"
                className="w-full rounded-full border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                size="lg"
              >
                Finalizar Compra
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}