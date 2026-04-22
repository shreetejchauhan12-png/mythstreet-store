"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  // 🔥 SEND OTP
  const sendOtp = async () => {
    if (!phone) return alert("Enter phone number");

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        }
      );

      const data = await res.json();

      if (!res.ok) return alert(data.error);

      alert("OTP sent to your phone");
      setStep("otp");

    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const verifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) return alert(data.error);

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      alert("Account created & logged in ✅");

      router.push("/");

    } catch (err) {
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create Account
      </h1>

      {/* STEP 1 */}
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
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === "otp" && (
        <>
          <p className="text-sm text-gray-500 mb-2">
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
            onClick={verifyOtp}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p
            onClick={() => {
              setStep("phone");
              setOtp("");
            }}
            className="text-center text-sm mt-3 underline cursor-pointer"
          >
            Change Number
          </p>
        </>
      )}

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
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