"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrendingBanner({
  products,
}: {
  products: any[];
}) {
  const [slides, setSlides] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  // HERO PRODUCTS ONLY
  useEffect(() => {
    const clean = Array.isArray(products)
      ? products
      : [];

    const heroProducts = clean.filter(
      (p) => p.is_hero
    );

    setSlides(heroProducts);
  }, [products]);

  // AUTO SLIDE
  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setIndex((prev) =>
        (prev + 1) % slides.length
      );
    }, 4500);

    return () => clearInterval(timer);
  }, [slides]);

  if (!slides.length) return null;

  const current = slides[index];

  return (
    <section className="pt-2 md:pt-6 pb-4 md:pb-8">

      {/* HEADER */}
      <div className="text-center mb-5 md:mb-7">

        <p className="text-[11px] tracking-[0.35em] text-gray-400 uppercase mb-2">
          Trending
        </p>

        <h2 className="text-[34px] md:text-5xl font-black tracking-tight leading-none uppercase">
          TRENDING NOW
        </h2>

        <div className="w-14 h-px bg-[#680000] mx-auto mt-4"></div>

      </div>

      {/* BANNER */}
      <div className="max-w-7xl mx-auto px-4">

        <Link href={`/product/${current.id}`}>

          <div className="group relative overflow-hidden rounded-[28px] bg-black cursor-pointer shadow-2xl">

            {/* HERO RATIO */}
            <div className="pt-[45%] md:pt-[42%]" />

            {/* IMAGE */}
            <img
              src={current.banner || current.image}
              alt={current.title}
              className="
                absolute inset-0
                w-full h-full
                object-cover
                transition-all duration-700
                group-hover:scale-[1.03]
              "
            />

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

            {/* MINI BUTTONS */}
            <div className="
              absolute bottom-4 left-4 z-20
              flex gap-2
            ">

              {/* SHOP */}
              <button
                className="
                  bg-[#680000]/90
                  backdrop-blur-xl
                  text-white
                  px-4 py-2
                  rounded-xl
                  text-[10px]
                  tracking-[0.18em]
                  uppercase
                  font-medium
                  border border-white/10
                "
              >
                Shop
              </button>

              {/* CATEGORY */}
              <button
                className="
                  bg-zinc-800/70
                  backdrop-blur-xl
                  text-white
                  px-4 py-2
                  rounded-xl
                  text-[10px]
                  tracking-[0.18em]
                  uppercase
                  font-medium
                  border border-white/10
                "
              >
                Trending
              </button>

            </div>

            {/* DOTS */}
            <div className="
              absolute
              bottom-3 md:bottom-6
              left-1/2
              -translate-x-1/2
              flex gap-2
              z-20
            ">

              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 h-1.5 bg-white"
                      : "w-2 h-2 bg-white/40"
                  }`}
                />
              ))}

            </div>

          </div>

        </Link>

      </div>

    </section>
  );
}