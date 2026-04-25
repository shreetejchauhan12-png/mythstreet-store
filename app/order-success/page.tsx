"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");
  const [paymentType, setPaymentType] = useState<"online" | "cod">("online");

  useEffect(() => {
    const orders =
      JSON.parse(localStorage.getItem("myth_orders") || "[]");

    const latest = orders[0];

    if (latest) {
      setPaymentType(latest.payment || "online");
    }

    const id =
      "MYTH-" +
      Math.floor(100000 + Math.random() * 900000);

    setOrderId(id);
  }, []);

  const isCOD = paymentType === "cod";

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">

      {/* icon */}
      <div className="flex justify-center mb-8">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl ${
            isCOD ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          {isCOD ? "₹" : "✓"}
        </div>
      </div>

      <h1 className="text-3xl font-semibold mb-2">
        {isCOD ? "Order Placed (COD)" : "Order Confirmed"}
      </h1>

      <p className="text-gray-600 mb-8">
        {isCOD
          ? "Your order is confirmed. Pay on delivery."
          : "Payment successful. Order confirmed."}
      </p>

      <div className="border rounded-xl p-6 mb-8 bg-white shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Order ID</p>
        <p className="text-xl font-semibold">{orderId}</p>
      </div>

      <div className="text-sm text-gray-600 mb-10">
        <p>📦 Shipping in 4–6 days</p>
        <p>🚚 Tracking will be shared soon</p>
      </div>

      <Link href="/account/orders">
        <button className="w-full border py-3 mb-3 hover:bg-gray-50">
          View Orders
        </button>
      </Link>

      <Link href="/">
        <button className="w-full bg-[#680000] text-white py-3">
          Continue Shopping
        </button>
      </Link>
    </main>
  );
}