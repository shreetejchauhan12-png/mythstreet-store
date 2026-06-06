"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (!saved) {
      router.push("/");
      return;
    }

    setUser(JSON.parse(saved));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
localStorage.removeItem("token");
    router.push("/");
  };

  if (!user) return null;

  const linkClass = (path: string) =>
    `block py-3 border-b ${
      pathname === path
        ? "font-semibold"
        : "text-gray-500"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-semibold mb-8">
        My Account
      </h1>

      <div className="flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-10">

        {/* SIDEBAR */}
        <div className="md:col-span-1 md:border-r md:pr-6">

          <Link href="/account" className={linkClass("/account")}>
            Profile
          </Link>

          <Link href="/account/orders" className={linkClass("/account/orders")}>
            Orders
          </Link>

          <Link href="/account/wishlist" className={linkClass("/account/wishlist")}>
            Wishlist
          </Link>

          <Link href="/account/addresses" className={linkClass("/account/addresses")}>
            Addresses
          </Link>

          <button
            onClick={logout}
            className="mt-6 text-red-500"
          >
            Logout
          </button>

        </div>

        {/* CONTENT */}
        <div className="md:col-span-3">
          {children}
        </div>

      </div>
    </div>
  );
}