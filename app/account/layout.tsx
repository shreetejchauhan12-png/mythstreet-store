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
    const saved = localStorage.getItem("myth_user");

    if (!saved) {
      router.push("/");
      return;
    }

    setUser(JSON.parse(saved));
  }, []);

  const logout = () => {
    localStorage.removeItem("myth_user");
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

      <div className="grid grid-cols-4 gap-10">

        {/* SIDEBAR */}
        <div className="col-span-1 border-r pr-6">

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
        <div className="col-span-3">
          {children}
        </div>

      </div>
    </div>
  );
}