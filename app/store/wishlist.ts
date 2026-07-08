"use client";

import { create } from "zustand";
import { apiFetch } from "@/app/lib/api";

export type WishlistItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type WishlistStore = {
  wishlist: WishlistItem[];

  fetchWishlist: () => Promise<void>;
  toggleWishlist: (item: WishlistItem) => Promise<void>;
  isWishlisted: (id: number) => boolean;
};

export const useWishlist = create<WishlistStore>((set, get) => ({
  wishlist: [],

  // 🔄 FETCH FROM BACKEND
  fetchWishlist: async () => {

  try {

    const token = localStorage.getItem("token");

    if (!token) {

      set({ wishlist: [] });

      return;

    }

    const res = await apiFetch("/api/products/wishlist");

    const data = await res.json();

    console.log("WISHLIST STATUS:", res.status);
console.log("WISHLIST RESPONSE:", data);

    if (!res.ok || !data.success) {

      console.error("WISHLIST API:", data);

      set({ wishlist: [] });

      return;

    }

    const formatted = (data.wishlist || []).map((item: any) => ({

      id: item.product_id,

      title: item.title,

      price: item.price,

      image: item.image,

    }));

    set({

      wishlist: formatted,

    });

  } catch (error) {

    console.error(

      "❌ Fetch wishlist error:",

      error

    );

    set({

      wishlist: [],

    });

  }

},

  // ❤️ ADD / REMOVE
  toggleWishlist: async (item) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login first");
        return;
      }

      const exists = get().wishlist.find((i) => i.id === item.id);

      if (exists) {
        // ❌ REMOVE
        await apiFetch("/api/products/wishlist", {
  method: "DELETE",
  body: JSON.stringify({
    product_id: item.id,
  }),
});
      } else {
        // ➕ ADD
        await apiFetch("/api/products/wishlist", {
  method: "POST",
  body: JSON.stringify({
    product_id: item.id,
    title: item.title,
    price: item.price,
    image: item.image,
  }),
});
      }

      // 🔥 ALWAYS REFRESH FROM DB
      await get().fetchWishlist();

    } catch (error) {
      console.error("❌ Wishlist toggle error:", error);
    }
  },

  // 🔍 CHECK
  isWishlisted: (id) =>
    get().wishlist.some((i) => i.id === id),
}));