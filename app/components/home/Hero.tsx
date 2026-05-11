"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  // ✅ YOUR LOCAL HERO BANNERS
  const slides = [
    "/hr1.jpg",
    "/bn10.jpg",
    "/hr3.jpg",
  ];

  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((prev) => (prev + 1) % slides.length);
  }

  return (
    <section className="py-3 md:py-5">
      <div className="max-w-7xl mx-auto px-3 md:px-4">

        {/* HERO WRAPPER */}
        <div className="relative overflow-hidden rounded-2xl bg-black">

          {/* RATIO */}
          <div className="pt-[48%] md:pt-[42%]" />

          {/* IMAGE */}
          <img
            src={slides[index]}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/10" />

          {/* BUTTON ONLY */}
<div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 z-10">

  <button
    onClick={() => router.push("/shop/all/all")}
    className="
      bg-[#8B0000]
      hover:bg-black
      text-white
      px-5 py-2
      md:px-8 md:py-3
      text-sm md:text-base
      font-semibold
      tracking-wide
      rounded-md
      transition-all duration-300
      shadow-2xl
      border border-white/10
      hover:scale-[1.03]
    "
  >
    SHOP ALL
  </button>

</div>

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="
              absolute left-3 md:left-5 top-1/2 -translate-y-1/2
              bg-black/40 hover:bg-black/70
              text-white
              p-2 md:p-3
              rounded-full
              backdrop-blur-md
              transition
              z-10
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="
              absolute right-3 md:right-5 top-1/2 -translate-y-1/2
              bg-black/40 hover:bg-black/70
              text-white
              p-2 md:p-3
              rounded-full
              backdrop-blur-md
              transition
              z-10
            "
          >
            <ChevronRight size={20} />
          </button>

          {/* DOTS */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  i === index
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}