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

  design_id: number;
  design: string;
variant_code: string;

  image: string;

  hoverLeft?: string;
  hoverRight?: string;

  hover_left?: string;
  hover_right?: string;
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
  const { left, width } =
    e.currentTarget.getBoundingClientRect();

  const x = e.clientX - left;

  if (x <= width / 2) {
    setHoverSide("left");
  } else {
    setHoverSide("right");
  }
}

  function handleLeave() {
    setHoverSide(null);
  }

  async function addItem(e: React.MouseEvent, size: string) {
  e.preventDefault();

  // ❌ REMOVE local addToCart here

  // 🔐 TOKEN
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch(
      `https://mythstreet-backend.onrender.com/api/products/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          size: size,
          title: product.title,
          price: product.price,
          image: product.image,
        }),
      }
    );

    const data = await res.json();

    console.log("ADD TO CART:", data); // ✅ no popup

    // 🔄 SYNC FROM DB
    const fetchCart = useCart.getState().fetchCart;
    await fetchCart();

  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
  }

  // ✅ UI FEEDBACK
  setAdded(true);
  setTimeout(() => setAdded(false), 1500);
}

  return (
    <Link
  href={`/product/${product.id}`}
  scroll={true}
  className="block"
>
      <div className="group cursor-pointer">

        <div
  className="
relative overflow-hidden
bg-[#f5f5f5]
rounded-[22px]
transition-all duration-500
group
"
  onMouseMove={handleMove}
  onMouseLeave={handleLeave}
>
          {/* ✅ FIXED RATIO CONTAINER */}
          <div className="relative aspect-[5/6] overflow-hidden rounded-[22px]">

            {/* BASE IMAGE */}
<img
  src={`/${product.design}-${product.variant_code}-1.jpg`}
  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-500 ease-out ${
    hoverSide === null
      ? "opacity-100 scale-100"
      : "opacity-0 scale-105"
  }`}
/>

{/* LEFT IMAGE */}
<img
  src={`/${product.design}-${product.variant_code}-2.jpg`}
  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-500 ease-out ${
    hoverSide === "left"
      ? "opacity-100 scale-100"
      : "opacity-0 scale-105"
  }`}
/>

{/* RIGHT IMAGE */}
<img
  src={`/${product.design}-${product.variant_code}-3.jpg`}
  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-500 ease-out ${
    hoverSide === "right"
      ? "opacity-100 scale-100"
      : "opacity-0 scale-105"
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
              className="
absolute top-2 right-2 z-10
w-8 h-8
rounded-full
bg-white/90
backdrop-blur-md
flex items-center justify-center
shadow-lg
transition
hover:scale-110
"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
              />
            </button>
{/* STOCK BADGE */}
{/* BADGES */}
{/* BADGE */}
<div className="absolute top-2 left-2 z-10">
  <span className="
    bg-black/90
    backdrop-blur-md
    text-white
    text-[8px]
    tracking-[0.12em]
    px-2 py-1
    rounded-full
    leading-none
  ">
    {["NEW DROP","BEST SELLER","LIMITED STOCK","HOT PICK","STREET FAVORITE","EXCLUSIVE"][product.id % 6]}
  </span>
</div>
            {added && (
  <div className="absolute top-10 left-3 bg-black text-white text-xs px-3 py-1 rounded">
                Added to cart
              </div>
            )}

          </div>
        </div>

        {/* TEXT */}
        <div className="pt-4 px-1">
          <h3 className="
  font-medium
  text-sm md:text-base
  tracking-wide
  line-clamp-1
">
            {product.title}
          </h3>

          <p className="
  text-sm md:text-base
  text-black/70
  mt-1
">
            ₹{product.price}
          </p>
        </div>

      </div>
    </Link>
  );
}