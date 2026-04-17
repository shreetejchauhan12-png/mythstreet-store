"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* brand */}
        <div>
          <h2 className="text-2xl font-semibold tracking-widest mb-4">
            MYTHSTREET
          </h2>

          <p className="text-gray-400 text-sm leading-6 mb-6">
            Premium streetwear designed for modern culture.
          </p>

          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>

            <a href="#" className="hover:text-white transition">
              Twitter
            </a>

            <a href="#" className="hover:text-white transition">
              Youtube
            </a>
          </div>
        </div>

        {/* shop */}
        <div>
          <h3 className="font-medium mb-4">Shop</h3>

          <div className="space-y-2 text-gray-400 text-sm">
            <Link href="/shop/all/tshirt" className="block hover:text-white transition">
              T-Shirts
            </Link>

            <Link href="/shop/all/oversized" className="block hover:text-white transition">
              Oversized
            </Link>

            <Link href="/shop/all/hoodie" className="block hover:text-white transition">
              Hoodies
            </Link>

            <Link href="/shop/all/sweatshirt" className="block hover:text-white transition">
              Sweatshirts
            </Link>
          </div>
        </div>

        {/* company */}
        <div>
          <h3 className="font-medium mb-4">Company</h3>

          <div className="space-y-2 text-gray-400 text-sm">
            <Link href="/policies/about" className="block hover:text-white transition">
              About
            </Link>

            <Link href="/policies/contact" className="block hover:text-white transition">
              Contact
            </Link>

            <Link href="/policies/support" className="block hover:text-white transition">
              Support
            </Link>
          </div>
        </div>

        {/* policies */}
        <div>
          <h3 className="font-medium mb-4">Policies</h3>

          <div className="space-y-2 text-gray-400 text-sm">
            <Link href="/policies/returns" className="block hover:text-white transition">
              Returns
            </Link>

            <Link href="/policies/privacy" className="block hover:text-white transition">
              Privacy
            </Link>

            <Link href="/policies/terms" className="block hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">

          <p>
            © 2026 MythStreet. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer transition">
              India
            </span>

            <span className="hover:text-white cursor-pointer transition">
              INR ₹
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}