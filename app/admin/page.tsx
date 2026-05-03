"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);
const today = new Date().toDateString();

const todayOrders = orders.filter(
  (o) => new Date(o.created_at).toDateString() === today
);

const todayRevenue = todayOrders.reduce(
  (sum, o) =>
    o.payment_status === "paid" || o.status === "delivered"
      ? sum + Number(o.total_amount || 0)
      : sum,
  0
);

const totalRevenue = orders.reduce(
  (sum, o) =>
    o.payment_status === "paid" || o.status === "delivered"
      ? sum + Number(o.total_amount || 0)
      : sum,
  0
);

const codOrders = orders.filter(o => o.payment_method === "cod");
const prepaidOrders = orders.filter(o => o.payment_method === "online");
  // 🔹 Fetch orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ FIXED

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
        }
      );

      const data = await res.json();
      console.log("ADMIN DATA:", data);

      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔥 ONLY ALLOW YOUR NUMBER
  if (user.phone !== "919021943839") {
    alert("Access Denied ❌");
    window.location.href = "/";
    return;
  }

  fetchOrders();
}, []);

const quickUpdate = (id: number, status: string) => {
  updateStatus(id, status);
};
  // 🔹 Update status
  const updateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("token"); // ✅ FIXED

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
          body: JSON.stringify({ status }),
        }
      );

      fetchOrders(); // refresh
    } catch (error) {
      console.error(error);
    }
  };
