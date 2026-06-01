"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "./types";

interface CartCtx {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  changeQty: (productId: string, delta: number) => void;
  total: number;
  subtotal: number;
  discount: number;
  count: number;
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addItem(item: Omit<CartItem, "qty">, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
  }

  function changeQty(productId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = subtotal > 0 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, changeQty, total, subtotal, discount, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
