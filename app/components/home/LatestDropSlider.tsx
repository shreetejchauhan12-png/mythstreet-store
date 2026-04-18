"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "@/app/data/products";
import Link from "next/link";

export default function LatestDropSlider() {
  const [slides, setSlides] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  // ✅ FETCH LATEST 3 PRODUCTS
  useEffect(() => {
    getProducts().then((data) => {
      setSlides(data.slice(0, 3)); // 🔥 NEWEST 3
    });
  }, []);

  function prev() {
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  }

  function next() {
    setIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  }

  if (!slides.length) return null;

  const current = slides[index];

  return (
    <section className="py-12 md:py-16">

      {/* HEADER (same style as trending) */}
      <div className="text-center mb-8">
        <p className="text-xs tracking-widest text-gray-500 uppercase">
          Latest
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold">
          LATEST DROPS
        </h2>

        <div className="w-12 h-px bg-[#680000] mx-auto mt-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl">

          {/* ✅ SAME RATIO (37.5%) */}
          <div className="relative w-full pt-[37.5%]">

            <Link href={`/product/${current.id}`}>
              <img
                src={current.banner || `/p${current.id}.jpg`}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              />
            </Link>

            {/* LEFT */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>

            {/* RIGHT */}
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>

          </div>

        </div>
      </div>

    </section>
  );
}