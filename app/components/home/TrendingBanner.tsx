"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TrendingBanner({
  products,
}: {
  products: any[];
}) {
  const [index, setIndex] = useState(0);

  // ✅ DIRECT COMPUTATION (NO HYDRATION SHIFT)
  const slides = Array.isArray(products)
    ? products.filter((p) => p.is_hero)
    : [];

  // AUTO SLIDE
  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  const current = slides[index];

  return (
    <section className="pt-0 pb-0">

      <div className="max-w-7xl mx-auto md:px-4">

        <Link href={`/product/${current.id}`}>

          <div className="group relative overflow-hidden bg-black cursor-pointer md:rounded-[28px] shadow-2xl">

            {/* HERO RATIO */}
            <div className="aspect-[21/9]" />

            {/* IMAGE */}
            <Image
              src={current.banner || current.image}
              alt={current.title}
              fill
              sizes="100vw"
              className="
                object-cover
                transition-all duration-700
                group-hover:scale-[1.03]
              "
            />

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-black/15" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* MINI BUTTONS */}
            <div
              className="
                absolute bottom-4 left-4 z-20
                flex gap-2
              "
            >
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
            <div
              className="
                absolute
                bottom-3
                left-1/2
                -translate-x-1/2
                flex gap-2
                z-20
              "
            >
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