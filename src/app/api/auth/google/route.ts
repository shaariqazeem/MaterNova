import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body?.name === "string" ? body.name.trim() : "Guest";

    if (!email) {
      return NextResponse.json(
        { error: "Google account email is required." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: Date.now(),
        name,
        email,
        authProvider: "google",
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { error: "Google sign-in is unavailable right now." },
      { status: 500 }
    );
  }
}
