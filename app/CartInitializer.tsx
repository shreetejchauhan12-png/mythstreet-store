"use client";

import { useEffect } from "react";
import { useCart } from "@/app/store/cart";

export default function CartInitializer() {
  const fetchCart = useCart((s) => s.fetchCart);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");

      if (token) {
        fetchCart();
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
}