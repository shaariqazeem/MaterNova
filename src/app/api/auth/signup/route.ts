import crypto from "node:crypto";
import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const db = getDb();
    const passwordHash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    try {
      const result = db
        .prepare(
          `INSERT INTO users (name, email, password_hash, auth_provider)
           VALUES (?, ?, ?, 'local')`
        )
        .run(name, email, passwordHash);

      return NextResponse.json({
        success: true,
        user: {
          id: Number(result.lastInsertRowid),
          name,
          email,
          authProvider: "local",
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";

      if (message.toLowerCase().includes("unique")) {
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 409 }
        );
      }

      throw error;
    }
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Unable to create your account right now." },
      { status: 500 }
    );
  }
}
