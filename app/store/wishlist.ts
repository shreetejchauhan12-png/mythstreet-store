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

  toggleWishlist: (
    item: WishlistItem
  ) => Promise<void>;

  isWishlisted: (
    id: number
  ) => boolean;
};

export const useWishlist =
  create<WishlistStore>((set, get) => ({

    // =====================================
    // INITIAL STATE
    // =====================================

    wishlist: [],

    // =====================================
    // FETCH WISHLIST FROM DATABASE
    // =====================================

    fetchWishlist: async () => {

      try {

        if (
          typeof window === "undefined"
        ) {
          return;
        }

        const token =
          localStorage.getItem("token");

        console.log(
          "❤️ WISHLIST TOKEN:",
          token
            ? "FOUND"
            : "MISSING"
        );

        if (!token) {

          set({
            wishlist: [],
          });

          return;
        }

        const res =
          await apiFetch(
            "/api/products/wishlist"
          );

        const data =
          await res.json();

        console.log(
          "❤️ WISHLIST GET STATUS:",
          res.status
        );

        console.log(
          "❤️ WISHLIST GET RESPONSE:",
          data
        );

        if (!res.ok) {

          console.error(
            "❌ WISHLIST GET FAILED:",
            data
          );

          return;
        }

        if (!data.success) {

          console.error(
            "❌ WISHLIST GET UNSUCCESSFUL:",
            data
          );

          return;
        }

        const formatted =
          Array.isArray(data.wishlist)
            ? data.wishlist.map(
                (item: any) => ({
                  id: Number(
                    item.product_id
                  ),

                  title:
                    item.title ?? "",

                  price:
                    Number(
                      item.price ?? 0
                    ),

                  image:
                    item.image ?? "",
                })
              )
            : [];

        console.log(
          "❤️ FORMATTED WISHLIST:",
          formatted
        );

        set({
          wishlist: formatted,
        });

      } catch (error) {

        console.error(
          "❌ FETCH WISHLIST ERROR:",
          error
        );

      }

    },

    // =====================================
    // ADD / REMOVE WISHLIST
    // =====================================

    toggleWishlist: async (item) => {

      try {

        if (
          typeof window === "undefined"
        ) {
          return;
        }

        const token =
          localStorage.getItem("token");

        console.log(
          "❤️ TOGGLE WISHLIST"
        );

        console.log(
          "❤️ TOKEN:",
          token
            ? "FOUND"
            : "MISSING"
        );

        if (!token) {

          alert(
            "Please login first"
          );

          return;
        }

        const exists =
          get().wishlist.some(
            (wishlistItem) =>
              wishlistItem.id === item.id
          );

        console.log(
          "❤️ PRODUCT ID:",
          item.id
        );

        console.log(
          "❤️ ALREADY WISHLISTED:",
          exists
        );

        // =================================
        // REMOVE
        // =================================

        if (exists) {

          console.log(
            "❤️ REMOVING FROM WISHLIST..."
          );

          const res =
            await apiFetch(
              "/api/products/wishlist",
              {
                method: "DELETE",

                body: JSON.stringify({
                  product_id:
                    item.id,
                }),
              }
            );

          const data =
            await res.json();

          console.log(
            "❤️ DELETE STATUS:",
            res.status
          );

          console.log(
            "❤️ DELETE RESPONSE:",
            data
          );

          if (!res.ok) {

            throw new Error(
              data?.message ||
              "Failed to remove wishlist item"
            );

          }

        }

        // =================================
        // ADD
        // =================================

        else {

          console.log(
            "❤️ ADDING TO WISHLIST..."
          );

          const res =
            await apiFetch(
              "/api/products/wishlist",
              {
                method: "POST",

                body: JSON.stringify({
                  product_id:
                    item.id,

                  title:
                    item.title,

                  price:
                    item.price,

                  image:
                    item.image,
                }),
              }
            );

          const data =
            await res.json();

          console.log(
            "❤️ ADD STATUS:",
            res.status
          );

          console.log(
            "❤️ ADD RESPONSE:",
            data
          );

          if (!res.ok) {

            throw new Error(
              data?.message ||
              "Failed to add wishlist item"
            );

          }

        }

        // =================================
        // REFRESH FROM DATABASE
        // =================================

        console.log(
          "❤️ REFRESHING WISHLIST..."
        );

        await get().fetchWishlist();

      } catch (error) {

        console.error(
          "❌ WISHLIST TOGGLE ERROR:",
          error
        );

        alert(
          "Wishlist update failed. Check the browser console."
        );

      }

    },

    // =====================================
    // CHECK WISHLIST
    // =====================================

    isWishlisted: (id) => {

      return get().wishlist.some(
        (item) =>
          item.id === id
      );

    },

  }));