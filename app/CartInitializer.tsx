"use client";

import { useEffect } from "react";
import { useCart } from "@/app/store/cart";
import { useWishlist } from "@/app/store/wishlist";

export default function CartInitializer() {
  const fetchCart = useCart((s) => s.fetchCart);
  const fetchWishlist = useWishlist((s) => s.fetchWishlist);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    async function init() {
      // 1️⃣ Load from backend
      await fetchCart();
      await fetchWishlist();

      // 2️⃣ 🔥 CHECK IF CART EMPTY
      const currentCart = useCart.getState().cart;

      const tempCart = JSON.parse(
        localStorage.getItem("tempCart") || "[]"
      );

      // 3️⃣ 🔥 RESTORE IF NEEDED
      if (currentCart.length === 0 && tempCart.length > 0) {
        useCart.setState({ cart: tempCart });
      }

      // 4️⃣ CLEANUP
      localStorage.removeItem("tempCart");
    }

    init();
  }, []);

  return null;
}