"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const slides = [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop",
  ];

  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((index - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((index + 1) % slides.length);
  }

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl">

          <div className="pt-[42%]" />

          <img
            src={slides[index]}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
            <div>

              <p className="tracking-widest mb-2 text-xs md:text-sm text-white/80">
  WELCOME TO
</p>

<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
  STREET HOMIE
</h1>

<p className="text-sm md:text-base text-white/80 mb-6">
  Built for the streets. Worn everywhere.
</p>

<button
  onClick={() => router.push("/shop/all/all")}
  className="bg-[#680000] px-6 py-2 md:px-8 md:py-3 hover:bg-black transition rounded"
>
  SHOP ALL
</button>

            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronRight />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}