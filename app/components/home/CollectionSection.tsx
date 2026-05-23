"use client";

import Link from "next/link";

export default function CollectionSection() {
  const collections = [
    {
      name: "Spiritual",
      slug: "spiritual",
      image: "/ct2.jpg",
    },
    {
      name: "Anime",
      slug: "anime",
      image: "/ct3.jpg",
    },
    {
      name: "Marvel",
      slug: "marvel",
      image: "/ct1.jpg",
    },
    {
      name: "Streetwear",
      slug: "streetwear",
      image: "/ct4.jpg",
    },
    {
      name: "Minimal",
      slug: "minimal",
      image: "/ct5.jpg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-2">

      {/* TITLE */}
      <div className="text-center mb-5">

        <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">
          SHOP BY
        </p>

        <h2 className="text-[34px] md:text-5xl font-black tracking-tight leading-none uppercase">
          COLLECTIONS
        </h2>

        <span className="block w-10 h-px bg-[#680000] mx-auto mt-3"></span>

      </div>

      {/* MOBILE */}
      <div className="flex md:hidden gap-3 overflow-x-auto scrollbar-hide pb-1">

        {collections.map((item, i) => (
          <Link
            key={i}
            href={`/shop/all/all?collection=${item.slug}`}
            className="shrink-0"
          >
            <div className="group cursor-pointer w-22">

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[28px] aspect-3/4 shadow-sm">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    transition duration-700 ease-out
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

              </div>

              {/* TEXT */}
              <p className="text-center text-lg font-medium mt-3 tracking-tight leading-tight">
                {item.name}
              </p>

            </div>
          </Link>
        ))}

      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-5 gap-6">

        {collections.map((item, i) => (
          <Link
            key={i}
            href={`/shop/all/all?collection=${item.slug}`}
          >
            <div className="group cursor-pointer">

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[28px] aspect-3/4 shadow-sm hover:shadow-xl transition duration-300">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    absolute inset-0
                    w-full h-full
                    object-cover
                    transition duration-700 ease-out
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

              </div>

              {/* TEXT */}
              <p className="text-center text-lg font-medium mt-3 tracking-tight">
                {item.name}
              </p>

            </div>
          </Link>
        ))}

      </div>

    </section>
  );
}