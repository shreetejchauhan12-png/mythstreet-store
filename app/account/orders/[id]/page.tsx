"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        const foundOrder = data.orders.find(
          (o: any) => o.id.toString() === orderId
        );

        setOrder(foundOrder);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!order) {
    return <div className="p-10">Order not found</div>;
  }

  const orderDate = new Date(order.created_at);

  const shippedDate = new Date(orderDate);
  shippedDate.setDate(shippedDate.getDate() + 2);

  const deliveredDate = new Date(orderDate);
  deliveredDate.setDate(deliveredDate.getDate() + 5);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">
            Order #{order.id}
          </h1>

          <p className="text-gray-500 mt-2">
            Placed on{" "}
            {orderDate.toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Payment
          </p>

          <p className="font-medium capitalize">
            {order.payment_status}
          </p>
        </div>
      </div>

      {/* TRACKING */}
      <div className="border rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-8">
          Order Tracking
        </h2>

        <div className="flex items-center justify-between relative">

          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200"></div>

          <div className="absolute top-5 left-0 w-full h-1 bg-black"></div>

          {/* STEP 1 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              ✓
            </div>

            <p className="mt-3 font-medium">
              Order Placed
            </p>

            <p className="text-sm text-gray-500">
              {orderDate.toLocaleDateString()}
            </p>
          </div>

          {/* STEP 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              ✓
            </div>

            <p className="mt-3 font-medium">
              Shipped
            </p>

            <p className="text-sm text-gray-500">
              {shippedDate.toLocaleDateString()}
            </p>
          </div>

          {/* STEP 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
              ✓
            </div>

            <p className="mt-3 font-medium">
              Delivered
            </p>

            <p className="text-sm text-gray-500">
              {deliveredDate.toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>

      {/* ITEMS */}
      <div className="border rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-6">
          Order Items
        </h2>

        <div className="space-y-5">
          {(order.items || []).map((item: any) => (
            <div
              key={item.id}
              className="flex gap-5 border-b pb-5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-32 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  Size: {item.size}
                </p>

                <p className="text-gray-500">
                  Qty: {item.quantity}
                </p>

                <p className="font-medium mt-3">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SHIPPING */}
      <div className="border rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Shipping Details
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>{order.name}</p>
          <p>{order.address}</p>
          <p>
            {order.city}, {order.state}
          </p>
          <p>{order.pincode}</p>
          <p>{order.phone}</p>
        </div>

      </div>

    </div>
  );
}