"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  const sendOtp = async () => {
    if (!phone) return alert("Enter phone");

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

    alert("OTP sent (check backend logs)");
    setStep("otp");
  };

  const verifyOtp = async () => {
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

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">

      <h1 className="text-xl mb-6 text-center">
        Mobile Login
      </h1>

      {step === "phone" && (
        <>
          <input
            placeholder="Phone Number"
            className="w-full border p-3 mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={sendOtp}
            className="w-full bg-black text-white py-3"
          >
            Send OTP
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            placeholder="Enter OTP"
            className="w-full border p-3 mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-black text-white py-3"
          >
            Verify OTP
          </button>
        </>
      )}

    </div>
  );
}