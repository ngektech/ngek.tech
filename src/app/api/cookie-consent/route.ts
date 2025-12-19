import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

// Types for cookie consent.
interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

interface CookieConsentRecord {
  consentId: string;
  preferences: CookiePreferences;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  lastUpdated: Date;
  consentVersion: string;
  domain: string;
}

// Generate a unique consent ID.
function generateConsentId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `consent_${timestamp}_${randomPart}`;
}

// Get client IP address.
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return "unknown";
}

// POST: Save or update cookie consent.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { preferences, consentId } = body;

    // Validate preferences.
    if (!preferences || typeof preferences !== "object") {
      return NextResponse.json(
        { error: "Invalid preferences format." },
        { status: 400 }
      );
    }

    // Ensure necessary cookies are always true.
    const validatedPreferences: CookiePreferences = {
      necessary: true, // Always required.
      analytics: Boolean(preferences.analytics),
      functional: Boolean(preferences.functional),
      marketing: Boolean(preferences.marketing),
    };

    const db = await getDatabase();
    const collection = db.collection<CookieConsentRecord>("cookie_consents");

    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "unknown";
    const now = new Date();

    let responseConsentId = consentId;

    if (consentId) {
      // Update existing consent.
      const result = await collection.updateOne(
        { consentId },
        {
          $set: {
            preferences: validatedPreferences,
            lastUpdated: now,
            ipAddress,
            userAgent,
          },
        }
      );

      if (result.matchedCount === 0) {
        // Consent ID not found, create new record.
        responseConsentId = generateConsentId();
        await collection.insertOne({
          consentId: responseConsentId,
          preferences: validatedPreferences,
          ipAddress,
          userAgent,
          timestamp: now,
          lastUpdated: now,
          consentVersion: "1.0",
          domain: "ngek.tech",
        });
      }
    } else {
      // Create new consent record.
      responseConsentId = generateConsentId();
      await collection.insertOne({
        consentId: responseConsentId,
        preferences: validatedPreferences,
        ipAddress,
        userAgent,
        timestamp: now,
        lastUpdated: now,
        consentVersion: "1.0",
        domain: "ngek.tech",
      });
    }

    // Create response with cookie.
    const response = NextResponse.json({
      success: true,
      consentId: responseConsentId,
      preferences: validatedPreferences,
      message: "Cookie consent saved successfully.",
    });

    // Set cookie consent cookie.
    const cookieValue = JSON.stringify({
      consentId: responseConsentId,
      preferences: validatedPreferences,
      timestamp: now.toISOString(),
    });

    response.cookies.set("cookie_consent", cookieValue, {
      httpOnly: false, // Accessible by JS for preference checking.
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60, // 1 year.
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Cookie consent error:", error);
    return NextResponse.json(
      { error: "Failed to save cookie consent." },
      { status: 500 }
    );
  }
}

// GET: Retrieve cookie consent status.
export async function GET(request: NextRequest) {
  try {
    const consentCookie = request.cookies.get("cookie_consent");

    if (!consentCookie) {
      return NextResponse.json({
        hasConsent: false,
        preferences: null,
        message: "No consent record found.",
      });
    }

    try {
      const consentData = JSON.parse(consentCookie.value);

      // Optionally verify against database.
      const db = await getDatabase();
      const collection = db.collection<CookieConsentRecord>("cookie_consents");
      const dbRecord = await collection.findOne({ consentId: consentData.consentId });

      if (dbRecord) {
        return NextResponse.json({
          hasConsent: true,
          consentId: dbRecord.consentId,
          preferences: dbRecord.preferences,
          timestamp: dbRecord.timestamp,
          lastUpdated: dbRecord.lastUpdated,
        });
      }

      // Cookie exists but not in database - treat as new.
      return NextResponse.json({
        hasConsent: false,
        preferences: null,
        message: "Consent record not found in database.",
      });
    } catch {
      return NextResponse.json({
        hasConsent: false,
        preferences: null,
        message: "Invalid consent cookie format.",
      });
    }
  } catch (error) {
    console.error("Cookie consent retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve cookie consent." },
      { status: 500 }
    );
  }
}

// DELETE: Remove cookie consent.
export async function DELETE(request: NextRequest) {
  try {
    const consentCookie = request.cookies.get("cookie_consent");

    if (consentCookie) {
      try {
        const consentData = JSON.parse(consentCookie.value);

        // Remove from database.
        const db = await getDatabase();
        const collection = db.collection<CookieConsentRecord>("cookie_consents");
        await collection.deleteOne({ consentId: consentData.consentId });
      } catch {
        // Ignore parse errors.
      }
    }

    // Clear the cookie.
    const response = NextResponse.json({
      success: true,
      message: "Cookie consent removed successfully.",
    });

    response.cookies.set("cookie_consent", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately.
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Cookie consent deletion error:", error);
    return NextResponse.json(
      { error: "Failed to remove cookie consent." },
      { status: 500 }
    );
  }
}
