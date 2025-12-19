import { NextResponse } from "next/server";
import { setCSRFCookie } from "@/lib/csrf";

export async function GET() {
  try {
    const token = await setCSRFCookie();

    return NextResponse.json({ csrfToken: token });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("CSRF token generation error:", error);
    }

    return NextResponse.json(
      { error: "Failed to generate CSRF token." },
      { status: 500 }
    );
  }
}
