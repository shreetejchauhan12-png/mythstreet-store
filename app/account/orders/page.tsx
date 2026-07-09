"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/store/auth";
import { apiFetch } from "@/app/lib/api";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const authUser = useAuth((state) => state.user);
  const loadUser = useAuth((state) => state.loadUser);

  // ✅ Load user ONCE
  useEffect(() => {
    loadUser();
  }, []);

  // ✅ Fetch orders after authUser is available
  useEffect(() => {
    if (!authUser?.id) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await apiFetch("/api/order/my-orders");

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();

        setOrders(data.orders || []);
      } catch (error) {
        console.error("❌ Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authUser]);

  const cancelOrder = async (
    e: React.MouseEvent,
    orderId: number
  ) => {
    e.preventDefault();

    const confirmCancel = confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      const res = await apiFetch(
        `/api/order/${orderId}/cancel`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Unable to cancel order");
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: "cancelled" }
            : order
        )
      );

      alert("Order cancelled successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-semibold mb-6">
          Orders
        </h2>

        <p className="text-gray-500">
          You have no orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-10">
      <h2 className="text-xl font-semibold mb-6">
        Orders
      </h2>

      <div>
        {orders.map((order: any) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="block mb-8"
          >
            <div className="border p-4 md:p-5 rounded-xl hover:shadow-lg transition cursor-pointer hover:border-black bg-white">

              <div className="flex flex-wrap gap-6 justify-between mb-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>
                  <p className="font-medium">
                    {order.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Status
                  </p>
                  <p className="font-medium">
                    {order.status || "pending"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Payment
                  </p>
                  <p className="font-medium">
                    {order.payment_status || "pending"}
                  </p>
                </div>

                {![
                  "cancelled",
                  "shipped",
                  "out_for_delivery",
                  "delivered",
                ].includes(order.status) && (
                  <button
                    onClick={(e) =>
                      cancelOrder(e, order.id)
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Cancel Order
                  </button>
                )}

              </div>

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
                      <p className="font-medium">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-sm">
                        ₹{item.price}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}