"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user.id) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");

        let data = { orders: [] };

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) {
            throw new Error("Failed to fetch orders");
          }

          data = await res.json();
        } catch (err) {
          console.log("⚠️ Backend not reachable or error");
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("❌ Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔄 Loading State
  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  // 📭 Empty Orders
  if (orders.length === 0) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-semibold mb-6">Orders</h2>
        <p className="text-gray-500">You have no orders yet.</p>
      </div>
    );
  }

  // ✅ Orders UI
  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold mb-6">Orders</h2>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div key={order.id} className="border p-5 rounded-lg">

            {/* 🔹 Order Info */}
            <div className="flex flex-wrap gap-6 justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {order.status || "pending"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-medium">
                  {order.payment_status || "pending"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-medium">₹{order.total_amount}</p>
              </div>
            </div>

            {/* 🔹 Items */}
            <div className="space-y-3">
              {(order.items || []).map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded"
                  />

                  <div>
                    <p className="font-medium">{item.title}</p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}