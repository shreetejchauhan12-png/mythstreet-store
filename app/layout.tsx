import "./globals.css";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import RecentPurchasePopup from "@/app/components/ui/RecentPurchasePopup";
import Script from "next/script";

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

        <Header />

        {children}

        <Footer />

        <RecentPurchasePopup />

        {/* 🔥 Razorpay Script (CORRECT WAY) */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

      </body>
    </html>
  );
}