"use client";

import { memo } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/app/store/wishlist";

type Product = {
  id: number;
  title: string;
  price: number;

  design_id: number;
  design: string;

  main_image: string | null;
  image_2: string | null;
  image_3?: string | null;
  image_4?: string | null;
  image_5?: string | null;
  image_6?: string | null;
};

function ProductCard({ product }: { product: Product }) {
  console.log("🖼️ PRODUCT CARD:", product);

  const toggleWishlist = useWishlist(
    (state) => state.toggleWishlist
  );

  const wishlistItems = useWishlist(
    (state) => state.wishlist
  );

  const isWishlisted = wishlistItems.some(
    (item: any) => item.id === product.id
  );

  const mainImage =
    product.main_image || "/placeholder.webp";

  const hoverImage =
    product.image_2 || mainImage;

  return (
    <Link
      href={`/product/${product.id}`}
      scroll={true}
      className="block"
    >
      <div
        className="
          group cursor-pointer
          transition-all duration-500
          hover:-translate-y-1
        "
      >

        {/* ==============================
            IMAGE CONTAINER
        ============================== */}

        <div
          className="
            relative overflow-hidden
            bg-[#f5f5f5]
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
            hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
            rounded-[22px]
            transition-transform duration-500
          "
        >

          {/* IMAGE */}
          <div
            className="
              relative aspect-[5/6]
              overflow-hidden
              rounded-[22px]
            "
          >

            {/* ==============================
                BASE IMAGE
            ============================== */}

            <Image
              src={mainImage}
              alt={`${product.title} by MYTHSTREET premium streetwear`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={75}
              className="
                absolute inset-0
                object-cover
                pointer-events-none
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.03]
              "
            />

            {/* ==============================
                HOVER IMAGE
            ============================== */}

            <Image
              src={hoverImage}
              alt={`${product.title} alternate view by MYTHSTREET`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={75}
              loading="lazy"
              className="
                absolute inset-0
                w-full h-full
                object-cover
                pointer-events-none
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
              "
            />

            {/* ==============================
                WISHLIST
            ============================== */}

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                toggleWishlist({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: mainImage,
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
              aria-label={
                isWishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
              />
            </button>

            {/* ==============================
                PRODUCT BADGE
            ============================== */}

            <div className="absolute top-2 left-2 z-10">
              <span
                className="
                  bg-black/90
                  backdrop-blur-md
                  text-white
                  text-[8px]
                  tracking-[0.12em]
                  px-2 py-1
                  rounded-full
                  leading-none
                "
              >
                {
                  [
                    "NEW DROP",
                    "BEST SELLER",
                    "LIMITED STOCK",
                    "HOT PICK",
                    "STREET FAVORITE",
                    "EXCLUSIVE",
                  ][product.id % 6]
                }
              </span>
            </div>

          </div>
        </div>

        {/* ==============================
            PRODUCT TEXT
        ============================== */}

        <div className="pt-4 px-1">

          <h3
            className="
              font-medium
              text-sm md:text-base
              tracking-wide
              line-clamp-1
            "
          >
            {product.title}
          </h3>

          <p
            className="
              text-sm md:text-base
              text-black/70
              mt-1
            "
          >
            ₹{product.price}
          </p>

        </div>

      </div>
    </Link>
  );
}

export default memo(ProductCard);