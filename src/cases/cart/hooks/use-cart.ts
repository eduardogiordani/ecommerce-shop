import { useState, useEffect } from "react";
import type { CartDTO, CartItemDTO } from "../dtos/cart.dto";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

const CART_STORAGE_KEY = "ecommerce_cart";

export function useCart() {
  const [cart, setCart] = useState<CartDTO>(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { items: [], total: 0 };
      }
    }
    return { items: [], total: 0 };
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItemDTO[]): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addToCart = (product: ProductDTO, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.productId === product.id
      );

      let newItems: CartItemDTO[];

      if (existingItem) {
        newItems = prevCart.items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItemDTO = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id!,
          name: product.name,
          price: product.price,
          quantity,
          imageUrl: product.imageUrl,
        };
        newItems = [...prevCart.items, newItem];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const newItems = prevCart.items.filter((item) => item.id !== itemId);
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart((prevCart) => {
      const newItems = prevCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  const getItemCount = (): number => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
  };
}
