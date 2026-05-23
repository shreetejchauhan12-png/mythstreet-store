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
          <div className="pt-[45%] md:pt-[42%]" />

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


          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* MINI BUTTONS */}
<div className="
absolute bottom-4 left-4 z-20
flex gap-2
">

  {/* SHOP */}
  <button
    onClick={() => router.push("/shop/all/all")}
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
    onClick={() => router.push("/shop/all/oversized-t-shirt")}
    className="
    bg-black/40
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
    Oversized
  </button>

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

              w-9 h-9 md:w-11 md:h-11
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

              w-9 h-9 md:w-11 md:h-11
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
            bottom-3 md:bottom-6
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
                      ? "w-6 h-1.5 bg-white"
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