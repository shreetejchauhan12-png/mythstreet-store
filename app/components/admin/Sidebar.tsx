"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Shirt,
  FolderKanban,
  Users,
  Mail,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Shirt,
  },
  {
    title: "Collections",
    href: "/admin/collections",
    icon: FolderKanban,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Subscribers",
    href: "/admin/subscribers",
    icon: Mail,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black text-white min-h-screen flex flex-col">

      <div className="px-6 py-8 border-b border-white/10">

        <h1 className="text-2xl font-black tracking-wide">
          MythStreet
        </h1>

        <p className="text-xs text-gray-400 mt-1">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  active
                    ? "bg-[#680000] text-white"
                    : "hover:bg-white/10 text-gray-300"
                }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>

            </Link>
          );
        })}

      </nav>

    </aside>
  );
}
