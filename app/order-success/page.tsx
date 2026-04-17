"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderSuccess() {
  const params = useSearchParams();
  const orderIdParam = params.get("order_id");

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!orderIdParam) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/order/${orderIdParam}`
        );
        const data = await res.json();

        setOrder(data.order);
        setItems(data.items);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
    setTimeout(() => setShow(true), 300);
  }, [orderIdParam]);

  if (!order) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  const isCOD = order.payment_method === "cod";

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 text-center">

      {/* animation */}
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

      <h1 className="text-3xl font-semibold mb-2">
        {isCOD ? "Order Placed (COD)" : "Order Confirmed"}
      </h1>

      <p className="text-gray-600 mb-8">
        {isCOD
          ? "Your order is confirmed. Pay when it arrives."
          : "Your payment was successful and order is confirmed"}
      </p>

      {/* ORDER INFO */}
      <div className="border rounded-xl p-6 mb-8 bg-white shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Order ID</p>
        <p className="text-xl font-semibold mb-2">{order.id}</p>

        <p className="text-sm text-gray-600">
          Payment: {order.payment_method} | Status: {order.payment_status}
        </p>
      </div>

      {/* ITEMS WITH IMAGE */}
      <div className="text-left mb-8">
        <h2 className="font-semibold mb-3">Items</h2>

        {items.map((item) => (
          <div key={item.id} className="flex gap-4 border p-3 rounded mb-2 items-center">
            
            <img
              src={item.image}
              className="w-16 h-16 object-cover rounded"
            />

            <div>
              <p>{item.title}</p>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity} | Size: {item.size}
              </p>
              <p>₹{item.price}</p>
            </div>

          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mb-8 font-semibold">
        Total: ₹{order.total_amount}
      </div>

      <Link href="/">
        <button className="w-full bg-[#680000] text-white py-3 mb-3">
          Continue Shopping
        </button>
      </Link>

      <Link href="/account/orders">
        <button className="w-full border py-3">
          View My Orders
        </button>
      </Link>

    </main>
  );
}