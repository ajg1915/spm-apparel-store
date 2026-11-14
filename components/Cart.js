"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem("spm_cart") || "[]")); } catch {}
  }, []);
  const save = (next) => {
    setItems(next);
    try { localStorage.setItem("spm_cart", JSON.stringify(next)); } catch { try { localStorage.setItem("spm_cart", JSON.stringify(next.map((i) => (i.design ? { ...i, design: { ...i.design, art: null } } : i)))); } catch {} }
  };
  const add = (item) => {
    const key = item.custom ? `custom|${item.uid}` : `${item.id}|${item.size}|${item.color}`;
    const found = items.find((i) => i.key === key);
    save(found ? items.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i)) : [...items, { ...item, key }]);
  };
  const setQty = (key, qty) => save(qty <= 0 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i)));
  const clear = () => save([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  return <CartCtx.Provider value={{ items, add, setQty, clear, count, total }}>{children}</CartCtx.Provider>;
}

export const useCart = () => useContext(CartCtx);
