"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccess() {
  const [orderId, setOrderId] = useState("");
  const [show, setShow] = useState(false);
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

    setTimeout(() => setShow(true), 300);
  }, []);

  const isCOD = paymentType === "cod";

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">

      {/* success animation */}
      <div className="flex justify-center mb-8">

        <div className="relative">

          <div className={`
            w-20 h-20 rounded-full 
            ${isCOD ? "bg-yellow-500" : "bg-green-500"}
            flex items-center justify-center
            text-white text-3xl
            transition-all duration-700
            ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}
          `}>
            {isCOD ? "₹" : "✓"}
          </div>

          <div className={`
            absolute inset-0 rounded-full
            ${isCOD ? "bg-yellow-400" : "bg-green-400"}
            blur-xl opacity-40
            transition-all duration-700
            ${show ? "scale-150" : "scale-0"}
          `}/>

        </div>

      </div>

      <h1 className={`
        text-3xl font-semibold mb-2
        transition-all duration-700
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}>
        {isCOD ? "Order Placed (COD)" : "Order Confirmed"}
      </h1>

      <p className="text-gray-600 mb-8">
        {isCOD
          ? "Your order is confirmed. Pay when it arrives."
          : "Your payment was successful and order is confirmed"}
      </p>

      {/* order id */}
      <div className="border rounded-xl p-6 mb-8 bg-white shadow-sm">

        <p className="text-sm text-gray-500 mb-1">
          Order ID
        </p>

        <p className="text-xl font-semibold mb-2">
          {orderId}
        </p>

        <p className="text-sm text-gray-600">
          {isCOD
            ? "Payment method: Cash on Delivery"
            : "Payment received successfully"}
        </p>

      </div>

      {/* payment status */}
      <div className={`border rounded-xl p-6 mb-8 ${
        isCOD
          ? "bg-yellow-50 border-yellow-200"
          : "bg-green-50 border-green-200"
      }`}>

        <p className="font-medium mb-2">
          {isCOD ? "Cash on Delivery" : "Payment Successful"}
        </p>

        <p className="text-sm text-gray-600">
          {isCOD
            ? "Pay at your doorstep when product arrives"
            : "Paid securely via Razorpay"}
        </p>

      </div>

      {/* info */}
      <div className="text-sm text-gray-600 space-y-1 mb-10">
        <p>📦 Shipping in 4-6 days</p>
        <p>🚚 Tracking will be shared soon</p>
        <p>🔒 Secure checkout</p>
      </div>

      <Link href="/account/orders">
        <button className="w-full border py-3 mb-3 hover:bg-gray-50 transition">
          View My Orders
        </button>
      </Link>

      <Link href="/">
        <button className="w-full bg-[#680000] text-white py-3 hover:opacity-90 transition">
          Continue Shopping
        </button>
      </Link>

    </main>
  );
}