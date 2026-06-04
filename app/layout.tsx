import "./globals.css";

import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Script from "next/script";
import GoogleAnalytics from "@/app/components/analytics/GoogleAnalytics";
import MicrosoftClarity from "@/app/components/analytics/MicrosoftClarity";
import MetaPixel from "@/app/components/analytics/MetaPixel";
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

  verification: {
  other: {
    "msvalidate.01":
      "8775150F1803757DEB5F74296F206057",
  },
},

  alternates: {
    canonical: "https://mythstreet.com",
  },

  openGraph: {
    title: "MYTHSTREET - Premium Oversized Streetwear India",

description:
  "Premium streetwear brand featuring oversized t-shirts, hoodies and sweatshirts crafted for modern street culture, everyday comfort and timeless style.",

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

    title: "MYTHSTREET - Premium Oversized Streetwear India",

description:
  "Premium streetwear brand featuring oversized t-shirts, hoodies and sweatshirts crafted for modern street culture, everyday comfort and timeless style.",

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

      <GoogleAnalytics />
      <MicrosoftClarity />
      <MetaPixel />
      

        {/* HEADER */}
        <Header />

        {/* PAGE */}
        {children}

        {/* FOOTER */}
        <Footer />

        {/* CART LOADER */}
        <CartInitializer />

        {/* RECENT PURCHASE POPUP */}

        {/* ORGANIZATION SCHEMA */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",

              name: "MYTHSTREET",

              url: "https://mythstreet.com",

              logo: "https://mythstreet.com/logo.webp",

              description:
  "Premium streetwear brand featuring oversized t-shirts, hoodies and sweatshirts crafted for modern street culture, everyday comfort and timeless style.",

              sameAs: [
                "https://instagram.com/mythstreet",
              ],
            }),
          }}
        />

        <Script
  id="website-schema"
  type="application/ld+json"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",

      "@type": "WebSite",

      name: "MYTHSTREET",

      url: "https://mythstreet.com",

      description:
        "Premium streetwear brand featuring oversized t-shirts, hoodies and sweatshirts crafted for modern street culture and everyday comfort.",

      publisher: {
        "@type": "Organization",
        name: "MYTHSTREET",
      },
    }),
  }}
/>



      </body>

    </html>
  );
}