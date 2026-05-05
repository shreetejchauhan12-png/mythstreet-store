"use client";

import ProductSkeleton from "@/app/components/ui/ProductSkeleton";
import PincodeChecker from "@/app/components/ui/PincodeChecker";
import { useState, useEffect } from "react";
import { getProducts } from "@/app/data/products";
import { useCart } from "@/app/store/cart";
import ProductCard from "@/app/components/ui/ProductCard";
import { useRouter, useParams } from "next/navigation";
import { Share2 } from "lucide-react";

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
  const [error, setError] = useState("");
  const [viewers, setViewers] = useState(5);
  const [recent, setRecent] = useState<any[]>([]);
  const [similar, setSimilar] = useState<any[]>([]);

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
        const same = data.filter(
          (p: any) =>
            p.design === freshProduct.design &&
            String(p.id) !== String(freshProduct.id)
        );

        setSimilar(same.slice(0, 4));
      }
    } catch (err) {
      console.error("❌ ERROR LOADING PRODUCT:", err);
    }
  }

  load();
}, [id]);

  const item = product;

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 12) + 3);
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
    quantity: 1,
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

            <div className="grid grid-cols-4 gap-3">
  {[item.image, item.hoverLeft, item.hoverRight, item.image].map((img, i) => (
    <div
      key={i}
      onClick={() => setSelectedImage(img)}
      className={`cursor-pointer border rounded overflow-hidden ${
        selectedImage === img ? "border-[#680000]" : ""
      }`}
    >
      {/* ✅ SAME RATIO AS MAIN IMAGE */}
      <div className="pt-[125%] relative">
        <img
          src={img}
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

            <p className="text-xl">₹{item.price}</p>

            <div className="mt-2 mb-6 space-y-1 text-sm">
              <p className="text-orange-600 font-medium">
                👀 {viewers} people viewing this
              </p>
              <p className="text-red-500 font-medium">
                🔥 Only {item.stock} left in stock
              </p>
            </div>

            <div className="mb-2">
              <p className="font-medium mb-2">Select Size</p>

              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setError("");
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

            <PincodeChecker />

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                disabled={!size}
                className={`px-8 py-3 flex-1 text-white ${
                  size
                    ? "bg-[#680000]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                ADD TO CART
              </button>

              <button
                onClick={buyNow}
                disabled={!size}
                className="px-8 py-3 flex-1 border"
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

        {recent.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">
  Similar Products
</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similar.map((item) => (
  <ProductCard key={item.id} product={item} />
))}
            </div>
          </div>
        )}

      </main>
    </>
  );
}