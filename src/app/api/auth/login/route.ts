import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const db = getDb();
    const passwordHash = crypto.createHash("sha256").update(password).digest("hex");

    const user = db
      .prepare(
        `SELECT id, name, email, auth_provider FROM users
         WHERE email = ? AND password_hash = ?`
      )
      .get(email, passwordHash) as
      | { id: number; name: string; email: string; auth_provider: string }
      | undefined;

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        authProvider: user.auth_provider,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Unable to sign you in right now." },
      { status: 500 }
    );
  }
}
