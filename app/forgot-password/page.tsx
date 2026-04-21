"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // 🔥 SEND OTP
  const handleSendOTP = async () => {
    if (!phone || phone.length !== 10) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      alert("OTP sent successfully");
      setOtpSent(true);

    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const handleVerifyOTP = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid OTP");
      }

      // 🔥 SAVE TOKEN
      localStorage.setItem("token", data.token);

      alert("Login successful");

      // 👉 redirect after login
      router.push("/");

    } catch (error) {
      console.error(error);
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Login / Signup
      </h1>

      {!otpSent ? (
        <>
          <input
            type="tel"
            placeholder="Enter phone number"
            className="w-full border p-3 mb-4 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm mb-2 text-gray-500">
            OTP sent to {phone}
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-3 mb-4 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

    </div>
  );
}