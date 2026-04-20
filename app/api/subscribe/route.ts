import { NextResponse } from "next/server";
import { Pool } from "pg";

// ✅ GLOBAL DB CONNECTION (best practice)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ POST → ADD SUBSCRIBER
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let email = body.email;

    // ❌ BASIC VALIDATION
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // ✅ NORMALIZE EMAIL
    email = email.trim().toLowerCase();

    // ❌ EMAIL FORMAT CHECK
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 🔥 CREATE TABLE IF NOT EXISTS
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 🔥 INSERT EMAIL
    const result = await pool.query(
      `INSERT INTO subscribers (email)
       VALUES ($1)
       ON CONFLICT (email) DO NOTHING
       RETURNING *`,
      [email]
    );

    // ✅ DUPLICATE CHECK
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

  } catch (error) {
    console.error("❌ DB ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ GET → FETCH ALL SUBSCRIBERS
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM subscribers ORDER BY created_at DESC"
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("❌ FETCH ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}