"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function LatestDropSlider({
  products,
}: {
  products: any[];
}) {
  const [items, setItems] = useState<any[]>([]);
  const [start, setStart] = useState(0);

  // LATEST PRODUCTS
  useEffect(() => {
    const clean = Array.isArray(products)
      ? products
      : [];

    const sorted = [...clean].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );

    setItems(sorted.slice(0, 10));
  }, [products]);

  function next() {
    if (start < items.length - 2) {
      setStart(start + 1);
    }
  }

  function prev() {
    if (start > 0) {
      setStart(start - 1);
    }
  }

  if (!items.length) return null;

  return (
    <section className="pt-3 md:pt-8 pb-4 md:pb-10">

      {/* HEADER */}
      <div className="text-center mb-5 md:mb-8">

        <p className="text-[11px] tracking-[0.35em] text-gray-400 uppercase mb-2">
          Latest
        </p>

        <h2 className="text-[34px] md:text-5xl font-semibold tracking-wide leading-none">
          LATEST DROPS
        </h2>

        <div className="w-14 h-px bg-[#680000] mx-auto mt-4"></div>

      </div>

      {/* SLIDER */}
      <div className="relative max-w-7xl mx-auto px-4">

        {/* LEFT */}
        <button
          onClick={prev}
          className="
            hidden md:flex
            absolute left-0 top-1/2 -translate-y-1/2 z-20
            w-11 h-11
            items-center justify-center
            rounded-full
            bg-white shadow-xl
            border
            hover:scale-110
            transition
          "
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT */}
        <button
          onClick={next}
          className="
            hidden md:flex
            absolute right-0 top-1/2 -translate-y-1/2 z-20
            w-11 h-11
            items-center justify-center
            rounded-full
            bg-white shadow-xl
            border
            hover:scale-110
            transition
          "
        >
          <ChevronRight size={20} />
        </button>

        {/* PRODUCTS */}
        <div className="overflow-x-auto scrollbar-hide">

          <div className="flex gap-4 md:gap-6">

            {items.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className="
                  min-w-45
                  md:min-w-70
                  group
                "
              >

                {/* CARD */}
                <div className="relative overflow-hidden rounded-3x1 bg-[#f5f5f5]">

                  {/* IMAGE */}
                  <div className="relative aspect-3/4 overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        absolute inset-0
                        w-full h-full
                        object-cover
                        transition duration-700
                        group-hover:scale-[1.04]
                      "
                    />

                    {/* HOVER IMAGE */}
                    {item.hoverRight && (
                      <img
                        src={item.hoverRight}
                        alt={item.title}
                        className="
                          absolute inset-0
                          w-full h-full
                          object-cover
                          opacity-0
                          group-hover:opacity-100
                          transition duration-700
                        "
                      />
                    )}

                    {/* BADGE */}
                    <div className="absolute top-3 left-3 bg-black text-white text-[10px] tracking-widest px-3 py-1 rounded-md">
                      NEW DROP
                    </div>

                    {/* WISHLIST */}
                    <button
                      className="
                        absolute top-3 right-3
                        w-10 h-10
                        rounded-full
                        bg-white/90
                        backdrop-blur-md
                        flex items-center justify-center
                        shadow-lg
                      "
                    >
                      <Heart size={18} />
                    </button>

                  </div>

                </div>

                {/* INFO */}
                <div className="pt-3">

                  <h3 className="text-sm md:text-base font-medium line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-sm md:text-base mt-1 text-black/70">
                    ₹{item.price}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}