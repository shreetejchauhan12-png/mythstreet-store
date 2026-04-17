"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/app/store/wishlist";
import { useCart } from "@/app/store/cart";

export default function AccountWishlistPage() {
  const wishlist = useWishlist((s) => s.wishlist);
  const toggleWishlist = useWishlist((s) => s.toggleWishlist);

  const addToCart = useCart((s) => s.addToCart);

  if (wishlist.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">
          Wishlist
        </h2>

        <p className="text-gray-500">
          Your wishlist is empty.
        </p>
      </div>
    );
  }

  return (
    <div>

      <h2 className="text-xl font-semibold mb-6">
        Wishlist
      </h2>

      <div className="space-y-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border p-4"
          >
            <img
              src={item.image}
              className="w-20 h-24 object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">
                {item.title}
              </p>

              <p className="text-sm text-gray-500">
                ₹{item.price}
              </p>

              <div className="flex gap-4 mt-3">

                <button
                  onClick={() =>
                    addToCart({
                      id: String(item.id),
                      title: item.title,
                      price: item.price,
                      image: item.image,
                      quantity: 1,
                    })
                  }
                  className="text-sm underline"
                >
                  Move to cart
                </button>

                <button
                  onClick={() => toggleWishlist(item)}
                  className="text-sm text-red-500"
                >
                  Remove
                </button>

              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}