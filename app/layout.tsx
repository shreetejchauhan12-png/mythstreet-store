import "./globals.css";

import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import RecentPurchasePopup from "@/app/components/ui/RecentPurchasePopup";
import Script from "next/script";
import CartInitializer from "./CartInitializer";

import { Montserrat, Bebas_Neue } from "next/font/google";

export const metadata = {
  metadataBase: new URL("https://mythstreet.com"),

  title: {
  default: "MYTHSTREET - Premium Oversized Streetwear India",
  template: "%s | MYTHSTREET",
},

description:
  "Premium streetwear brand featuring oversized t-shirts, hoodies and sweatshirts crafted for modern street culture, everyday comfort and timeless style.",

  keywords: [
    "anime streetwear",
    "oversized t shirts",
    "streetwear india",
    "anime hoodies",
    "anime fashion",
    "japanese streetwear",
    "MYTHSTREET",
  ],

  alternates: {
    canonical: "https://mythstreet.com",
  },

  openGraph: {
    title: "MYTHSTREET - Premium Streetwear",

    description:
      "Premium streetwear inspired by anime and modern street culture.",

    url: "https://mythstreet.com",

    siteName: "MYTHSTREET",

    images: [
      {
        url: "/og-banner.webp",
        width: 1200,
        height: 630,
        alt: "MYTHSTREET",
      },
    ],

    locale: "en_IN",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "MYTHSTREET - Premium Streetwear",

    description:
      "Premium streetwear inspired by anime and modern street culture.",

    images: ["/og-banner.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

/* BODY FONT */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
});

/* HEADING FONT */
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body
        className={`
          ${montserrat.variable}
          ${bebas.variable}

          font-sans
          bg-white
          text-black
          antialiased
        `}
      >

        {/* CART LOADER */}
        <CartInitializer />

        {/* HEADER */}
        <Header />

        {/* PAGE */}
        {children}

        {/* FOOTER */}
        <Footer />

        {/* RECENT PURCHASE POPUP */}
        <RecentPurchasePopup />

        {/* ORGANIZATION SCHEMA */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",

              name: "MYTHSTREET",

              url: "https://mythstreet.com",

              logo: "https://mythstreet.com/logo.webp",

              description:
                "Premium streetwear brand featuring oversized t-shirts, hoodies, and sweatshirts inspired by anime and street culture.",

              sameAs: [
                "https://instagram.com/mythstreet",
              ],
            }),
          }}
        />

        {/* RAZORPAY */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

      </body>

    </html>
  );
}