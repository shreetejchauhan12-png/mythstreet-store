"use client";

import { useState } from "react";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");

  function check() {
    if (pincode.length !== 6) {
      setMessage("Enter valid 6 digit pincode");
      return;
    }

    setMessage("✔ Delivery available to this location");
  }

  return (
    <div className="my-4">

      <p className="text-sm font-medium mb-2">
        Check Delivery
      </p>

      <div className="flex w-full">
        <input
          value={pincode}
          onChange={(e) => {
            setMessage("");
            setPincode(e.target.value.replace(/\D/g, ""));
          }}
          placeholder="Enter pincode"
          maxLength={6}
          className="flex-1 border px-3 py-3 text-sm outline-none"
        />

        <button
          onClick={check}
          className="border border-l-0 px-5 py-3 text-sm hover:bg-black hover:text-white transition"
        >
          Check
        </button>
      </div>

      {message && (
        <p className="mt-2 text-sm text-green-600 font-medium">
          {message}
        </p>
      )}

    </div>
  );
}