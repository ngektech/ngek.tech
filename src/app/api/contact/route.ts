import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { validateCSRFToken, getCSRFTokenFromCookie } from "@/lib/csrf";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Create DOMPurify instance for server-side sanitization.
const window = new JSDOM("").window;
const purify = DOMPurify(window);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  message: string;
  csrfToken: string;
}

// Rate limiting map for contact form.
const submissionMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour.
const RATE_LIMIT_MAX_SUBMISSIONS = 5; // 5 submissions per hour.

function checkSubmissionRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = submissionMap.get(ip);

  if (!record || now > record.resetTime) {
    submissionMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_SUBMISSIONS) {
    return false;
  }

  record.count++;
  return true;
}

function sanitizeInput(input: string): string {
  return purify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateFormData(data: ContactFormData): string | null {
  // Name validation.
  if (!data.name || data.name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (data.name.length > 100) {
    return "Name must be less than 100 characters.";
  }

  // Email validation.
  if (!data.email || !validateEmail(data.email)) {
    return "Please provide a valid email address.";
  }

  // Message validation.
  if (!data.message || data.message.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }
  if (data.message.length > 5000) {
    return "Message must be less than 5000 characters.";
  }

  // CSRF token validation.
  if (!data.csrfToken) {
    return "CSRF token is required.";
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting.
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Check rate limit.
    if (!checkSubmissionRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body.
    const body: ContactFormData = await request.json();

    // Validate form data.
    const validationError = validateFormData(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Validate CSRF token.
    const cookieToken = await getCSRFTokenFromCookie();
    if (!cookieToken) {
      return NextResponse.json(
        { error: "CSRF validation failed. Please refresh and try again." },
        { status: 403 }
      );
    }

    const isValidCSRF = await validateCSRFToken(body.csrfToken);
    if (!isValidCSRF || body.csrfToken !== cookieToken) {
      return NextResponse.json(
        { error: "CSRF validation failed. Please refresh and try again." },
        { status: 403 }
      );
    }

    // Sanitize all inputs.
    const sanitizedData = {
      name: sanitizeInput(body.name.trim()),
      email: sanitizeInput(body.email.trim().toLowerCase()),
      phone: body.phone ? sanitizeInput(body.phone.trim()) : null,
      website: body.website ? sanitizeInput(body.website.trim()) : null,
      message: sanitizeInput(body.message.trim()),
      submittedAt: new Date(),
      ip: ip,
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // Save to MongoDB.
    const db = await getDatabase();
    const collection = db.collection("contact_submissions");

    await collection.insertOne(sanitizedData);

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll get back to you within 24-48 hours.",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Contact form submission error:", error);
    }

    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
