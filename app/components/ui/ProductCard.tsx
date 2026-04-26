"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/store/cart";
import { useWishlist } from "@/app/store/wishlist";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  hoverLeft: string;
  hoverRight: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [added, setAdded] = useState(false);

  const addToCart = useCart((state) => state.addToCart);

  const toggleWishlist = useWishlist(
    (state) => state.toggleWishlist
  );

  const isWishlisted = useWishlist((state) =>
    state.isWishlisted(product.id)
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
  const { left, width } = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - left;

  const leftZone = width * 0.4;
  const rightZone = width * 0.6;

  if (x < leftZone) {
    setHoverSide("left");
  } else if (x > rightZone) {
    setHoverSide("right");
  }
  // 👇 center does NOTHING → keeps last hover
}

  function handleLeave() {
    setHoverSide(null);
  }

  function addItem(e: React.MouseEvent, size: string) {
    e.preventDefault();

    addToCart({
      id: `${product.id}-${size}`,
      title: `${product.title} (${size})`,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="group cursor-pointer">

        <div
          className="relative overflow-hidden bg-gray-100 rounded-xl shadow-sm hover:shadow-lg transition"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {/* ✅ FIXED RATIO CONTAINER */}
          <div className="relative w-full pt-[120%]">

            {/* BASE IMAGE */}
<img
  src={product.image || "/placeholder.jpg"}
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
  }}
  className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
  hoverSide === null ? "opacity-100 scale-100" : "opacity-0 scale-105"
}`}
/>

{/* LEFT IMAGE */}
<img
  src={product.hoverLeft || product.image}
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src = product.image;
  }}
  className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
    hoverSide === "left" ? "opacity-100 scale-105" : "opacity-0"
  }`}
/>

{/* RIGHT IMAGE */}
<img
  src={product.hoverRight || product.image}
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src = product.image;
  }}
  className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
    hoverSide === "right" ? "opacity-100 scale-105" : "opacity-0"
  }`}
/>

            {/* wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                });
              }}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
              />
            </button>
{/* STOCK BADGE */}
{/* BADGES */}
<div className="absolute top-3 left-3 flex flex-col gap-1">

  <span className="bg-black text-white text-[10px] px-2 py-1 rounded">
    NEW
  </span>

  <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded">
    TRENDING
  </span>

</div>
{/* QUICK ADD BUTTON */}
<button
  onClick={(e) => addItem(e, "M")}
  className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition"
>
  Quick Add
</button>
            {added && (
              <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded">
                Added to cart
              </div>
            )}

            {/* sizes */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#680000] text-white p-3 translate-y-full group-hover:translate-y-0 transition">
              <div className="flex justify-center gap-2 text-xs md:text-sm">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={(e) => addItem(e, size)}
                    className="border border-white px-2 py-1 rounded hover:bg-white hover:text-[#680000]"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* TEXT */}
        <div className="mt-3">
          <h3 className="font-medium text-sm md:text-base">
            {product.title}
          </h3>

          <p className="text-xs md:text-sm text-gray-600">
            ₹{product.price}
          </p>
        </div>

      </div>
    </Link>
  );
}