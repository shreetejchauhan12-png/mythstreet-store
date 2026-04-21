"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  // 🔥 SEND OTP
  const handleSendOtp = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to send OTP");
        return;
      }

      alert("OTP sent (check server logs for now)");
      setStep("otp");

    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Invalid OTP");
        return;
      }

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      router.push("/");

    } catch (error) {
      console.error(error);
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Login / Signup
      </h1>

      {step === "phone" && (
        <>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            className="w-full border p-3 mb-4 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {step === "otp" && (
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
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p
            onClick={() => setStep("phone")}
            className="text-sm mt-3 text-center underline cursor-pointer"
          >
            Change Number
          </p>
        </>
      )}

    </div>
  );
}