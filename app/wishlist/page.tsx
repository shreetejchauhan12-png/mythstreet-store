"use client";

import { useWishlist } from "@/app/store/wishlist";
import { useCart } from "@/app/store/cart";
import Link from "next/link";

export default function WishlistPage() {
  const wishlist = useWishlist((state) => state.wishlist);
  const toggleWishlist = useWishlist(
    (state) => state.toggleWishlist
  );

  const addToCart = useCart((state) => state.addToCart);

  if (wishlist.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-2">
          Your wishlist is empty
        </h1>

        <p className="text-gray-500">
          Save items you love
        </p>

        <Link href="/">
          <button className="mt-6 bg-[#680000] text-white px-6 py-3">
            Continue Shopping
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8">
        Wishlist
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4"
          >
            <img
              src={item.image}
              className="w-full h-60 object-cover mb-3"
            />

            <h3 className="font-medium">
              {item.title}
            </h3>

            <p className="text-gray-500 mb-3">
              ₹{item.price}
            </p>

            <button
              onClick={() =>
                addToCart({
                  id: String(item.id),   // FIXED HERE
                  title: item.title,
                  price: item.price,
                  image: item.image,
                  quantity: 1,
                })
              }
              className="w-full bg-[#680000] text-white py-2 mb-2"
            >
              Add to Cart
            </button>

            <button
              onClick={() => toggleWishlist(item)}
              className="w-full border py-2"
            >
              Remove
            </button>

          </div>
        ))}
      </div>
    </main>
  );
}