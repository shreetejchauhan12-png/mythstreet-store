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
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 transition transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>

          <X
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="p-4">

          {/* MEN */}
          <div className="border-b py-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setMenOpen(!menOpen)}
            >
              <p className="font-semibold">MEN</p>
              <ChevronDown
                className={`transition ${
                  menOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {menOpen && (
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">

                <Link href="/shop/men" onClick={() => setOpen(false)}>
                  All
                </Link>

                <Link href="/shop/men/oversized" onClick={() => setOpen(false)}>
                  Oversized
                </Link>

                <Link href="/shop/men/tshirt" onClick={() => setOpen(false)}>
                  T-Shirts
                </Link>

                <Link href="/shop/men/hoodie" onClick={() => setOpen(false)}>
                  Hoodies
                </Link>

                <Link href="/shop/men/sweatshirt" onClick={() => setOpen(false)}>
                  Sweatshirts
                </Link>

              </div>
            )}
          </div>

          {/* WOMEN */}
          <div className="border-b py-3">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setWomenOpen(!womenOpen)}
            >
              <p className="font-semibold">WOMEN</p>
              <ChevronDown
                className={`transition ${
                  womenOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {womenOpen && (
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">

                <Link href="/shop/women" onClick={() => setOpen(false)}>
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
          <div className="py-4 space-y-4 text-sm">

            <Link
              href="/search?q=new"
              onClick={() => setOpen(false)}
              className="block"
            >
              New Arrivals
            </Link>

            <Link
              href="/search?q=oversized"
              onClick={() => setOpen(false)}
              className="block"
            >
              Oversized
            </Link>

            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="block"
            >
              My Account
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="block"
            >
              Wishlist
            </Link>

          </div>

        </div>
      </div>
    </>
  );
}