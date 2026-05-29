

import Link from "next/link";
import Image from "next/image";

export default function Hero() {

  const heroImage = "/hr1.webp";

  return (
    <section className="pt-2 md:pt-4 pb-1 md:pb-3">

      {/* MOBILE FULL WIDTH + DESKTOP CONTAINER */}
      <div className="w-full md:max-w-7xl md:mx-auto md:px-4">

        {/* HERO */}
        <div
          className="
            relative overflow-hidden bg-black

            md:rounded-[28px]
            shadow-2xl
          "
        >

          {/* HERO RATIO */}
          <div className="pt-[45%] md:pt-[42%]" />







          {/* IMAGE */}
          <Image
  src={heroImage}
  alt="MythStreet Premium Streetwear Hero Banner"
  fill
  priority
  sizes="100vw"
  quality={85}
  className="
    object-cover
    transition-all duration-700
    scale-[1.02]
  "
/>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/15" />

          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

          {/* MINI BUTTONS */}
          <div
            className="
              absolute bottom-4 left-4 z-20
              flex gap-2
            "
          >

            {/* SHOP */}
            <Link
  href="/shop/all/all"
  className="
    bg-[#680000]/90
    backdrop-blur-xl
    text-white
    px-4 py-2
    rounded-xl
    text-[10px]
    tracking-[0.18em]
    uppercase
    font-medium
    border border-white/10
  "
>
  Shop
</Link>

            {/* CATEGORY */}
            <Link
  href="/shop/all/oversized-t-shirt"
  className="
    bg-zinc-800/70
    backdrop-blur-xl
    text-white
    px-4 py-2
    rounded-xl
    text-[10px]
    tracking-[0.18em]
    uppercase
    font-medium
    border border-white/10
  "
>
  Oversized
</Link>

          </div>

        </div>

      </div>

    </section>
  );
}