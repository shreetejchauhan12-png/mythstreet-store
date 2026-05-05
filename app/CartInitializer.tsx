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

    // ✅ Load cart + wishlist once
    fetchCart();
    fetchWishlist();

  }, []);

  return null;
}