import { NextResponse } from "next/server";
import { Pool } from "pg";

// ✅ create pool once (global)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // ❌ VALIDATION
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // simple email regex (safe enough)
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 🔥 AUTO CREATE TABLE (safe)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 🔥 INSERT EMAIL
    const result = await pool.query(
      "INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *",
      [email]
    );

    // ✅ CHECK DUPLICATE
    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Already subscribed" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.error("DB ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}