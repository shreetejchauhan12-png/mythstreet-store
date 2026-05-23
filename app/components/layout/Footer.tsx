"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white mt-16 overflow-hidden">

      {/* TOP GLOW */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#680000] to-transparent opacity-60" />

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">

        {/* TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">

          {/* BRAND */}
          <div className="col-span-2 md:col-span-1">

            <h2 className="text-3xl md:text-4xl font-black tracking-[0.25em] mb-5">
              MYTHSTREET
            </h2>

            <p className="text-white/60 text-sm leading-7 max-w-xs mb-7">
              Premium streetwear crafted for modern culture,
              bold identity, and luxury aesthetics.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-5 text-sm tracking-wide">

              <a
                href="#"
                className="text-white/50 hover:text-white transition"
              >
                INSTAGRAM
              </a>

              <a
                href="#"
                className="text-white/50 hover:text-white transition"
              >
                X
              </a>

              <a
                href="#"
                className="text-white/50 hover:text-white transition"
              >
                YOUTUBE
              </a>

            </div>

          </div>

          {/* SHOP */}
          <div>

            <h3 className="text-sm tracking-[0.2em] text-white mb-5">
              SHOP
            </h3>

            <div className="space-y-3 text-sm text-white/55">

              <Link
                href="/shop/all/tshirt"
                className="block hover:text-white transition"
              >
                T-Shirts
              </Link>

              <Link
                href="/shop/all/oversized-t-shirt"
                className="block hover:text-white transition"
              >
                Oversized
              </Link>

              <Link
                href="/shop/all/hoodie"
                className="block hover:text-white transition"
              >
                Hoodies
              </Link>

              <Link
                href="/shop/all/sweatshirt"
                className="block hover:text-white transition"
              >
                Sweatshirts
              </Link>

            </div>

          </div>

          {/* COMPANY */}
          <div>

            <h3 className="text-sm tracking-[0.2em] text-white mb-5">
              COMPANY
            </h3>

            <div className="space-y-3 text-sm text-white/55">

              <Link
                href="/policies/about"
                className="block hover:text-white transition"
              >
                About
              </Link>

              <Link
                href="/policies/contact"
                className="block hover:text-white transition"
              >
                Contact
              </Link>

              <Link
                href="/policies/support"
                className="block hover:text-white transition"
              >
                Support
              </Link>

            </div>

          </div>

          {/* POLICIES */}
          <div>

            <h3 className="text-sm tracking-[0.2em] text-white mb-5">
              POLICIES
            </h3>

            <div className="space-y-3 text-sm text-white/55">

              <Link
                href="/policies/returns"
                className="block hover:text-white transition"
              >
                Returns
              </Link>

              <Link
                href="/policies/privacy"
                className="block hover:text-white transition"
              >
                Privacy
              </Link>

              <Link
                href="/policies/terms"
                className="block hover:text-white transition"
              >
                Terms
              </Link>

            </div>

          </div>

        </div>

        {/* HUGE BACKGROUND TEXT */}
        <div className="mt-20 hidden md:block">

          <h1 className="
            text-[120px]
            leading-none
            font-black
            tracking-tight
            text-white/3
            select-none
          ">
            MYTHSTREET
          </h1>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs tracking-wide text-white/40">
            © 2026 MYTHSTREET. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-5 text-xs tracking-[0.2em] text-white/40">

            <span>INDIA</span>

            <span>INR ₹</span>

            <span>PREMIUM STREETWEAR</span>

          </div>

        </div>

      </div>

    </footer>
  );
}