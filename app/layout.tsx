"use client";

import "./globals.css";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import RecentPurchasePopup from "@/app/components/ui/RecentPurchasePopup";
import Script from "next/script";
import { useEffect } from "react";
import { useCart } from "@/app/store/cart";

// 🔥 THIS LOADS CART ON EVERY REFRESH
function CartInitializer() {
  const fetchCart = useCart((s) => s.fetchCart);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchCart(); // ✅ always load cart from backend
    }
  }, []);

  return null;
}

export const metadata = {
  title: "Mythstreet",
  description: "Streetwear Brand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* 🔥 IMPORTANT: LOAD CART FIRST */}
        <CartInitializer />

        <Header />

        {children}

        <Footer />

        <RecentPurchasePopup />

        {/* 🔥 Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

      </body>
    </html>
  );
}