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

export const useWishlist = create<WishlistStore>((set, get) => ({
  wishlist: [],

  toggleWishlist: (item) => {
    const exists = get().wishlist.find(
      (i) => i.id === item.id
    );

    if (exists) {
      set({
        wishlist: get().wishlist.filter(
          (i) => i.id !== item.id
        ),
      });
    } else {
      set({
        wishlist: [...get().wishlist, item],
      });
    }
  },

  isWishlisted: (id) =>
    get().wishlist.some((i) => i.id === id),
}));