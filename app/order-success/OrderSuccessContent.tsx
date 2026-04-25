"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccessContent() {
  const params = useSearchParams();
  const router = useRouter();

  const orderId = params.get("order_id");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ IMPORTANT: prevent prerender crash
  if (!orderId) {
    return null;
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderId}`
        );

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();

        setOrder(data.order);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // ✅ Loading state
  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  // ✅ Safety fallback (if order not found)
  if (!order) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4">Order not found</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-black text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">

        {/* ✅ SUCCESS ICON */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-2xl">✓</span>
        </div>

        {/* ✅ TITLE */}
        <h1 className="text-2xl font-semibold mb-2">
          Order Confirmed
        </h1>

        <p className="text-gray-500 mb-6">
          Your order has been placed successfully.
        </p>

        {/* ✅ ORDER DETAILS */}
        <div className="border rounded-lg p-6 mb-6 text-left">

          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">#{order.id}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Status</span>
            <span className="text-green-600 font-medium">
              Confirmed
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Delivery</span>
            <span className="font-medium">
              3–5 Days
            </span>
          </div>

        </div>

        {/* ✅ BUTTONS */}
        <div className="space-y-3">

          <button
            onClick={() => router.push("/account/orders")}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            View Orders
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full border py-3 rounded-lg"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
}