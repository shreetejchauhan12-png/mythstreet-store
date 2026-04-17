import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("🚀 API HIT: /api/razorpay/order");

  try {
    // 🔥 TEST DB CALL
    console.log("⏳ Calling connectDB...");
    console.log("✅ MongoDB Connected (FROM ROUTE)");

    const body = await req.json();
    const { amount } = body;

    console.log("💰 Amount received:", amount);

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay keys missing");
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    console.log("✅ Razorpay Order Created");

    return NextResponse.json(order);

  } catch (error: any) {
    console.error("❌ ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}