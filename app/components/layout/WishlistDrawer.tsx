"use client";

import Link from "next/link";
import {
  Heart,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  wishlist: any[];
  addToCart: any;
  toggleWishlist: any;
};

export default function WishlistDrawer({
  open,
  onClose,
  wishlist,
  addToCart,
  toggleWishlist,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* PANEL */}
      <div className="
absolute right-0 top-0
h-full w-[92%] md:w-96

bg-white/95
backdrop-blur-xl

p-6
shadow-[0_0_40px_rgba(0,0,0,0.12)]

overflow-y-auto
">

        <div className="flex justify-between mb-6">

          <h2 className="font-semibold text-lg">
            Wishlist
          </h2>

          <X
            className="cursor-pointer"
            onClick={onClose}
          />

        </div>

        {wishlist.length === 0 ? (

          <div className="
h-[70vh]
flex flex-col
items-center
justify-center
text-center
px-6
">

            <Heart className="w-16 h-16 text-gray-300 mb-5" />

            <h3 className="text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h3>

            <p className="text-gray-500 text-sm leading-6 max-w-xs mb-6">
              Save your favorite anime and streetwear drops here.
            </p>

            <button
              onClick={() => {
                onClose();
                window.location.href = "/shop/all/all";
              }}
              className="
bg-[#680000]
text-white
px-6 py-3
rounded-lg
text-sm
tracking-wide
hover:opacity-90
transition
"
            >
              EXPLORE PRODUCTS
            </button>

          </div>

        ) : (

          wishlist.map((item, index) => (

            <div
              key={`${item.id}-${index}`}
              className="
flex gap-4
p-3
rounded-2xl
bg-white/70
border border-black/5
mb-4
"
            >

              <Link
                href={`/product/${item.id}`}
                onClick={onClose}
              >

                <img
                  src={item.image}
                  className="w-16 h-20 object-cover cursor-pointer"
                />

              </Link>

              <div className="flex-1">

                <Link
                  href={`/product/${item.id}`}
                  onClick={onClose}
                >

                  <p className="text-sm font-medium cursor-pointer hover:underline">
                    {item.title}
                  </p>

                </Link>

                <p className="text-sm text-gray-500">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => {

                    addToCart({
                      id: String(item.id),
                      title: item.title,
                      price: item.price,
                      image: item.image,
                      quantity: 1,
                    });

                    toggleWishlist(item);

                  }}
                  className="text-xs text-[#680000]"
                >
                  Move to cart
                </button>

              </div>

              <button
                onClick={() => toggleWishlist(item)}
                className="text-xs text-red-500"
              >
                Remove
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}