"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

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

      alert("OTP sent");
      setStep("otp");

    } catch (error) {
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

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

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      router.push("/");

    } catch (error) {
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl">

      <h1 className="text-2xl text-center mb-6">
        OTP LOGIN TEST
      </h1>

      {step === "phone" && (
        <>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            className="w-full border p-3 mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleSendOtp}
            className="w-full bg-black text-white py-3"
          >
            Send OTP
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-3 mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-black text-white py-3"
          >
            Verify OTP
          </button>
        </>
      )}

    </div>
  );
}