"use client";

import PincodeChecker from "@/app/components/ui/PincodeChecker";
import { useState, useEffect } from "react";
import { getProducts } from "@/app/data/products";
import { useCart } from "@/app/store/cart";
import ProductCard from "@/app/components/ui/ProductCard";
import { useRouter, useParams } from "next/navigation";
import { Share2 } from "lucide-react";
import { reviews } from "@/app/data/reviews";

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
  const [recent, setRecent] = useState<any[]>([]);
  const [similar, setSimilar] = useState<any[]>([]);
  const [variants, setVariants] = useState<any[]>([]);

  useEffect(() => {
  if (!id) return;

  async function load() {
    try {
      setProduct(null);
      setSimilar([]);

      const data = await getProducts();

      console.log("PRODUCT DATA:", data);
      console.log("URL ID:", id);

      if (!Array.isArray(data) || data.length === 0) {
        console.error("❌ No products found");
        return;
      }

      const found = data.find(
        (p: any) => String(p.id) === String(id)
      );

      if (!found) {
        console.error("❌ Product NOT found for ID:", id);
        return;
      }

      const freshProduct = { ...found };

      setProduct(freshProduct);

      if (freshProduct.design) {
        const sameDesign = data.filter(
  (p: any) =>
    p.design_id === freshProduct.design_id
);

setVariants(sameDesign);

const related = data.filter(
  (p: any) =>
    p.design === freshProduct.design &&
    p.design_id !== freshProduct.design_id
);

setSimilar(related.slice(0, 4));
      }
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
      `/${product.design}-${product.variant_code}-1.jpg`
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

    setRecent(filtered.slice(0, 4));
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
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: quantity,
        }),
      }
    );

    const data = await res.json();

    console.log("ADD TO CART RESPONSE:", data);

    // 🔥 AFTER BACKEND SUCCESS → SYNC FRONTEND
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
    image: item.image,
    quantity: quantity,
  };

  // ✅ Store separately (NOT cart)
  localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));

  router.push("/checkout?mode=buyNow");
}

  if (!product) {
  return (
    <div className="p-10 text-center">
      Loading product...
    </div>
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
                <img
                  src={selectedImage || "/placeholder.png"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">

  {Array.from({ length: 6 }).map((_, i) => {

    const img =
      `/${item.design}-${item.variant_code}-${i + 1}.jpg`;

    return (
      <div
        key={i}
        onClick={() => setSelectedImage(img)}
        className={`cursor-pointer border rounded overflow-hidden ${
          selectedImage === img
            ? "border-[#680000]"
            : ""
        }`}
      >

        <div className="pt-[125%] relative">
          <img
            src={img}
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
                    className={`border px-4 py-2 ${
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
{variants.length > 0 && (
  <div className="mb-6">

    <p className="font-medium mb-3">
      Available In
    </p>

    <div className="flex flex-wrap gap-3">

      {variants.map((variant: any) => (
        <button
          key={variant.id}
          onClick={() => {
            router.push(`/product/${variant.id}`);
          }}
          className={`border px-4 py-2 capitalize transition ${
            item.id === variant.id
              ? "bg-[#680000] text-white border-[#680000]"
              : "hover:border-black"
          }`}
        >
          {variant.type
            .replaceAll("-", " ")}
        </button>
      ))}

    </div>

  </div>
)}<div className="mb-6">

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

            <div className="flex gap-3 mb-4">
              <button
  onClick={handleAddToCart}
  className={`py-3 flex-1 text-white transition ${
    size
      ? "bg-[#680000]"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  ADD TO CART
</button>

              <button
  onClick={buyNow}
  className={`py-3 flex-1 text-white transition ${
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

        {variants.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">
  Available In
</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {variants.map((item) => (
  <ProductCard
    key={item.id}
    product={item}
  />
))}
            </div>
          </div>
        )}
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