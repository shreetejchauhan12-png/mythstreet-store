"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

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

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-2 md:pt-4 pb-4 md:pb-6">

      <div className="max-w-7xl mx-auto px-2 md:px-4">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[28px] bg-black shadow-2xl">

          {/* HEIGHT */}
          <div className="h-57.5 sm:h-80 md:h-130" />

          {/* IMAGE */}
          <img
            src={slides[index]}
            alt="MythStreet Hero"
            className="
              absolute inset-0
              w-full h-full
              object-cover
              transition-all duration-700
              scale-[1.02]
            "
          />

          {/* CINEMATIC OVERLAYS */}
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/10 to-transparent" />

          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* CONTENT */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end">

            <div className="p-5 md:p-12">

              {/* MINI TEXT */}
              <p className="
                text-[10px] md:text-sm
                tracking-[0.35em]
                text-white/70
                uppercase
                mb-2
              ">
                Premium Streetwear
              </p>

              {/* MAIN TEXT */}
              <h1 className="
                text-3xl
                md:text-6xl
                font-black
                leading-none
                tracking-tight
                text-white
                max-w-xl
              ">
                BUILT FOR
                <span className="block text-[#8B0000]">
                  THE STREETS
                </span>
              </h1>

              {/* SUBTEXT */}
              <p className="
                mt-3
                text-xs md:text-base
                text-white/75
                max-w-md
                leading-relaxed
              ">
                Premium oversized streetwear crafted for bold identity,
                luxury aesthetics, and modern culture.
              </p>

              {/* CTA */}
              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => router.push("/shop/all/all")}
                  className="
                    bg-[#8B0000]
                    hover:bg-white
                    hover:text-black
                    text-white
                    px-5 py-3
                    md:px-8
                    rounded-xl
                    font-semibold
                    tracking-wide
                    transition-all duration-300
                    shadow-2xl
                    hover:scale-105
                  "
                >
                  SHOP NOW
                </button>

                <button
                  onClick={() => router.push("/shop/all/oversized-t-shirt")}
                  className="
                    border border-white/20
                    bg-white/10
                    backdrop-blur-md
                    hover:bg-white
                    hover:text-black
                    text-white
                    px-5 py-3
                    md:px-8
                    rounded-xl
                    font-semibold
                    tracking-wide
                    transition-all duration-300
                  "
                >
                  OVERSIZED
                </button>

              </div>

            </div>

          </div>

          {/* LEFT */}
          <button
            onClick={prev}
            className="
              absolute
              left-3 md:left-5
              top-1/2
              -translate-y-1/2
              z-20

              w-10 h-10 md:w-12 md:h-12
              rounded-full

              bg-black/35
              hover:bg-[#8B0000]

              backdrop-blur-xl
              border border-white/10

              flex items-center justify-center

              text-white
              transition-all duration-300
            "
          >
            <ChevronLeft size={22} />
          </button>

          {/* RIGHT */}
          <button
            onClick={next}
            className="
              absolute
              right-3 md:right-5
              top-1/2
              -translate-y-1/2
              z-20

              w-10 h-10 md:w-12 md:h-12
              rounded-full

              bg-black/35
              hover:bg-[#8B0000]

              backdrop-blur-xl
              border border-white/10

              flex items-center justify-center

              text-white
              transition-all duration-300
            "
          >
            <ChevronRight size={22} />
          </button>

          {/* DOTS */}
          <div className="
            absolute
            bottom-4 md:bottom-6
            left-1/2
            -translate-x-1/2
            flex gap-2
            z-20
          ">

            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`
                  transition-all duration-300 rounded-full

                  ${
                    i === index
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/40"
                  }
                `}
              />
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}