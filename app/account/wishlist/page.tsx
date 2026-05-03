"use client";

import Link from "next/link";
import { useWishlist } from "@/app/store/wishlist";
import { useCart } from "@/app/store/cart";

export default function AccountWishlistPage() {
  const wishlist = useWishlist((s) => s.wishlist);
  const toggleWishlist = useWishlist((s) => s.toggleWishlist);
  const addToCart = useCart((s) => s.addToCart);

  if (wishlist.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
        <p className="text-gray-500">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h2 className="text-2xl font-semibold mb-6">Wishlist</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="group w-full">

            {/* CARD */}
            <div className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">

              {/* IMAGE + LINK */}
              <Link href={`/product/${item.id}`}>
                <div className="relative w-full aspect-4/5 overflow-hidden cursor-pointer">

                  <img
                    src={item.image}
                    className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-3">

                <p className="text-sm font-medium line-clamp-1">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  ₹{item.price}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: String(item.id),
                        title: item.title,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                      });
                    }}
                    className="flex-1 bg-[#680000] text-white text-xs py-2 rounded hover:bg-black transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="text-xs border px-3 rounded hover:bg-gray-100 transition"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}