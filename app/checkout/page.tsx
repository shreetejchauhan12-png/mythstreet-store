"use client";

import { useState } from "react";
import { useCart } from "@/app/store/cart";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart((state) => state.cart);
  const clearCart = useCart((state) => state.clearCart); // ✅ ADDED

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("online");
  const codCharge = paymentMethod === "cod" ? 49 : 0;
  const finalTotal = totalAmount + codCharge;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  async function handlePlaceOrder() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔥 LOGIN CHECK → REDIRECT
  if (!user.id) {
    router.push("/login");
    return;
  }

  // 🔥 VALIDATION
  if (!name || !phone || !address || !city || !state || !pincode) {
    alert("Please fill all details");
    return;
  }

  const orderData = {
    userId: user.id,
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    paymentMethod,
    items: cart.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      size: item.size || "M",
      image: item.image || "",
    })),
    amount: finalTotal,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Order failed");
      return;
    }

    // ✅ COD FLOW
    if (paymentMethod === "cod") {
      clearCart();
      window.location.href = `/order-success?method=cod&order_id=${data.orderId}`;
      return;
    }

    // ✅ ONLINE PAYMENT
    const options = {
      key: "rzp_test_ScYcSvKi9K3r9z",
      amount: data.razorpay.amount,
      currency: "INR",
      name: "MythStreet",
      description: "Order Payment",
      order_id: data.razorpay.id,

      handler: async function (response: any) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: data.razorpay.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: data.orderId,
          }),
        });

        clearCart();

        window.location.href = `/order-success?payment_id=${response.razorpay_payment_id}&order_id=${data.orderId}`;
      },

      prefill: {
        name,
        email,
        contact: phone,
      },

      theme: {
        color: "#680000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error("ORDER ERROR:", error);
    alert("Something went wrong");
  }
}

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-semibold mb-6">
        Secure Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div>
          <h2 className="mb-4 font-medium">Shipping Details</h2>

          <input placeholder="Full Name" className="border p-3 w-full mb-4" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email Address" className="border p-3 w-full mb-4" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Phone Number" className="border p-3 w-full mb-4" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <textarea placeholder="Address" className="border p-3 w-full mb-4" value={address} onChange={(e) => setAddress(e.target.value)} />

          <div className="flex gap-4 mb-4">
            <input placeholder="City" className="border p-3 w-full" value={city} onChange={(e) => setCity(e.target.value)} />
            <input placeholder="State" className="border p-3 w-full" value={state} onChange={(e) => setState(e.target.value)} />
          </div>

          <input placeholder="Pincode" className="border p-3 w-full mb-6" value={pincode} onChange={(e) => setPincode(e.target.value)} />

          <h2 className="mb-3 font-medium">Payment Method</h2>

          <div className="border p-4 space-y-2">
            <label className="flex gap-2">
              <input type="radio" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              Pay Online
            </label>

            <label className="flex gap-2">
              <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash on Delivery (+₹49)
            </label>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border p-6 h-fit">

          <h2 className="mb-4 font-medium">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 mb-4 items-center border-b pb-4">
              <img
                src={item.image}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price} x {item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          {paymentMethod === "cod" && (
            <div className="flex justify-between text-sm mb-2">
              <span>COD Charges</span>
              <span>₹49</span>
            </div>
          )}

          <div className="flex justify-between mb-6 font-semibold border-t pt-3">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>

          <button
  onClick={() => {
    console.log("🔥 BUTTON CLICKED");
    handlePlaceOrder();
  }}
  className="bg-[#680000] text-white w-full py-3"
>
  PLACE ORDER
</button>

        </div>

      </div>

    </main>
  );
}