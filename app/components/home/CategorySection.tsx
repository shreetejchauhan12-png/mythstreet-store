"use client";

import Link from "next/link";

export default function CategorySection() {
  const categories = [
    {
      name: "Oversized",
      type: "oversized-t-shirt",
      image: "/pk1.jpg",
    },
    {
      name: "T-Shirts",
      type: "tshirt",
      image: "/pk2.jpg",
    },
    {
      name: "Hoodies",
      type: "hoodie",
      image: "/pk3.jpg",
    },
    {
      name: "Sweatshirts",
      type: "sweatshirt",
      image: "/pk4.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-2">

      {/* title */}
      <div className="text-center mb-5">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">
          SHOP BY
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
          CATEGORIES
        </h2>

        <span className="block w-10 h-px bg-[#680000] mx-auto mt-2"></span>
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden gap-3 overflow-x-auto scrollbar-hide pb-1">

        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/shop/all/${cat.type}`}
            className="shrink-0"
          >
            <div className="group cursor-pointer w-22">

              {/* image */}
              <div className="relative overflow-hidden rounded-2xl aspect-3/4 shadow-sm">

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

              </div>

              {/* text */}
              <p className="text-center text-[11px] font-medium mt-2 tracking-wide leading-tight">
                {cat.name}
              </p>

            </div>
          </Link>
        ))}

      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-4 gap-6">

        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/shop/all/${cat.type}`}
          >
            <div className="group cursor-pointer">

              {/* image */}
              <div className="relative overflow-hidden rounded-2xl aspect-3/4 shadow-sm hover:shadow-xl transition duration-300">

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

              </div>

              {/* text */}
              <p className="text-center text-sm font-medium mt-3 tracking-wide">
                {cat.name}
              </p>

            </div>
          </Link>
        ))}

      </div>

    </section>
  );
}