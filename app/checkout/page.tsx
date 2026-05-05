"use client";

import { useState, useEffect, Suspense } from "react";
import { useCart } from "@/app/store/cart";
import { useRouter } from "next/navigation";

function CheckoutInner() {
  const [isBuyNow, setIsBuyNow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    if (mode === "buyNow") {
      setIsBuyNow(true);
    }
  }, []);

  return <CheckoutContent isBuyNow={isBuyNow} />;
}


declare global {
  interface Window {
    Razorpay: any;
  }
}
type CheckoutItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};
function CheckoutContent({ isBuyNow }: { isBuyNow: boolean }) {
  const router = useRouter();

// 🔥 Get Buy Now product
const [buyNowItem, setBuyNowItem] = useState(null);
useEffect(() => {
  const item = localStorage.getItem("buyNowItem");

  if (item) {
    setBuyNowItem(JSON.parse(item));
  }
}, []);

  const cart = useCart((state) => state.cart);

// 🔥 FORCE RESTORE CART BEFORE USE
useEffect(() => {
  const tempCart = JSON.parse(localStorage.getItem("tempCart") || "[]");

  if (cart.length === 0 && tempCart.length > 0) {
    useCart.setState({ cart: tempCart });
  }
}, []);
  const clearCart = useCart((state) => state.clearCart); // ✅ ADDED
  const tempCart =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("tempCart") || "[]")
    : [];

const finalItems =
  isBuyNow && buyNowItem
    ? [buyNowItem]
    : cart.length > 0
    ? cart
    : tempCart;
    if (isBuyNow && !buyNowItem) {
  return <p className="text-center mt-10">Loading checkout...</p>;
}

  const totalAmount = (finalItems as CheckoutItem[]).reduce(
  (acc: number, item: CheckoutItem) =>
    acc + item.price * item.quantity,
  0
);

  const [paymentMethod, setPaymentMethod] = useState("online");
  const codCharge = paymentMethod === "cod" ? 49 : 0;
  const finalTotal = totalAmount + codCharge;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const indianStates = [
    
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [loading, setLoading] = useState(false);
  
  function saveCheckoutData() {
  const data = {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
  };

  console.log("SAVING DATA:", data);

  localStorage.setItem("checkoutData", JSON.stringify(data));
}
  useEffect(() => {
  const saved = localStorage.getItem("checkoutData");

  if (!saved) return;

  try {
    const data = JSON.parse(saved);

    setName(data.name || "");
    setEmail(data.email || "");
    setPhone(data.phone || "");
    setAddress(data.address || "");
    setCity(data.city || "");
    setState(data.state || "");
    setPincode(data.pincode || "");

    // 🧹 clear after restore
    localStorage.removeItem("checkoutData");

  } catch (err) {
    console.error("Restore checkout error:", err);
  }
}, []);

  if (typeof window !== "undefined") {
  console.log("TOKEN:", localStorage.getItem("token"));
  console.log("USER:", localStorage.getItem("user"));
}
  async function handlePlaceOrder() {
    setLoading(true);
  // 🔥 CHECK TOKEN (MAIN LOGIN CHECK)
if (typeof window === "undefined") return;

const token = localStorage.getItem("token");

if (!token) {

  saveCheckoutData();

  // 🔥 SAVE CART ALSO
  const cart = useCart.getState().cart;
  localStorage.setItem("tempCart", JSON.stringify(cart));

  router.push("/login?redirect=checkout");
  return;
}

// 🔥 OPTIONAL: get user after token check
const userData =
  typeof window !== "undefined"
    ? localStorage.getItem("user")
    : null;
const user = userData ? JSON.parse(userData) : null;

if (!user || !user.id) {
  router.push("/login?redirect=checkout");
  return;
}

// ✅ EMAIL VALIDATION
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  setEmailError("Invalid email address");
  setLoading(false);
  return;
}

// ✅ PHONE VALIDATION (INDIA ONLY)
const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(phone)) {
  setPhoneError("Enter valid Indian phone number");
  setLoading(false);
  return;
}

// ✅ PINCODE VALIDATION (INDIA)
const pincodeRegex = /^\d{6}$/;

if (!pincodeRegex.test(pincode)) {
  setPincodeError("Enter valid 6-digit pincode");
  setLoading(false);
  return;
}
  // 🔥 VALIDATION
  if (!name || !phone || !address || !city || !state || !pincode) {
  alert("Please fill all details");
  setLoading(false);
  return;
}

  const orderData = {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    paymentMethod,
    items: (finalItems as CheckoutItem[]).map((item: CheckoutItem) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      size: "M",
      image: item.image || "",
    })),
    amount: finalTotal,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!data.success) {
  alert("Order failed");
  setLoading(false);
  return;
}

    // ✅ COD FLOW
    if (paymentMethod === "cod") {
      clearCart();
      localStorage.removeItem("tempCart");
      window.location.href = `/order-success?method=cod&order_id=${data.orderId}`;
      return;
    }

    // ✅ ONLINE PAYMENT
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
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
          <input
  placeholder="Email Address"
  className="border p-3 w-full mb-1"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setEmailError("");
  }}
/>

{emailError && (
  <p className="text-red-500 text-sm mb-3">{emailError}</p>
)}
          <input
  placeholder="Phone Number (10-digit Indian number)"
  className="border p-3 w-full mb-1"
  value={phone}
  onChange={(e) => {
    setPhone(e.target.value);
    setPhoneError("");
  }}
/>

{phoneError && (
  <p className="text-red-500 text-sm mb-3">{phoneError}</p>
)}
          <textarea placeholder="Address" className="border p-3 w-full mb-4" value={address} onChange={(e) => setAddress(e.target.value)} />

          <div className="flex gap-4 mb-4">
            <input placeholder="City" className="border p-3 w-full" value={city} onChange={(e) => setCity(e.target.value)} />
            <select
  className="border p-3 w-full"
  value={state}
  onChange={(e) => setState(e.target.value)}
>
  <option value="">Select State</option>

  {indianStates.map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ))}
</select>
          </div>

          <input
  placeholder="Pincode (6-digit Indian pincode)"
  className="border p-3 w-full mb-1"
  value={pincode}
  onChange={(e) => {
    setPincode(e.target.value);
    setPincodeError("");
  }}
/>

{pincodeError && (
  <p className="text-red-500 text-sm mb-3">{pincodeError}</p>
)}

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

         {(finalItems as CheckoutItem[]).map((item: CheckoutItem) => (
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
    saveCheckoutData(); // 🔥 FORCE SAVE FIRST
    handlePlaceOrder();
  }}
  disabled={loading}
  className="bg-[#680000] text-white w-full py-3 disabled:opacity-50"
>
  {loading ? "Placing Order..." : "PLACE ORDER"}
</button>

        </div>

      </div>

    </main>
  );
}
export default function CheckoutPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading checkout...</p>}>
      <CheckoutInner />
    </Suspense>
  );
}