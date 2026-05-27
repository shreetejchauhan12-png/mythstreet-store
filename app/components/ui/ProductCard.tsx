"use client";

import { memo, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const toggleWishlist = useWishlist(
    (state) => state.toggleWishlist
  );

  const wishlistItems = useWishlist(
  (state) => state.wishlist
);

const isWishlisted = wishlistItems.some(
  (item: any) => item.id === product.id
);

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
  image: `/${product.design}-${product.variant_code}-1.webp`,
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
      <div className="
group cursor-pointer
transition-all duration-500
hover:-translate-y-1
">

        <div
  className="
relative overflow-hidden
bg-[#f5f5f5]
shadow-[0_4px_20px_rgba(0,0,0,0.04)]
hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
rounded-[22px]
transition-transform duration-500
group
"
>
          {/* ✅ FIXED RATIO CONTAINER */}
          <div className="relative aspect-[5/6] overflow-hidden rounded-[22px]">

            {/* BASE IMAGE */}
<Image
  src={`/${product.design}-${product.variant_code}-1.webp`}
  alt={product.title}
  fill
  sizes="(max-width: 768px) 50vw, 25vw"
  quality={75}
  className="absolute inset-0 object-cover pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.03]"
/>

{/* LEFT IMAGE */}
<Image
  src={`/${product.design}-${product.variant_code}-2.webp`}
  alt={product.title}
  fill
  sizes="(max-width: 768px) 50vw, 25vw"
  quality={75}
  loading="lazy"
  className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
/>


            {/* wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist({
  id: product.id,
  title: product.title,
  price: product.price,
  image: `/${product.design}-${product.variant_code}-1.webp`,
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

export default memo(ProductCard);