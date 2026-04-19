"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "@/app/data/products";
import Link from "next/link";

export default function LatestDropSlider() {
  const [slides, setSlides] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // ✅ FETCH LATEST 3 PRODUCTS
  useEffect(() => {
    getProducts().then((data) => {
      const clean = Array.isArray(data) ? data : [];

      const sorted = clean.sort((a, b) => Number(b.id) - Number(a.id));

      const mapped = sorted.map((item) => {
        const imgIndex = ((item.id - 1) % 8) + 1;

        return {
          ...item,
          banner: `/banner${imgIndex}.jpg`,
          image: `/p${imgIndex}.jpg`,
        };
      });

      setSlides(mapped.slice(0, 3));
    });
  }, []);

  // ✅ AUTO SLIDE (6 SEC)
  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      next();
    }, 6000);

    return () => clearInterval(timer);
  }, [slides, index]);

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

  // ✅ SWIPE HANDLERS
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) next();
    else if (diff < -50) prev();
  }

  if (!slides.length) return null;

  return (
    <section className="py-12 md:py-16">

      {/* HEADER */}
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
        <div
          className="relative overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {/* SLIDER TRACK */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {slides.map((item: any) => (
              <div
                key={item.id}
                className="min-w-full relative"
              >
                <div className="relative w-full pt-[37.5%]">

                  <Link href={`/product/${item.id}`}>
                    <img
                      src={item.banner || item.image}
                      className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                    />
                  </Link>

                </div>
              </div>
            ))}
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow z-10"
          >
            <ChevronLeft />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow z-10"
          >
            <ChevronRight />
          </button>

        </div>
      </div>

    </section>
  );
}