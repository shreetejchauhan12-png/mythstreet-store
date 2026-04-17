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
      setSlides(data.slice(0, 3));
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
    <section className="py-14">
      <h2 className="text-2xl font-bold text-center mb-6">
        Latest Drops
      </h2>

      <div className="relative max-w-7xl mx-auto">

        {/* ✅ FIXED RATIO CONTAINER (16:9) */}
        <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">

          <Link href={`/product/${current.id}`}>
            <img
              src={current.banner}
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
    </section>
  );
}