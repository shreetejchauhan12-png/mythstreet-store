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

        <h2 className="text-[34px] md:text-5xl font-semibold tracking-wide leading-none">
          TRENDING NOW
        </h2>

        <div className="w-14 h-px bg-[#680000] mx-auto mt-4"></div>

      </div>

      {/* BANNER */}
      <div className="max-w-7xl mx-auto px-4">

        <Link href={`/product/${current.id}`}>

          <div className="group relative overflow-hidden rounded-[28px] bg-black cursor-pointer shadow-2xl">

            {/* HEIGHT */}
            <div className="h-55 sm:h-80 md:h-130" />

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

            {/* CINEMATIC OVERLAYS */}
            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

            {/* CONTENT */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end">

              <div className="p-5 md:p-12 max-w-125">

                <p className="text-white/70 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3">
                  MythStreet Exclusive
                </p>

                <h3 className="text-white text-2xl md:text-6xl font-semibold leading-none mb-3">
                  {current.title}
                </h3>

                <p className="hidden md:block text-white/70 text-sm leading-relaxed mb-6">
                  Premium streetwear crafted for the bold.
                  Designed to dominate the streets.
                </p>

                {/* BUTTON */}
                <button
                  className="
                    bg-[#680000]
                    hover:bg-white
                    hover:text-black
                    text-white
                    px-6 py-3
                    md:px-8 md:py-4
                    text-xs md:text-sm
                    font-semibold
                    tracking-[0.2em]
                    rounded-lg
                    transition-all duration-300
                    shadow-2xl
                  "
                >
                  SHOP NOW
                </button>

              </div>

            </div>

            {/* SLIDE INDICATORS */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">

              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 h-2 bg-white"
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