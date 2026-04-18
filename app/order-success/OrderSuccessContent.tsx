"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderSuccessContent() {
  const params = useSearchParams();
  const orderIdParam = params.get("order_id");

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

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
  }, [orderIdParam]);

  if (!order) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <main className="p-10 text-center">
      <h1 className="text-2xl mb-4">Order Success</h1>
      <p>Order ID: {order.id}</p>

      <Link href="/">Go Home</Link>
    </main>
  );
}