const filteredOrders = orders
  .filter((order) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      String(order.id).includes(searchLower) ||
      order.items?.some((item: any) =>
        item.title.toLowerCase().includes(searchLower)
      );

    let matchesFilter = true;

    if (filter === "pending") {
      matchesFilter =
        order.status === "pending" ||
        order.status === "placed" ||
        order.status === "processing";
    }

    if (filter === "delivered") {
      matchesFilter = order.status === "delivered";
    }

    if (filter === "cod") {
      matchesFilter =
        order.payment_method?.toLowerCase() === "cod" ||
        order.payment_method?.toLowerCase().includes("cod");
    }

    if (filter === "today") {
      matchesFilter =
        new Date(order.created_at).toDateString() === today;
    }

    return matchesSearch && matchesFilter;
  })
  .sort((a, b) => {
    if (sort === "latest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }

    if (sort === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }

    if (sort === "high") {
      return Number(b.total_amount) - Number(a.total_amount);
    }

    if (sort === "low") {
      return Number(a.total_amount) - Number(b.total_amount);
    }

    return 0;
  });
  const chartMap: any = {};

orders.forEach((o) => {
  const date = new Date(o.created_at).toLocaleDateString();

  if (!chartMap[date]) {
    chartMap[date] = 0;
  }

  chartMap[date] += Number(o.total_amount || 0);
});

const chartData = Object.keys(chartMap).map((date) => ({
  date,
  amount: chartMap[date],
}));
  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
      <div className="mb-6">
  <input
    type="text"
    placeholder="Search by Order ID or Product..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border px-4 py-2 rounded outline-none focus:ring-2 focus:ring-black"
  />
</div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

  <div className="border rounded p-4">
    <p className="text-sm text-gray-500">Total Orders</p>
    <p className="text-xl font-semibold">{orders.length}</p>
  </div>

  <div className="border rounded p-4">
    <p className="text-sm text-gray-500">Revenue</p>
    <p className="text-xl font-semibold">₹{totalRevenue}</p>
  </div>

  <div className="border rounded p-4">
    <p className="text-sm text-gray-500">Today Orders</p>
    <p className="text-xl font-semibold">{todayOrders.length}</p>
  </div>

  <div className="border rounded p-4">
    <p className="text-sm text-gray-500">Today Revenue</p>
    <p className="text-xl font-semibold">₹{todayRevenue}</p>
  </div>

  <div className="border rounded p-4">
    <p className="text-sm text-gray-500">COD / Prepaid</p>
    <p className="text-sm">
      COD: {codOrders.length} | Prepaid: {prepaidOrders.length}
    </p>
  </div>

</div>
<div className="border rounded p-4 mb-8">
  <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>

  <div style={{ width: "100%", height: 300 }}>
    <ResponsiveContainer>
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#000" />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

      <div className="flex gap-2 mb-4 flex-wrap">

  <button
    onClick={() => setFilter("all")}
    className={`px-3 py-1 border rounded ${filter === "all" ? "bg-black text-white" : ""}`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("pending")}
    className={`px-3 py-1 border rounded ${filter === "pending" ? "bg-black text-white" : ""}`}
  >
    Pending
  </button>

  <button
    onClick={() => setFilter("delivered")}
    className={`px-3 py-1 border rounded ${filter === "delivered" ? "bg-black text-white" : ""}`}
  >
    Delivered
  </button>

  <button
    onClick={() => setFilter("cod")}
    className={`px-3 py-1 border rounded ${filter === "cod" ? "bg-black text-white" : ""}`}
  >
    COD
  </button>

  <button
    onClick={() => setFilter("today")}
    className={`px-3 py-1 border rounded ${filter === "today" ? "bg-black text-white" : ""}`}
  >
    Today
  </button>

</div>
<div className="mb-4">
  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="border px-3 py-2 rounded"
  >
    <option value="latest">Latest First</option>
    <option value="oldest">Oldest First</option>
    <option value="high">High Value</option>
    <option value="low">Low Value</option>
  </select>
</div>
      {/* 🔥 ORDERS */}
      <div className="space-y-6">
        {filteredOrders?.map((order) => (
          <div
  key={order.id}
  onClick={() =>
    setOpenOrderId(openOrderId === order.id ? null : order.id)
  }
  className="border p-5 rounded cursor-pointer"
>

            <div className="flex flex-wrap gap-4 justify-between mb-4">

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
                <span
  className={`px-2 py-1 text-xs rounded font-medium
    ${order.payment_status === "paid" ? "bg-green-100 text-green-700" : ""}
    ${order.payment_status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
    ${order.payment_status === "failed" ? "bg-red-100 text-red-700" : ""}
  `}
>
  {order.payment_status}
</span>
              </div>

              <div>
  <p className="text-sm text-gray-500">Actions</p>

  {/* 🔥 QUICK BUTTONS */}
  <div className="flex gap-2 mt-1">

    <button
      onClick={(e) => {
        e.stopPropagation();
        quickUpdate(order.id, "delivered");
      }}
      className="px-2 py-1 text-xs bg-green-500 text-white rounded"
    >
      Deliver
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        quickUpdate(order.id, "cancelled");
      }}
      className="px-2 py-1 text-xs bg-red-500 text-white rounded"
    >
      Cancel
    </button>

  </div>

  {/* 🔥 DROPDOWN BACK */}
  <select
    value={order.status || "pending"}
    onChange={(e) => {
      e.stopPropagation();
      updateStatus(order.id, e.target.value);
    }}
    className="border px-2 py-1 rounded text-xs mt-2 w-full"
  >
    <option value="pending">Pending</option>
    <option value="processing">Processing</option>
    <option value="shipped">Shipped</option>
    <option value="delivered">Delivered</option>
  </select>

</div>

            </div>

            <div className="space-y-3">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center">

                  <img
                    src={item.image}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                </div>
              ))}
            </div>

{/* 🔥 ADD THIS EXACTLY HERE */}
{openOrderId === order.id && (
  <div className="mt-4 p-4 border-t text-sm space-y-1">

    <p><b>Name:</b> {order.name}</p>
    <p><b>Phone:</b> {order.phone}</p>
    <p><b>Email:</b> {order.email}</p>

    <p>
      <b>Address:</b> {order.address}, {order.city}, {order.state} - {order.pincode}
    </p>

    <p><b>Payment Method:</b> {order.payment_method}</p>
    <p><b>Order Date:</b> {new Date(order.created_at).toLocaleString()}</p>

  </div>
)}

          </div>
        ))}
      </div>

    </div>
  );
}