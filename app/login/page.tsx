"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    initSendOTP: any;
  }
}

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 LOAD MSG91 SCRIPT
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://verify.msg91.com/otp-provider.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 🔥 SEND OTP (MSG91 WIDGET)
  const sendOtp = () => {
    if (!phone) return alert("Enter phone number");

    if (!window.initSendOTP) {
      return alert("OTP service not loaded. Refresh page.");
    }

    setLoading(true);

    window.initSendOTP({
      widgetId: "3664756c466b393432373031",
      tokenAuth: "510536Txv5S33tx69e77c1eP1",
      identifier: "91" + phone,

      success: function (data: any) {
        console.log("✅ VERIFIED:", data);

        // ✅ SAVE TOKEN (you can verify later with backend)
        localStorage.setItem("otp_token", data.token);

        alert("Login Successful ✅");

        // 🔥 REDIRECT
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect");

        if (redirect === "checkout") {
          router.push("/checkout");
        } else {
          router.push("/");
        }

        setLoading(false);
      },

      failure: function (err: any) {
        console.log("❌ ERROR:", err);
        alert("OTP failed");
        setLoading(false);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Login / Signup
      </h1>

      <input
        type="tel"
        placeholder="Enter Mobile Number"
        className="w-full border p-3 mb-4 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={sendOtp}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

    </div>
  );
}