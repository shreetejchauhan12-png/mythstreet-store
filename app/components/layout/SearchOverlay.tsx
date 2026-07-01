"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  Search,
  X,
} from "lucide-react";
type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({
  open,
  onClose,
}: Props) {

  const [search, setSearch] = useState("");

  const [filtered, setFiltered] =
    useState<any[]>([]);

  useEffect(() => {

    if (!search.trim()) {
      setFiltered([]);
      return;
    }

    const delay = setTimeout(async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?q=${search}`
        );

        const data = await res.json();

        setFiltered(
  Array.from(
    new Map(
      data.map((item: any) => [
        `${item.design_id}-${item.garment_type_id}`,
        item,
      ])
    ).values()
  )
);

      } catch (error) {

        console.error(
          "Search failed",
          error
        );

      }

    }, 250);

    return () => clearTimeout(delay);

  }, [search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">

      <div className="
fixed inset-0
bg-white
overflow-y-auto
p-5 md:p-8
animate-in fade-in duration-200
">

        <div className="max-w-4xl mx-auto">

          <div className="
flex items-center gap-4
border-b border-black/10
pb-4
sticky top-0
bg-white
z-20
">

            <Search className="w-5 h-5" />

            <input
              placeholder="Search for products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  window.location.href =
                    `/search?q=${search}`;

                }

              }}
              className="
flex-1
outline-none
text-lg
"
            />

            <X
              className="cursor-pointer"
              onClick={onClose}
            />

          </div>

          {!search && (

            <div className="mt-10">

              <p className="
text-xs
tracking-[0.2em]
uppercase
text-gray-400
mb-4
">

                Trending Searches

              </p>

              <div className="
flex flex-wrap gap-3
">

                {[
                  "Naruto",
                  "Oversized",
                  "Gojo",
                  "Hoodie",
                  "Solo Leveling",
                  "Attack on Titan",
                ].map((term) => (

                  <button
                    key={term}
                    onClick={() =>
                      setSearch(term)
                    }
                    className="
px-4 py-2
rounded-full
border
text-sm
hover:bg-black
hover:text-white
transition-all duration-300
"
                  >
                    {term}
                  </button>

                ))}

              </div>

            </div>

          )}

          {search && (

            <div className="
mt-8
space-y-2
">

              {filtered.length === 0 && (

                <div className="
p-6
text-center
text-sm
text-gray-500
">

                  No products found

                </div>

              )}

              {filtered.map((item) => (

                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  onClick={onClose}
                >

                  <div className="
flex gap-4
p-3
rounded-2xl
hover:bg-gray-50
transition-all duration-300
hover:scale-[1.01]
border border-transparent
hover:border-gray-200
">

                    <Image
                      src={`/${item.design}-${item.variant_code}-1.webp`}
                      alt={item.title}
                      width={56}
                      height={64}
                      quality={70}
                      className="
w-14 h-16
object-cover
rounded-md
"
                    />

                    <div className="
flex flex-col
justify-center
">

                      <p className="
text-sm
font-semibold
tracking-wide
">

                        {item.title}

                      </p>

                      <p className="
text-sm
text-[#680000]
mt-1
">

                        ₹{item.price}

                      </p>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}