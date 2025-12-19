import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface PDFSection {
  type: "title" | "subtitle" | "heading" | "subheading" | "paragraph" | "list" | "table" | "divider" | "signature" | "footer" | "invoice_items";
  content?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  align?: "left" | "center" | "right";
  style?: "bold" | "italic" | "normal";
  lineItems?: LineItem[];
  subtotal?: number;
  vatRate?: number;
  vatAmount?: number;
  grandTotal?: number;
}

interface PDFDocument {
  title: string;
  subtitle?: string;
  documentType: string;
  sections: PDFSection[];
  metadata: {
    author: string;
    date: string;
    documentNumber?: string;
    company: string;
    copyright: string;
    trademark: string;
  };
}

// Rate limiting for PDF generation.
const pdfGenerationMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour.
const RATE_LIMIT_MAX_GENERATIONS = 10; // 10 PDFs per hour.

function checkPDFRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = pdfGenerationMap.get(ip);

  if (!record || now > record.resetTime) {
    pdfGenerationMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_GENERATIONS) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting.
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    // Check rate limit.
    if (!checkPDFRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many PDF generation requests. Please try again later." },
        { status: 429 }
      );
    }

    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a detailed description (at least 10 characters)." },
        { status: 400 }
      );
    }

    if (prompt.length > 5000) {
      return NextResponse.json(
        { error: "Description is too long. Maximum 5000 characters allowed." },
        { status: 400 }
      );
    }

    // Generate PDF content using Claude.
    const systemPrompt = `You are a professional document generator for NGEK TECH's ASI Suite. Generate structured JSON for professional PDF documents.

IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, no explanations.

The JSON must follow this exact structure:
{
  "title": "Document Title",
  "subtitle": "Optional subtitle",
  "documentType": "Invoice|Report|Letter|Contract|Proposal|Certificate|Resume|Receipt|Agreement|Policy|Manual|Specification",
  "sections": [
    {"type": "heading", "content": "Section Title"},
    {"type": "paragraph", "content": "Text content here"},
    {"type": "list", "items": ["Item 1", "Item 2", "Item 3"]},
    {"type": "table", "headers": ["Column1", "Column2"], "rows": [["Value1", "Value2"]]},
    {"type": "divider"},
    {"type": "subheading", "content": "Subsection"},
    {"type": "signature", "content": "Authorized Signatory"},
    {"type": "footer", "content": "Footer text"}
  ],
  "metadata": {
    "author": "Name or Company",
    "date": "${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}",
    "documentNumber": "DOC-XXXX-XXXX",
    "company": "NGEK TECH",
    "copyright": "© ${new Date().getFullYear()} NGEK TECH. All Rights Reserved.",
    "trademark": "NGEK™ and ASI Suite™ are trademarks of NGEK TECH."
  }
}

SPECIAL SECTION FOR INVOICES - Use "invoice_items" type for line items with VAT:
{
  "type": "invoice_items",
  "lineItems": [
    {"description": "Service/Product Name", "quantity": 1, "rate": 100.00, "amount": 100.00},
    {"description": "Another Service", "quantity": 2, "rate": 50.00, "amount": 100.00}
  ],
  "subtotal": 200.00,
  "vatRate": 20,
  "vatAmount": 40.00,
  "grandTotal": 240.00
}

IMPORTANT FOR INVOICES:
- ALWAYS use the "invoice_items" section type for invoices
- ALWAYS generate realistic line items based on the description - break down services into individual billable items
- ALWAYS include VAT (Value Added Tax) at 20% rate unless specified otherwise
- Calculate: subtotal = sum of all line item amounts, vatAmount = subtotal * (vatRate/100), grandTotal = subtotal + vatAmount
- Generate 3-8 realistic line items based on the prompt description
- For web development: include items like "Frontend Development", "Backend Development", "UI/UX Design", "Database Setup", "API Integration", "Testing & QA", "Deployment & Configuration", "Project Management"
- For consulting: include items like "Strategy Consultation", "Technical Assessment", "Implementation Support", "Training Sessions", "Documentation", "Support Hours"
- Make quantities and rates realistic for the service type
- Include a billing address section with "Bill To:" heading before the invoice items

Guidelines:
- Create professional, well-structured documents
- Use appropriate sections for the document type
- Include relevant details based on the user's request
- For invoices: MUST use invoice_items with line items, subtotal, VAT, and grand total
- For contracts: include parties, terms, conditions, signatures
- For reports: include executive summary, findings, recommendations
- For letters: include proper salutation, body, closing
- Always maintain professional tone and formatting
- Generate realistic, plausible content based on the prompt`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `Generate a professional PDF document based on this request: "${prompt}"

Return ONLY the JSON object, no other text.`,
        },
      ],
      system: systemPrompt,
    });

    // Extract text content from the response.
    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    // Parse the JSON response.
    let pdfDocument: PDFDocument;
    try {
      // Clean up the response - remove any markdown code blocks if present.
      let jsonText = textContent.text.trim();
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.slice(7);
      }
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith("```")) {
        jsonText = jsonText.slice(0, -3);
      }
      pdfDocument = JSON.parse(jsonText.trim());
    } catch {
      console.error("Failed to parse LLM response:", textContent.text);
      throw new Error("Failed to generate document structure");
    }

    // Return the structured document data.
    return NextResponse.json({
      success: true,
      document: pdfDocument,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("PDF generation error:", error);
    }

    return NextResponse.json(
      { error: "An error occurred while generating the document." },
      { status: 500 }
    );
  }
}
