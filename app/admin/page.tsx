"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/order");
      const data = await res.json();
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Update status
  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`http://localhost:5000/api/order/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      fetchOrders(); // refresh
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Admin Panel
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (
          <div key={order.id} className="border p-5 rounded">

            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-medium">₹{order.total_amount}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-medium">{order.payment_status}</p>
              </div>

              {/* 🔥 STATUS DROPDOWN */}
              <div>
                <p className="text-sm text-gray-500">Status</p>

                <select
                  value={order.status || "pending"}
                  onChange={(e) =>
                    updateStatus(order.id, e.target.value)
                  }
                  className="border px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center">

                  <img
                    src={item.image}
                    className="w-16 h-16 object-cover"
                  />

                  <div>
                    <p>{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
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