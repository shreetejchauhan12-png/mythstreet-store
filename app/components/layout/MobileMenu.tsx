"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function MobileMenu({ open, setOpen }: Props) {
  const [menOpen, setMenOpen] = useState(true);
  const [womenOpen, setWomenOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          className="
fixed inset-0
bg-black/50
backdrop-blur-sm
z-40
transition-opacity duration-300
"
          onClick={() => setOpen(false)}
        />
      )}

      <div
  style={{
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0.96), rgba(255,255,255,0.92))",
  }}
  className={`
fixed top-0 left-0
h-full w-[90%] max-w-sm

bg-white/95
backdrop-blur-2xl

z-50
transition-transform duration-500 ease-out

overflow-y-auto

shadow-[0_0_40px_rgba(0,0,0,0.12)]

${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* header */}
        <div className="
flex items-center justify-between
px-6 py-5
border-b border-black/5
">
  <h2 className="
text-[11px]
tracking-[0.35em]
text-black/40
uppercase
font-medium
">
    Menu
  </h2>

          <X
  className="
    cursor-pointer
    w-5 h-5
    text-black/70
    hover:rotate-90
    transition duration-300
  "
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="px-6 py-3">

          {/* MEN */}
          <div className="py-4 border-b border-gray-100">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setMenOpen(!menOpen)}
            >
              <p className="text-[11px] tracking-[0.35em] text-black/40 uppercase font-medium">
  Men
</p>
              <ChevronDown
                className={`
w-4 h-4
text-black/50
transition duration-300
${
                  menOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {menOpen && (
              <div className="
mt-5
grid grid-cols-2
gap-y-4 gap-x-6
text-sm
pl-1
">

                <Link
  href="/shop/men/all"
  onClick={() => setOpen(false)}
  className="
    text-[15px]
    tracking-wide
    text-black/75
    hover:text-[#680000]
    transition-all duration-300
  "
>
  All
</Link>

                <Link
  href="/shop/men/oversized"
  onClick={() => setOpen(false)}
  className="
    text-[15px]
    tracking-wide
    text-black/75
    hover:text-[#680000]
    transition-all duration-300
  "
>
  Oversized
</Link>

                <Link
  href="/shop/men/tshirt"
  onClick={() => setOpen(false)}
  className="
text-[15px]
tracking-wide
text-black/75
hover:text-[#680000]
transition-all duration-300
"
>
  T-Shirts
</Link>

                <Link
  href="/shop/men/hoodie"
  onClick={() => setOpen(false)}
  className="
    text-[15px]
    tracking-wide
    text-black/75
    hover:text-[#680000]
    transition-all duration-300
  "
>
  Hoodies
</Link>

                <Link
  href="/shop/men/sweatshirt"
  onClick={() => setOpen(false)}
  className="
    text-[15px]
    tracking-wide
    text-black/75
    hover:text-[#680000]
    transition-all duration-300
  "
>
  Sweatshirts
</Link>

              </div>
            )}
          </div>

          {/* WOMEN */}
          <div className="py-4 border-b border-gray-100">
            <div
              className="flex justify-between items-center cursor-pointer py-2 active:opacity-60"
              onClick={() => setWomenOpen(!womenOpen)}
            >
              <p className="text-[11px] tracking-[0.35em] text-black/40 uppercase font-medium">
  Women
</p>
              <ChevronDown
                className={`transition ${
                  womenOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {womenOpen && (
              <div className="
mt-5
grid grid-cols-2
gap-y-4 gap-x-6
text-sm
pl-1
">

                <Link href="/shop/women/all" onClick={() => setOpen(false)}>
  All
</Link>

                <Link href="/shop/women/oversized" onClick={() => setOpen(false)}>
                  Oversized
                </Link>

                <Link href="/shop/women/tshirt" onClick={() => setOpen(false)}>
                  T-Shirts
                </Link>

                <Link href="/shop/women/hoodie" onClick={() => setOpen(false)}>
                  Hoodies
                </Link>

                <Link href="/shop/women/sweatshirt" onClick={() => setOpen(false)}>
                  Sweatshirts
                </Link>

              </div>
            )}
          </div>

          {/* categories */}
          <div className="py-6 space-y-5 text-sm border-t border-gray-100 mt-6">

            <Link
              href="/shop/all/all"
              onClick={() => setOpen(false)}
              className="
block
text-[15px]
tracking-wide
text-black/75
hover:text-[#680000]
transition-all duration-300
py-2
"
            >
              New Arrivals
            </Link>

            <Link
              href="/shop/all/oversized"
              onClick={() => setOpen(false)}
              className="
block
text-[15px]
tracking-wide
text-black/75
hover:text-[#680000]
transition-all duration-300
py-2
"
            >
              Oversized
            </Link>

            <button
  onClick={() => {
    setOpen(false);

    const isLoggedIn = localStorage.getItem("user");

    if (isLoggedIn) {
      window.location.href = "/account";
    } else {
      window.location.href = "/login";
    }
  }}
  className="block w-full text-left text-gray-700 hover:text-black active:scale-95 transition-all duration-150 py-1.5"
>
  My Account
</button>

            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="
block
text-[15px]
tracking-wide
text-black/75
hover:text-[#680000]
transition-all duration-300
py-2
"

            >
              Wishlist
            </Link>
<div className="pt-10 pb-6">

  <div className="h-px bg-black/10 mb-6" />

  <p className="
    text-[10px]
    tracking-[0.35em]
    uppercase
    text-black/35
    mb-3
  ">
    MythStreet
  </p>

  <h2 className="
    text-3xl
    font-black
    tracking-tight
    leading-none
  ">
    BUILT FOR
    <span className="block text-[#680000]">
      THE STREETS
    </span>
  </h2>

</div>
          </div>

        </div>
      </div>
    </>
  );
}