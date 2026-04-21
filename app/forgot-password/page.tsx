"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      alert("Enter your email");
      return;
    }

    try {
      setLoading(true);

      // 🔥 NEXT STEP: backend OTP API (we'll build later)
      alert("OTP will be sent (backend step next)");

      // 👉 future:
      // await fetch("/api/auth/send-otp")

      router.push(`/reset-password?email=${email}`);

    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Forgot Password
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center">
        Enter your email to receive an OTP
      </p>

      <input
        type="email"
        placeholder="Email Address"
        className="w-full border p-3 mb-4 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSendOTP}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      <p className="text-center mt-4 text-sm">
        Back to{" "}
        <span
          onClick={() => router.push("/login")}
          className="underline cursor-pointer"
        >
          Login
        </span>
      </p>

    </div>
  );
}