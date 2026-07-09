"use client";

import PincodeChecker from "@/app/components/ui/PincodeChecker";
import { useState, useEffect } from "react";

import { useCart } from "@/app/store/cart";
import { apiFetch } from "@/app/lib/api";

import { useRouter, useParams } from "next/navigation";
import { Share2 } from "lucide-react";
import { reviews } from "@/app/data/reviews";
import Image from "next/image";
import Script from "next/script";
import ProductSkeleton from "@/app/components/ui/ProductSkeleton";


declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

function ShareButton({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  function copy() {
    navigator.clipboard.writeText(url);
    setOpen(false);
  }

  function nativeShare() {
    if (navigator.share) {
      navigator.share({ title, url });
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Share2 size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg p-2 z-50">
          <button
            onClick={nativeShare}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            Share...
          </button>

          <button
            onClick={copy}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
          >
            Copy link
          </button>
        </div>
      )}
    </div>
  );
}

type ProductClientProps = {
  variants: any[];
};

export default function ProductPage({
  variants,
}: ProductClientProps) {
  const params = useParams();
const id = params?.id;
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const designVariants = Array.isArray(variants)
  ? variants
  : [];

  const addToCart = useCart((state) => state.addToCart);

  const [selectedImage, setSelectedImage] = useState("");

const [selectedColor, setSelectedColor] = useState("");

const [size, setSize] = useState("");

const [quantity, setQuantity] = useState(1);

const [error, setError] = useState("");
  const [touchStart, setTouchStart] = useState(0);
const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
}, [id]);

  useEffect(() => {
  if (!id) return;

  async function load() {
    try {
      setProduct(null); 

      const res = await apiFetch(`/api/products/${id}`);

const response = await res.json();

setProduct(response.data);

    } catch (err) {
      console.error("❌ ERROR LOADING PRODUCT:", err);
    }
  }

  load();
}, [id]);

  const item = product;
  const images = [
  item?.main_image,
  item?.image_2,
  item?.image_3,
  item?.image_4,
  item?.image_5,
  item?.image_6,
]
  .filter((img) => img)
  .map((img) => `/${img}`);

const currentIndex = images.indexOf(selectedImage);

function nextImage() {
  if (currentIndex < images.length - 1) {
    setSelectedImage(images[currentIndex + 1]);
  }
}

