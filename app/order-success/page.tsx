"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type { Order, OrderItem } from "@/app/types/order";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");
  const [paymentType, setPaymentType] = useState<"online" | "cod">("online");
  const [realOrderId, setRealOrderId] = useState("");
  const [orderData, setOrderData] = useState<{
  order: Order;
  items: OrderItem[];
} | null>(null);
  const [purchaseSent, setPurchaseSent] = useState(false);

  useEffect(() => {
    const orders = JSON.parse(
      localStorage.getItem("myth_orders") || "[]"
    );

    const latest = orders[0];

    if (latest) {
      setPaymentType(latest.payment || "online");
    }

    const params = new URLSearchParams(
      window.location.search
    );

    const orderIdParam = params.get("order_id");

    if (orderIdParam) {
      setRealOrderId(orderIdParam);
      setOrderId("#" + orderIdParam);
    }
  }, []);

  useEffect(() => {
  if (!realOrderId) return;

  const fetchOrder = async () => {
    try {
      const res = await apiFetch(
        `/api/order/${realOrderId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch order");
      }

      const data = await res.json();

      setOrderData({
        order: data.order,
        items: data.items,
      });
    } catch (error) {
      console.error(
        "Order fetch error:",
        error
      );
    }
  };

  fetchOrder();
}, [realOrderId]);

  useEffect(() => {
    if (!orderData) return;
    if (purchaseSent) return;

    const order = orderData.order;
    const items = orderData.items || [];

    if (
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "purchase", {
        transaction_id: String(order.id),
        value: Number(order.total_amount),
        currency: "INR",

        items: items.map((item) => ({
          item_id: String(item.product_id),
          item_name: item.title,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
      });

      console.log("GA4 PURCHASE SENT");

      setPurchaseSent(true);
    }
  }, [orderData, purchaseSent]);

  const isCOD = paymentType === "cod";

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="flex justify-center mb-8">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl ${
            isCOD
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {isCOD ? "₹" : "✓"}
        </div>
      </div>

      <h1 className="text-3xl font-semibold mb-2 text-red-500">
        {isCOD
          ? "Order Placed (COD)"
          : "Order Confirmed"}
      </h1>

      <p className="text-gray-600 mb-8">
        {isCOD
          ? "Your order is confirmed. Pay on delivery."
          : "Payment successful. Order confirmed."}
      </p>

      <div className="border rounded-xl p-6 mb-8 bg-white shadow-sm">
        <p className="text-sm text-gray-500 mb-1">
          Order ID
        </p>
        <p className="text-xl font-semibold">
          {orderId}
        </p>
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