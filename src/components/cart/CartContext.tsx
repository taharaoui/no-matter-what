"use client";

import { createContext, useCallback, useContext, useState, useTransition } from "react";
import {
  addToCartAction,
  removeFromCartAction,
  updateCartLineAction,
} from "@/lib/shopify/actions";
import type { Cart } from "@/lib/shopify";

type CartContextValue = {
  cart: Cart | null;
  totalQuantity: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isPending: boolean;
  error: string | null;
  addItem: (merchandiseId: string, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  updateItem: (lineId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/* Cart state lives here, seeded from the server (layout.tsx reads the
   nmw_cart_id cookie and fetches the cart before first paint). Every
   mutation goes through a Server Action and replaces `cart` with the
   authoritative object Shopify returns — no client-side cart math, so
   there's nothing to keep in sync. */
export function CartProvider({
  initialCart,
  children,
}: {
  initialCart: Cart | null;
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((merchandiseId: string, quantity: number = 1) => {
    setError(null);
    startTransition(async () => {
      const result = await addToCartAction(merchandiseId, quantity);
      if (result.error) setError(result.error);
      if (result.cart) setCart(result.cart);
      setIsOpen(true);
    });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setError(null);
    startTransition(async () => {
      const result = await removeFromCartAction(lineId);
      if (result.error) setError(result.error);
      if (result.cart) setCart(result.cart);
    });
  }, []);

  const updateItem = useCallback((lineId: string, quantity: number) => {
    setError(null);
    startTransition(async () => {
      const result = await updateCartLineAction(lineId, quantity);
      if (result.error) setError(result.error);
      if (result.cart) setCart(result.cart);
    });
  }, []);

  const value: CartContextValue = {
    cart,
    totalQuantity: cart?.totalQuantity ?? 0,
    isOpen,
    openCart,
    closeCart,
    isPending,
    error,
    addItem,
    removeItem,
    updateItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