function prevImage() {
  if (currentIndex > 0) {
    setSelectedImage(images[currentIndex - 1]);
  }
}
  const reviewData =
  reviews[
    item?.design as keyof typeof reviews
  ];

  const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://mythstreet.com",
    },

    {
      "@type": "ListItem",
      position: 2,
      name: item?.category || "Category",
      item: `https://mythstreet.com/shop/${item?.category}`,
    },

    {
      "@type": "ListItem",
      position: 3,
      name: item?.type || "Product Type",
      item: `https://mythstreet.com/shop/${item?.category}/${item?.type}`,
    },

    {
      "@type": "ListItem",
      position: 4,
      name: item?.title || "Product",
      item: `https://mythstreet.com/product/${item?.id}`,
    },
  ],
};

  useEffect(() => {
  if (!product) return;

  setSelectedImage(
  product.main_image
    ? `/${product.main_image}`
    : "/placeholder.webp"
);

  setSelectedColor(product.color_name ?? "");

  window.gtag("event", "view_item", {
    currency: "INR",

    value: product.price,

    items: [
      {
        item_id: product.id,
        item_name: product.title,
        price: product.price,
      },
    ],
  });

}, [product]);

  
  async function handleAddToCart() {

  if (!size) {
    setError("Please select size");
    return;
  }

  setError("");

  try {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    // ✅ FRONTEND INSTANT UPDATE
    addToCart({
  id: `${item.id}-${size}`,
  title: `${item.title} (${size})`,
  price: item.price,
  image: item.main_image
  ? `/${item.main_image}`
  : "/placeholder.webp",
  quantity: quantity,
});

window.gtag("event", "add_to_cart", {
  currency: "INR",

  value: item.price * quantity,

  items: [
    {
      item_id: item.id,
      item_name: item.title,
      price: item.price,
      quantity: quantity,
      item_variant: size,
    },
  ],
});

    // ✅ BACKEND SAVE
    const res = await apiFetch("/api/products/cart", {
  method: "POST",
  body: JSON.stringify({
    product_id: item.id,
    size,
    quantity,
    title: `${item.title} (${size})`,
    price: item.price,
    image: item.main_image
      ? `/${item.main_image}`
      : "/placeholder.webp",
  }),
});

    const data = await res.json();

    console.log("ADD TO CART RESPONSE:", data);

    // ✅ FINAL SYNC
    await useCart.getState().fetchCart();

  } catch (error) {

    console.error("ADD TO CART ERROR:", error);

  }
}

  // ✅ FIXED BUY NOW (NO RAZORPAY HERE)
  function buyNow() {
  if (!size) {
    setError("Please select size");
    return;
  }

  setError("");

  const buyNowItem = {
    id: `${item.id}-${size}`,
    title: `${item.title} - ${size}`,
    price: item.price,
    image: item.main_image
  ? `/${item.main_image}`
  : "/placeholder.webp",
    quantity: quantity,
  };

  // ✅ Store separately (NOT cart)
  localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));

  router.push("/checkout?mode=buyNow");
}

  if (!product) {
  return <ProductSkeleton />;
}

  return (
    <>
    <Script
  id="breadcrumb-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>
      <main className="max-w-7xl mx-auto px-4 py-10 pb-24">

        <p className="text-sm text-gray-500 mb-6">
          Home / {item.category} / {item.type}
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div>
            <div className="mb-4">
              <div
  className="relative overflow-hidden rounded-lg"
  onTouchStart={(e) =>
    setTouchStart(e.targetTouches[0].clientX)
  }
  onTouchMove={(e) =>
    setTouchEnd(e.targetTouches[0].clientX)
  }
  onTouchEnd={() => {

    if (touchStart - touchEnd > 75) {
      nextImage();
    }

    if (touchStart - touchEnd < -75) {
      prevImage();
    }

  }}
>
                <div className="pt-[125%]" />
                <Image
  src={selectedImage || "/placeholder.webp"}
  alt={`${item.title} Premium Streetwear by MYTHSTREET`}
  fill
  priority
  fetchPriority="high"
  quality={85}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
/>
              </div>

{/* GALLERY INDICATORS */}
<div className="flex items-center justify-center gap-2 mt-4 mb-2">

  {images.map((_, index) => (

    <div
      key={index}
      className={`transition-all duration-300 rounded-full ${
        currentIndex === index
          ? "w-6 h-2 bg-black"
          : "w-2 h-2 bg-gray-300"
      }`}
    />

  ))}

</div>

<p className="text-center text-xs text-gray-500 mb-4">
  {currentIndex + 1} / {images.length}
</p>

</div>

<div className="grid grid-cols-3 gap-3">

  {images.map((img, index) => (

  <div
    key={img}
    onClick={() => setSelectedImage(img)}
    className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 ${
      selectedImage === img
        ? "border-[#680000] ring-2 ring-[#680000]/20 scale-[1.03] shadow-sm"
        : ""
    }`}
  >

    <div className="pt-[125%] relative">

      <Image
        src={img}
        alt={`${item.title} view ${index + 1} - Premium Streetwear by MYTHSTREET`}
        fill
        quality={70}
        sizes="120px"
        className="absolute inset-0 w-full h-full object-cover"
      />

    </div>

  </div>

))}

</div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {item.title}
              </h1>
              <ShareButton title={item.title} />
            </div>

            {/* GARMENT TYPES */}

{designVariants.length > 1 && (

  <div className="mb-5">

    <p className="text-sm font-medium text-gray-600 mb-3">
      Garment Type
    </p>

    <div className="flex flex-wrap gap-2">

      {[
  ...new Map(
    designVariants.map((variant) => [
      variant.garment_type_id,
      variant,
    ])
  ).values(),
].map((variant) => (

        <button
          key={variant.id}
          onClick={() =>
            router.push(`/product/${variant.id}`)
          }
          className={`px-4 py-2 rounded-full border text-sm transition ${
            variant.id === item.id
              ? "bg-[#680000] text-white border-[#680000]"
              : "bg-white hover:border-[#680000]"
          }`}
        >
          {variant.garment_type}
        </button>

      ))}

    </div>

  </div>

)}

{/* COLORS */}

{designVariants.filter(
  (v) => v.garment_type_id === item.garment_type_id
).length > 0 && (

  <div className="mb-6">

    <p className="text-sm font-medium text-gray-600 mb-3">
      Color
    </p>

    <div className="flex flex-wrap gap-3">

      {designVariants
        .filter(
          (v) =>
            v.garment_type_id === item.garment_type_id
        )
        .map((variant) => (

          <button
            key={variant.id}
            onClick={() =>
              router.push(`/product/${variant.id}`)
            }
            title={variant.color_name}
            className={`w-10 h-10 rounded-full border-2 transition ${
              variant.id === item.id
                ? "border-black scale-110"
                : "border-gray-300 hover:scale-105"
            }`}
            style={{
              background: variant.hex_code,
            }}
          />

        ))}

    </div>

    <p className="text-sm text-gray-600 mt-3">
      {selectedColor}
    </p>

  </div>

)}


            <p className="text-xl">₹{item.price}</p>
            {reviewData && (
  <div className="flex items-center gap-2 mt-2 mb-4">

    <div className="flex text-[#680000] text-sm">
      ★★★★★
    </div>

    <p className="text-sm text-gray-600">
      {reviewData.rating} (
      {reviewData.count} reviews)
    </p>

  </div>
)}

            <div className="mt-2 mb-6 space-y-1 text-sm">

  <p className="text-[#680000] font-medium">
    ⚡ Limited Production Batch
  </p>

</div>

            <div className="mb-2">
              <p className="font-medium mb-2">Select Size</p>

              <div
  className={`flex gap-3 ${
    error ? "border border-red-500 p-2 rounded" : ""
  }`}
>
                {(item.sizes ?? []).map((sizeOption: any) => (

  <button
    key={sizeOption.id}
    onClick={() => {
      setSize(sizeOption.name);

      if (error) {
        setError("");
      }
    }}
    className={`min-w-[56px] h-12 border rounded-lg transition active:scale-[0.97] ${
      size === sizeOption.name
        ? "bg-[#680000] text-white border-[#680000]"
        : ""
    }`}
  >
    {sizeOption.name}
  </button>

))}
              </div>
            </div>
<div className="mb-6">

  <p className="font-medium mb-3">
    Quantity
  </p>

  <div className="flex items-center border border-black rounded-lg overflow-hidden w-fit">

    <button
      onClick={() =>
        setQuantity((prev) =>
          prev > 1 ? prev - 1 : 1
        )
      }
      className="w-12 h-12 flex items-center justify-center border-r hover:bg-gray-100 transition text-lg"
    >
      -
    </button>

    <div className="w-14 h-12 flex items-center justify-center text-sm font-medium">
      {quantity}
    </div>

    <button
      onClick={() =>
        setQuantity((prev) => prev + 1)
      }
      className="w-12 h-12 flex items-center justify-center border-l hover:bg-gray-100 transition text-lg"
    >
      +
    </button>

  </div>

</div>
            <PincodeChecker />

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="flex gap-3 mb-4 min-w-0">
              <button
  onClick={handleAddToCart}
  className="
py-3
min-w-0
flex-1
border
border-[#680000]
text-[#680000]
bg-white
transition
active:scale-[0.98]
hover:bg-[#680000]/5
"
>
  ADD TO CART
</button>

              <button
  onClick={buyNow}
  className={`py-3 min-w-0 flex-1 text-white transition active:scale-[0.98] hover:opacity-90 ${
    size
      ? "bg-[#680000]"
      : "bg-[#680000]"
  }`}
>
  BUY NOW
</button>
            </div>

            <div className="bg-gray-50 border p-4 rounded-lg text-sm space-y-2 mb-6">
  <p>🔒 Secure Payments</p>
  <p>✨ Premium Quality Streetwear</p>
  <p>🚚 Ships in 4–6 Days</p>
  <p>🇮🇳 Pan India Delivery</p>
</div>

            <p className="text-sm text-gray-600 leading-6">
              Premium quality streetwear designed for everyday comfort.
            </p>

            {designVariants.length > 1 && (

  <div className="mt-8">

    <h3 className="font-semibold text-lg mb-4">
      Complete The Collection
    </h3>

    <div className="grid grid-cols-2 gap-4">

      {[
  ...new Map(
    designVariants
      .filter(
        (variant) =>
          variant.id !== item.id
      )
      .map((variant) => [
        variant.garment_type_id,
        variant,
      ])
  ).values(),
].map((variant) => (

          <button
            key={variant.id}
            onClick={() =>
              router.push(
                `/product/${variant.id}`
              )
            }
            className="
              overflow-hidden
              border
              rounded-2xl
              text-left
              bg-white
              hover:border-[#680000]
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div className="relative aspect-[5/6]">

              <Image
                src={
  variant.main_image
    ? `/${variant.main_image}`
    : "/placeholder.webp"
}
                alt={variant.title}
                fill
                sizes="200px"
                loading="lazy"
                className="object-cover"
              />

            </div>

            <div className="p-3">

              <p className="font-medium text-sm line-clamp-1">
                {variant.title}
              </p>

              <p className="text-[#680000] text-sm mt-1">
                View Product →
              </p>

            </div>

          </button>

      ))}

    </div>

  </div>

)}

          </div>
        </div>

{reviewData && (
  <section className="mt-20">

    <div className="flex items-center justify-between mb-8">

      <div>
        <h2 className="text-2xl font-semibold">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-2 mt-2">
          <div className="text-[#680000]">
            ★★★★★
          </div>

          <p className="text-sm text-gray-600">
            {reviewData.rating} average •{" "}
            {reviewData.count} reviews
          </p>
        </div>
      </div>

    </div>

    <div className="grid md:grid-cols-3 gap-5">

      {reviewData.reviews.map(
        (review: any, i: number) => (
          <div
            key={i}
            className="border rounded-2xl p-5 bg-white"
          >

            <div className="flex items-center justify-between mb-3">

              <div>
                <p className="font-medium">
                  {review.name}
                </p>

                <p className="text-xs text-gray-500">
                  {review.date}
                </p>
              </div>

              <div className="text-[#680000] text-sm">
                {"★".repeat(review.rating)}
              </div>

            </div>

            <p className="text-sm text-gray-700 leading-6">
              {review.text}
            </p>

          </div>
        )
      )}

    </div>

  </section>
)}
      </main>
    </>
  );
}