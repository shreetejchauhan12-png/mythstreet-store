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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 md:pt-2 pb-3 md:pb-6">

      {/* TITLE */}
      <div className="text-center mb-3 md:mb-6">

        <p className="text-[11px] tracking-[0.35em] text-gray-400 mb-1 uppercase">
          Shop By
        </p>

        <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
          Categories
        </h2>

        <span className="block w-14 h-px bg-[#680000] mx-auto mt-3"></span>

      </div>

      {/* MOBILE */}
      <div className="flex md:hidden gap-3 overflow-x-auto scrollbar-hide pb-1">

        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/shop/all/${cat.type}`}
            className="shrink-0"
          >
            <div className="group cursor-pointer w-[105px]">

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[22px] aspect-[3/4] shadow-sm">

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

              </div>

              {/* TEXT */}
              <p className="text-center text-[15px] font-medium mt-1.5 tracking-tight leading-tight">
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

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[28px] aspect-[3/4] shadow-sm hover:shadow-xl transition duration-300">

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

              </div>

              {/* TEXT */}
              <p className="text-center text-lg font-medium mt-3 tracking-tight">
                {cat.name}
              </p>

            </div>
          </Link>
        ))}

      </div>

    </section>
  );
}