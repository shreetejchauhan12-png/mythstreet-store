"use client";

import PincodeChecker from "@/app/components/ui/PincodeChecker";
import { useState, useEffect } from "react";

import { useCart } from "@/app/store/cart";

import { useRouter, useParams } from "next/navigation";
import { Share2 } from "lucide-react";
import { reviews } from "@/app/data/reviews";
import Image from "next/image";

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

export default function ProductPage() {
  const params = useParams();
const id = params?.id;
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);

  const addToCart = useCart((state) => state.addToCart);

  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [stockLeft, setStockLeft] = useState(5);

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

      const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
);

const freshProduct = await res.json();

      setProduct(freshProduct);

    } catch (err) {
      console.error("❌ ERROR LOADING PRODUCT:", err);
    }
  }

  load();
}, [id]);

  const item = product;
  const reviewData =
  reviews[
    item?.design as keyof typeof reviews
  ];

  useEffect(() => {
  if (product) {
    setSelectedImage(
      `/${product.design}-${product.variant_code}-1.webp`
    );
  }
}, [product]);

  useEffect(() => {
  setStockLeft(
    Math.floor(Math.random() * 10) + 1
  );
}, []);

  // ✅ Recently viewed (cleaned)
  useEffect(() => {
    if (!item) return;

    let stored: any[] = [];

    try {
      stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    } catch {
      stored = [];
    }

    const filtered = stored.filter((p: any) => p?.id !== item?.id);
    filtered.unshift(item);

    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(filtered.slice(0, 8))
    );
  }, [item]);

  
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
  image: `/${item.design}-${item.variant_code}-1.webp`,
  quantity: quantity,
});

    // ✅ BACKEND SAVE
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
  product_id: item.id,
  size: size,
  quantity: quantity,

  title: `${item.title} (${size})`,
  price: item.price,
  image: `/${item.design}-${item.variant_code}-1.webp`,
}),
      }
    );

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
    image: `/${item.design}-${item.variant_code}-1.webp`,
    quantity: quantity,
  };

  // ✅ Store separately (NOT cart)
  localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));

  router.push("/checkout?mode=buyNow");
}

  if (!product) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 animate-pulse">

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="bg-gray-200 rounded-2xl aspect-[4/5]" />

        {/* RIGHT */}
        <div className="space-y-4">

          <div className="h-10 w-3/4 bg-gray-200 rounded-xl" />

          <div className="h-6 w-24 bg-gray-200 rounded-lg" />

          <div className="h-5 w-40 bg-gray-200 rounded-lg" />

          <div className="pt-6 space-y-3">
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
          </div>

        </div>

      </div>

    </main>
  );
}

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-10 pb-24">

        <p className="text-sm text-gray-500 mb-6">
          Home / {item.category} / {item.type}
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div>
            <div className="mb-4">
              <div className="relative overflow-hidden rounded-lg">
                <div className="pt-[125%]" />
                <Image
  src={selectedImage || "/placeholder.png"}
  alt={item.title}
  fill
  priority
  quality={85}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
/>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">

  {[1, 2, 3, 4, 5, 6].map((i) => {

    const img =
      `/${item.design}-${item.variant_code}-${i}.webp`;

    return (
      <div
        key={i}
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
  alt={`${item.title} ${i}`}
  fill
  quality={70}
  sizes="120px"
  className="absolute inset-0 w-full h-full object-cover"
/>
        </div>

      </div>
    );
  })}

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
              
              <p className="text-red-500 font-medium">
                🔥 Only {stockLeft} left in stock
              </p>
            </div>

            <div className="mb-2">
              <p className="font-medium mb-2">Select Size</p>

              <div
  className={`flex gap-3 ${
    error ? "border border-red-500 p-2 rounded" : ""
  }`}
>
                {["S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
  setSize(s);

  if (error) {
    setError("");
  }
}}
                    className={`min-w-[56px] h-12 border rounded-lg transition active:scale-[0.97] ${
                      size === s
                        ? "bg-[#680000] text-white border-[#680000]"
                        : ""
                    }`}
                  >
                    {s}
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
  className={`py-3 min-w-0 flex-1 text-white transition active:scale-[0.98] hover:opacity-90 ${
    size
      ? "bg-[#680000]"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  ADD TO CART
</button>

              <button
  onClick={buyNow}
  className={`py-3 min-w-0 flex-1 text-white transition active:scale-[0.98] hover:opacity-90 ${
    size
      ? "bg-[#680000]"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  BUY NOW
</button>
            </div>

            <div className="bg-gray-50 border p-4 rounded-lg text-sm space-y-2 mb-6">
              <p>🔒 Secure prepaid payment</p>
              <p>🧵 Made to order product</p>
              <p>🚚 Shipping in 4-6 days</p>
              <p>📦 Replacement only for damaged items</p>
            </div>

            <p className="text-sm text-gray-600 leading-6">
              Premium quality streetwear designed for everyday comfort.
            </p>
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
      {/* MOBILE STICKY CTA */}
<div className="fixed left-0 right-0 bottom-20 z-50 bg-white/95 backdrop-blur-xl px-3 py-3 md:hidden"
style={{
  bottom: "env(safe-area-inset-bottom)",
  paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
}}>

  <div className="flex items-center gap-3">

    {/* PRICE */}
    <div className="flex-1">
      <p className="text-xs text-gray-500">
        Price
      </p>

      <p className="font-semibold text-lg">
        ₹{item.price}
      </p>
    </div>

    {/* BUTTON */}
    <button
      onClick={handleAddToCart}
      className={`h-14 px-6 rounded-2xl text-sm font-medium text-white transition active:scale-[0.98] ${
        size
          ? "bg-[#680000]"
          : "bg-gray-400"
      }`}
    >
      ADD TO CART
    </button>

  </div>

</div>
    </>
  );
}