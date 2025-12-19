import { cookies } from "next/headers";

const CSRF_SECRET = process.env.CSRF_SECRET || "default-csrf-secret-change-in-production";
const CSRF_COOKIE_NAME = "csrf_token";
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds.

/**
 * Generates a secure CSRF token.
 * Uses Web Crypto API for secure random bytes.
 */
export async function generateCSRFToken(): Promise<string> {
  const timestamp = Date.now().toString(36);
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const randomPart = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Create a signature using the secret.
  const data = `${timestamp}.${randomPart}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(CSRF_SECRET);
  const messageData = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, messageData);
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${data}.${signatureHex}`;
}

/**
 * Validates a CSRF token.
 */
export async function validateCSRFToken(token: string): Promise<boolean> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }

    const [timestamp, randomPart, providedSignature] = parts;

    // Check token expiry.
    const tokenTime = parseInt(timestamp, 36);
    if (Date.now() - tokenTime > CSRF_TOKEN_EXPIRY) {
      return false;
    }

    // Verify signature.
    const data = `${timestamp}.${randomPart}`;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(CSRF_SECRET);
    const messageData = encoder.encode(data);

    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", key, messageData);
    const expectedSignature = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Constant-time comparison to prevent timing attacks.
    if (providedSignature.length !== expectedSignature.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < providedSignature.length; i++) {
      result |= providedSignature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
    }

    return result === 0;
  } catch {
    return false;
  }
}

/**
 * Sets the CSRF token cookie.
 */
export async function setCSRFCookie(): Promise<string> {
  const token = await generateCSRFToken();
  const cookieStore = await cookies();

  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hour.
    path: "/",
  });

  return token;
}

/**
 * Gets the CSRF token from cookie.
 */
export async function getCSRFTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(CSRF_COOKIE_NAME);
  return cookie?.value || null;
}
