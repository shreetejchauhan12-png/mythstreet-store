import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About MYTHSTREET | Premium Streetwear Brand India",

  description:
    "Learn about MYTHSTREET, a premium streetwear brand in India creating oversized t-shirts, hoodies and sweatshirts inspired by modern culture, individuality and timeless style.",

  alternates: {
    canonical: "https://mythstreet.com/policies/about",
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">

      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        About MYTHSTREET
      </h1>

      <div className="space-y-6 text-gray-700 leading-7">

        <p>
          MYTHSTREET is a premium streetwear brand built for individuals
          who value style, comfort and self-expression. Our mission is to
          create clothing that blends modern street culture with timeless
          design, offering premium oversized t-shirts, hoodies and
          sweatshirts crafted for everyday wear.
        </p>

        <p>
          We believe fashion is more than clothing. It is a reflection of
          personality, creativity and confidence. Every MYTHSTREET design
          is created with attention to detail, focusing on clean aesthetics,
          bold visuals and comfortable fits that feel as good as they look.
        </p>

        <p>
          Inspired by streetwear culture, modern fashion, anime influences,
          minimal design and contemporary trends, our collections are built
          to stand out while remaining versatile enough for everyday life.
          We focus on premium fabrics, durable printing techniques and
          carefully crafted silhouettes to ensure long-lasting quality.
        </p>

        <p>
          Our oversized t-shirts are designed to provide a relaxed fit
          without compromising style. Our hoodies and sweatshirts are made
          for comfort, layering and year-round wear. Every product is
          developed with the goal of delivering premium quality and a
          distinctive streetwear experience.
        </p>

        <p>
          At MYTHSTREET, we are committed to continuously evolving our
          collections, introducing new designs and building a community
          around creativity, individuality and authentic self-expression.
          Whether you are discovering us for the first time or returning
          for the latest drop, our goal remains the same: creating premium
          streetwear that helps you express your story.
        </p>

      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            Premium Quality
          </h3>

          <p className="text-sm text-gray-600">
            High quality fabrics, durable construction and long-lasting
            prints designed for everyday wear.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            Unique Designs
          </h3>

          <p className="text-sm text-gray-600">
            Exclusive collections inspired by modern culture, streetwear
            aesthetics and creative expression.
          </p>
        </div>

        <div className="border p-6 rounded-xl">
          <h3 className="font-medium mb-2">
            Fast Support
          </h3>

          <p className="text-sm text-gray-600">
            Dedicated customer support focused on providing a smooth
            shopping experience.
          </p>
        </div>

      </div>

      <div className="mt-12 text-center">

        <Link
          href="/shop/all/all"
          className="
            inline-flex
            items-center
            justify-center
            px-8
            py-3
            rounded-xl
            bg-black
            text-white
            font-medium
            transition
            hover:opacity-90
          "
        >
          Explore Collection
        </Link>

      </div>

    </main>
  );
}