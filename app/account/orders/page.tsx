"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user.id) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // 🔥 NOW BACKEND ALREADY FILTERS
        setOrders(data.orders);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Orders</h2>
        <p className="text-gray-500">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Orders</h2>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div key={order.id} className="border p-5">

            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Order Status</p>
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

            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4">

                  <img
                    src={item.image}
                    className="w-16 h-20 object-cover"
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