"use client";

import { create } from "zustand";

export type WishlistItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type WishlistStore = {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: number) => boolean;
};

// ✅ LOAD FROM LOCALSTORAGE
const getInitialWishlist = () => {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("myth_wishlist");
  return saved ? JSON.parse(saved) : [];
};

export const useWishlist = create<WishlistStore>((set, get) => ({
  wishlist: getInitialWishlist(),

  toggleWishlist: (item) => {
    const exists = get().wishlist.find(
      (i) => i.id === item.id
    );

    let updated;

    if (exists) {
      updated = get().wishlist.filter(
        (i) => i.id !== item.id
      );
    } else {
      updated = [...get().wishlist, item];
    }

    // ✅ SAVE TO LOCALSTORAGE
    localStorage.setItem(
      "myth_wishlist",
      JSON.stringify(updated)
    );

    set({ wishlist: updated });
  },

  isWishlisted: (id) =>
    get().wishlist.some((i) => i.id === id),
}));