"use client";

import {
  Truck,
  ShieldCheck,
  MapPinned,
} from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="bg-[#680000] text-white">

      <div className="max-w-7xl mx-auto px-4 py-5">

        <div className="flex items-center justify-between text-center">

          {/* SHIPPING */}
          <div className="flex flex-col items-center flex-1">
            <Truck
              className="w-5 h-5 text-white"
              strokeWidth={1.8}
            />

            <p className="text-[11px] mt-2 tracking-wide">
              Free Shipping
            </p>
          </div>

          {/* QUALITY */}
          <div className="flex flex-col items-center flex-1">
            <ShieldCheck
              className="w-5 h-5 text-white"
              strokeWidth={1.8}
            />

            <p className="text-[11px] mt-2 tracking-wide">
  7-Day Exchange
</p>
          </div>

          {/* INDIA */}
          <div className="flex flex-col items-center flex-1">
            <ShieldCheck
  className="w-5 h-5 text-white"
  strokeWidth={1.8}
/>

<p className="text-[11px] mt-2 tracking-wide">
  Secure Payments
</p>
          </div>

        </div>

      </div>

    </section>
  );
}