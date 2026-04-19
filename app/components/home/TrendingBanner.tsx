"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/app/data/products";
import Link from "next/link";

export default function TrendingBanner() {
  const [slides, setSlides] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // ✅ FETCH LATEST 8 PRODUCTS (ID BASED - MOST RELIABLE)
  useEffect(() => {
    getProducts().then((data) => {
      const clean = Array.isArray(data) ? data : [];

      // 🔥 SORT BY ID (NEWEST FIRST)
      const sorted = clean.sort((a, b) => b.id - a.id);

      // 🔥 TAKE ONLY LATEST 8
      setSlides(sorted.slice(0, 8));
    });
  }, []);

  // ✅ AUTO SLIDER
  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides]);

  if (!slides.length) return null;

  const current = slides[index];

  return (
    <section className="py-12 md:py-16">
      
      {/* HEADER */}
      <div className="text-center mb-8">
        <p className="text-xs tracking-widest text-gray-500 uppercase">
          Trending
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold">
          TRENDING NOW
        </h2>

        <div className="w-12 h-px bg-[#680000] mx-auto mt-3"></div>
      </div>

      {/* BANNER */}
      <div className="max-w-7xl mx-auto px-4">
        <Link href={`/product/${current.id}`}>
          <div className="relative overflow-hidden rounded-xl cursor-pointer">

            {/* ✅ FIXED RATIO */}
            <div className="relative w-full pt-[37.5%]">

              <img
                src={current.banner || current.image}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  fade
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="backdrop-blur-md bg-white/10 border border-white/40 text-white px-7 py-2 text-xs tracking-widest hover:bg-white hover:text-black transition">
                  SHOP NOW
                </button>
              </div>

            </div>

          </div>
        </Link>
      </div>

    </section>
  );
}