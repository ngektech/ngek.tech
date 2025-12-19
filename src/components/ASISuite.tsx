"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Loader2,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Cpu,
  X,
  Lock,
  Image,
  Code,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface PDFSection {
  type: string;
  content?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  align?: string;
  style?: string;
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

// Professional PDF Styles using Times-Roman for formal documents.
const styles = StyleSheet.create({
  // Page Layout.
  page: {
    padding: 50,
    paddingBottom: 100,
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
  },
  // Header Section - Two Column Layout.
  header: {
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    width: "50%",
  },
  headerRight: {
    width: "45%",
    alignItems: "flex-end",
  },
  logoContainer: {
    marginBottom: 8,
  },
  logo: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: "#ff6b00",
  },
  logoTM: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#ff6b00",
  },
  companyName: {
    fontSize: 10,
    color: "#666666",
    marginTop: 4,
  },
  companyTagline: {
    fontSize: 8,
    color: "#999999",
    marginTop: 2,
  },
  // Document Info Box.
  documentInfoBox: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 4,
    minWidth: 180,
  },
  documentInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  documentInfoLabel: {
    fontSize: 8,
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  documentInfoValue: {
    fontSize: 9,
    color: "#1a1a1a",
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  // Header Divider.
  headerDivider: {
    borderBottomWidth: 2,
    borderBottomColor: "#ff6b00",
    marginBottom: 25,
  },
  // Document Title Section.
  documentTypeLabel: {
    fontSize: 12,
    color: "#ff6b00",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 4,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 0,
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: 11,
    color: "#666666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
    lineHeight: 1.4,
  },
  // Section Headings.
  heading: {
    fontSize: 13,
    fontFamily: "Times-Bold",
    color: "#1a1a1a",
    marginTop: 25,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  subheading: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    color: "#333333",
    marginTop: 15,
    marginBottom: 8,
  },
  // Paragraph.
  paragraph: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 12,
    textAlign: "justify",
    color: "#333333",
  },
  // List Styles.
  listItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 8,
  },
  listBullet: {
    width: 15,
    fontSize: 10,
    color: "#ff6b00",
  },
  listContent: {
    flex: 1,
    fontSize: 10,
    color: "#333333",
  },
  // Bill To / Ship To Section.
  addressSection: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 25,
  },
  addressBox: {
    width: "48%",
    marginRight: "4%",
  },
  addressLabel: {
    fontSize: 8,
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
  },
  addressText: {
    fontSize: 10,
    color: "#1a1a1a",
    lineHeight: 1.6,
  },
  // Invoice Table - Grid Aligned.
  invoiceTable: {
    marginTop: 15,
    marginBottom: 20,
  },
  invoiceHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#2d3748",
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  invoiceHeaderCell: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 10,
  },
  invoiceRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    backgroundColor: "#ffffff",
  },
  invoiceRowAlt: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    backgroundColor: "#fafafa",
  },
  invoiceCell: {
    fontSize: 9,
    color: "#333333",
    paddingHorizontal: 10,
  },
  // Grid Column Widths - Percentage Based.
  colDesc: { width: "45%" },
  colQty: { width: "12%", textAlign: "center" },
  colRate: { width: "18%", textAlign: "right" },
  colAmount: { width: "25%", textAlign: "right" },
  // Amount Cell Bold.
  invoiceCellBold: {
    fontSize: 9,
    color: "#1a1a1a",
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 10,
  },
  // Totals Section - Right Aligned Grid.
  totalsContainer: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  totalsBox: {
    width: 250,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 10,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  totalsLabel: {
    fontSize: 9,
    color: "#666666",
  },
  totalsValue: {
    fontSize: 9,
    color: "#1a1a1a",
    textAlign: "right",
  },
  totalsDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginVertical: 5,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#2d3748",
    marginTop: 5,
  },
  grandTotalLabel: {
    fontSize: 11,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  grandTotalValue: {
    fontSize: 12,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
  },
  // Regular Table Styles.
  table: {
    marginTop: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#ff6b00",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 9,
    color: "#333333",
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textTransform: "uppercase",
  },
  // Divider.
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginVertical: 20,
  },
  // Signature.
  signature: {
    marginTop: 40,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    width: 200,
    marginBottom: 6,
  },
  signatureText: {
    fontSize: 9,
    color: "#666666",
  },
  // Terms Section - USA & India Standards.
  termsSection: {
    marginTop: 25,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 4,
  },
  termsTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 8,
    color: "#666666",
    lineHeight: 1.6,
    marginBottom: 6,
  },
  termsGrid: {
    flexDirection: "row",
    marginTop: 10,
  },
  termsColumn: {
    width: "50%",
    paddingRight: 10,
  },
  termsColumnTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#999999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  // Footer.
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
  },
  footerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 12,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footerLeft: {
    fontSize: 7,
    color: "#999999",
    width: "40%",
  },
  footerCenter: {
    fontSize: 8,
    color: "#ff6b00",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    width: "20%",
  },
  footerRight: {
    fontSize: 7,
    color: "#999999",
    textAlign: "right",
    width: "40%",
  },
  // Watermark.
  watermark: {
    position: "absolute",
    top: "45%",
    left: "15%",
    fontSize: 80,
    color: "#f5f5f5",
    transform: "rotate(-45deg)",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 10,
  },
  // VAT Notice Box.
  vatNotice: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#fff8f0",
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "#ff6b00",
  },
  vatNoticeText: {
    fontSize: 7,
    color: "#666666",
    lineHeight: 1.5,
  },
});

// Helper function to format currency.
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

// PDF Document Component with professional layout.
const PDFDocumentComponent = ({ document }: { document: PDFDocument }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Watermark */}
      <Text style={styles.watermark}>NGEK TECH</Text>

      {/* Header - Two Column Layout */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {/* Left Column - Logo & Company Info */}
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>NGEK<Text style={styles.logoTM}>™</Text></Text>
            </View>
            <Text style={styles.companyName}>ASI Suite™ Document Generator</Text>
            <Text style={styles.companyTagline}>Powered by Artificial Super Intelligence</Text>
          </View>

          {/* Right Column - Document Info Box */}
          <View style={styles.headerRight}>
            <View style={styles.documentInfoBox}>
              <View style={styles.documentInfoRow}>
                <Text style={styles.documentInfoLabel}>Date:</Text>
                <Text style={styles.documentInfoValue}>{document.metadata.date}</Text>
              </View>
              {document.metadata.documentNumber && (
                <View style={styles.documentInfoRow}>
                  <Text style={styles.documentInfoLabel}>Doc No:</Text>
                  <Text style={styles.documentInfoValue}>{document.metadata.documentNumber}</Text>
                </View>
              )}
              <View style={styles.documentInfoRow}>
                <Text style={styles.documentInfoLabel}>Author:</Text>
                <Text style={styles.documentInfoValue}>{document.metadata.author}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.headerDivider} />
      </View>

      {/* Document Type Label */}
      <Text style={styles.documentTypeLabel}>{document.documentType}</Text>

      {/* Title */}
      <Text style={styles.title}>{document.title}</Text>

      {/* Subtitle */}
      {document.subtitle && <Text style={styles.subtitle}>{document.subtitle}</Text>}

      {/* Sections */}
      {document.sections.map((section, index) => {
        switch (section.type) {
          case "heading":
            return (
              <Text key={index} style={styles.heading}>
                {section.content}
              </Text>
            );
          case "subheading":
            return (
              <Text key={index} style={styles.subheading}>
                {section.content}
              </Text>
            );
          case "paragraph":
            return (
              <Text key={index} style={styles.paragraph}>
                {section.content}
              </Text>
            );
          case "list":
            return (
              <View key={index}>
                {section.items?.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.listItem}>
                    <Text style={styles.listBullet}>•</Text>
                    <Text style={styles.listContent}>{item}</Text>
                  </View>
                ))}
              </View>
            );
          case "invoice_items":
            return (
              <View key={index}>
                {/* Invoice Line Items Table */}
                <View style={styles.invoiceTable}>
                  {/* Header Row - Grid Aligned */}
                  <View style={styles.invoiceHeaderRow}>
                    <Text style={[styles.invoiceHeaderCell, styles.colDesc]}>Description</Text>
                    <Text style={[styles.invoiceHeaderCell, styles.colQty]}>Qty</Text>
                    <Text style={[styles.invoiceHeaderCell, styles.colRate]}>Unit Price</Text>
                    <Text style={[styles.invoiceHeaderCell, styles.colAmount]}>Amount (USD)</Text>
                  </View>
                  {/* Line Items - Grid Aligned */}
                  {section.lineItems?.map((item, itemIndex) => (
                    <View key={itemIndex} style={itemIndex % 2 === 0 ? styles.invoiceRow : styles.invoiceRowAlt}>
                      <Text style={[styles.invoiceCell, styles.colDesc]}>{item.description}</Text>
                      <Text style={[styles.invoiceCell, styles.colQty]}>{item.quantity}</Text>
                      <Text style={[styles.invoiceCell, styles.colRate]}>{formatCurrency(item.rate)}</Text>
                      <Text style={[styles.invoiceCellBold, styles.colAmount]}>{formatCurrency(item.amount)}</Text>
                    </View>
                  ))}
                </View>

                {/* Totals Section - Right Aligned */}
                <View style={styles.totalsContainer}>
                  <View style={styles.totalsBox}>
                    <View style={styles.totalsRow}>
                      <Text style={styles.totalsLabel}>Subtotal</Text>
                      <Text style={styles.totalsValue}>{formatCurrency(section.subtotal || 0)}</Text>
                    </View>
                    {section.vatRate !== undefined && section.vatAmount !== undefined && (
                      <>
                        <View style={styles.totalsRow}>
                          <Text style={styles.totalsLabel}>VAT ({section.vatRate}%)</Text>
                          <Text style={styles.totalsValue}>{formatCurrency(section.vatAmount)}</Text>
                        </View>
                      </>
                    )}
                    <View style={styles.grandTotalRow}>
                      <Text style={styles.grandTotalLabel}>Total Due</Text>
                      <Text style={styles.grandTotalValue}>{formatCurrency(section.grandTotal || 0)}</Text>
                    </View>
                  </View>
                </View>

                {/* Payment Terms & Legal Notice - USA & India Standards */}
                <View style={styles.termsSection}>
                  <Text style={styles.termsTitle}>Payment Terms & Conditions</Text>
                  <Text style={styles.termsText}>
                    Payment is due within 30 days of invoice date. Late payments may be subject to interest at 1.5% per month (18% per annum).
                  </Text>
                  <View style={styles.termsGrid}>
                    {/* USA Standards */}
                    <View style={styles.termsColumn}>
                      <Text style={styles.termsColumnTitle}>USA Standards (UCC)</Text>
                      <Text style={styles.vatNoticeText}>
                        • Governed by Uniform Commercial Code{"\n"}
                        • Net 30 payment terms apply{"\n"}
                        • Disputes subject to arbitration{"\n"}
                        • Sales tax: Applied per state law{"\n"}
                        • EIN: Available upon request
                      </Text>
                    </View>
                    {/* India Standards */}
                    <View style={styles.termsColumn}>
                      <Text style={styles.termsColumnTitle}>India Standards (GST)</Text>
                      <Text style={styles.vatNoticeText}>
                        • Compliant with GST Act 2017{"\n"}
                        • GSTIN: Available upon request{"\n"}
                        • SAC Code: 998314 (IT Services){"\n"}
                        • HSN Code: As applicable{"\n"}
                        • PAN: Available upon request
                      </Text>
                    </View>
                  </View>
                </View>

                {/* VAT Notice */}
                {section.vatRate !== undefined && (
                  <View style={styles.vatNotice}>
                    <Text style={styles.vatNoticeText}>
                      VAT/GST Registration: This invoice includes applicable taxes at {section.vatRate}% rate.
                      Tax Amount: {formatCurrency(section.vatAmount || 0)} | Currency: USD |
                      NGEK TECH Tax ID: NGEK-TAX-2025-001 | This document serves as a valid tax invoice for input credit purposes.
                    </Text>
                  </View>
                )}
              </View>
            );
          case "table":
            return (
              <View key={index} style={styles.table}>
                {section.headers && (
                  <View style={styles.tableHeaderRow}>
                    {section.headers.map((header, headerIndex) => (
                      <Text key={headerIndex} style={styles.tableHeaderCell}>
                        {header}
                      </Text>
                    ))}
                  </View>
                )}
                {section.rows?.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.tableRow}>
                    {row.map((cell, cellIndex) => (
                      <Text key={cellIndex} style={styles.tableCell}>
                        {cell}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            );
          case "divider":
            return <View key={index} style={styles.divider} />;
          case "signature":
            return (
              <View key={index} style={styles.signature}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureText}>{section.content}</Text>
              </View>
            );
          default:
            return null;
        }
      })}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <View style={styles.footerContent}>
          <Text style={styles.footerLeft}>
            {document.metadata.copyright}
          </Text>
          <Text style={styles.footerCenter}>
            NGEK™
          </Text>
          <Text style={styles.footerRight}>
            {document.metadata.trademark}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

// ASI Suite Apps Configuration.
interface ASIApp {
  id: string;
  name: string;
  description: string;
  icon: typeof FileText;
  status: "active" | "coming_soon";
  gradient: string;
}

const asiApps: ASIApp[] = [
  {
    id: "pdf-generator",
    name: "PDF Generator",
    description: "Generate professional invoices, contracts, reports, and documents instantly.",
    icon: FileText,
    status: "active",
    gradient: "from-[#ff6b00] to-[#ff9500]",
  },
  {
    id: "image-gen",
    name: "Image Studio",
    description: "AI-powered image generation and editing tools.",
    icon: Image,
    status: "coming_soon",
    gradient: "from-[#8b5cf6] to-[#a855f7]",
  },
  {
    id: "code-assist",
    name: "Code Assistant",
    description: "Intelligent code generation, review, and optimization.",
    icon: Code,
    status: "coming_soon",
    gradient: "from-[#10b981] to-[#34d399]",
  },
  {
    id: "chat-ai",
    name: "Chat AI",
    description: "Advanced conversational AI for customer support and more.",
    icon: MessageSquare,
    status: "coming_soon",
    gradient: "from-[#3b82f6] to-[#60a5fa]",
  },
  {
    id: "analytics",
    name: "Data Analytics",
    description: "AI-driven insights and business intelligence.",
    icon: BarChart3,
    status: "coming_soon",
    gradient: "from-[#f59e0b] to-[#fbbf24]",
  },
  {
    id: "secure-vault",
    name: "Secure Vault",
    description: "Encrypted document storage and management.",
    icon: Lock,
    status: "coming_soon",
    gradient: "from-[#ef4444] to-[#f87171]",
  },
];

export default function ASISuite() {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<PDFDocument | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || prompt.trim().length < 10) {
      setError("Please provide a detailed description (at least 10 characters).");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(false);
    setGeneratedDocument(null);

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate document.");
      }

      setGeneratedDocument(data.document);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedDocument) return;

    setIsDownloading(true);
    setError(null);

    try {
      console.log("[PDF Download] Starting PDF generation...");
      console.log("[PDF Download] Document:", JSON.stringify(generatedDocument, null, 2));

      const blob = await pdf(<PDFDocumentComponent document={generatedDocument} />).toBlob();
      console.log("[PDF Download] Blob created successfully, size:", blob.size);

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${generatedDocument.title.replace(/[^a-z0-9]/gi, "_")}_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("[PDF Download] Download initiated successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      const errorStack = err instanceof Error ? err.stack : "";

      console.error("[PDF Download] Error generating PDF:");
      console.error("[PDF Download] Message:", errorMessage);
      console.error("[PDF Download] Stack:", errorStack);
      console.error("[PDF Download] Full error:", err);
      console.error("[PDF Download] Document that failed:", JSON.stringify(generatedDocument, null, 2));

      setError(`Failed to download PDF: ${errorMessage}. Check console for details.`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCloseApp = () => {
    setActiveApp(null);
    setPrompt("");
    setError(null);
    setSuccess(false);
    setGeneratedDocument(null);
  };

  const examplePrompts = [
    "Create a professional invoice for web development services, $5,000 total",
    "Generate a project proposal for a mobile app development",
    "Create an employment contract for a software engineer",
    "Generate a certificate of completion for an online course",
  ];

  return (
    <>
      {/* Landing Page Section - Clean App Grid */}
      <section id="asi-suite" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b00]/10 rounded-full mb-6 border border-[#ff6b00]/20">
              <Cpu size={18} className="text-[#ff6b00]" />
              <span className="text-[#ff6b00] font-semibold text-sm">Artificial Super Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">ASI</span>{" "}
              <span className="gradient-text">Suite™</span>
            </h2>
            <p className="text-[#888] text-lg max-w-2xl mx-auto">
              Enterprise-grade AI-powered tools. Click on any app to launch.
            </p>
          </motion.div>

          {/* Apps Grid - Clean Rectangle Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {asiApps.map((app, index) => (
              <motion.button
                key={app.id}
                onClick={() => app.status === "active" && setActiveApp(app.id)}
                disabled={app.status === "coming_soon"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={app.status === "active" ? { scale: 1.02, y: -4 } : {}}
                whileTap={app.status === "active" ? { scale: 0.98 } : {}}
                className={`relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 text-left transition-all group ${
                  app.status === "active"
                    ? "hover:border-[#ff6b00]/50 hover:shadow-lg hover:shadow-[#ff6b00]/10 cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                {/* App Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <app.icon size={28} className="text-white" />
                </div>

                {/* App Name */}
                <h3 className="text-white font-bold text-lg mb-2">{app.name}</h3>

                {/* App Description */}
                <p className="text-[#666] text-sm leading-relaxed">{app.description}</p>

                {/* Status Badge */}
                {app.status === "coming_soon" && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-[#2a2a2a] rounded-full">
                    <span className="text-[10px] text-[#666] font-medium uppercase tracking-wider">Coming Soon</span>
                  </div>
                )}

                {/* Active Indicator */}
                {app.status === "active" && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-[#444] text-xs mt-12"
          >
            © {new Date().getFullYear()} NGEK TECH. All Rights Reserved. NGEK™ and ASI Suite™ are registered trademarks.
          </motion.p>
        </div>
      </section>

      {/* Full Screen App Modal */}
      <AnimatePresence>
        {activeApp === "pdf-generator" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a]"
          >
            {/* App Header */}
            <div className="bg-gradient-to-r from-[#ff6b00] to-[#ff9500] px-6 py-4">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-xl">PDF Generator</h1>
                    <p className="text-white/70 text-sm">ASI Suite™ by NGEK TECH</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseApp}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* App Content */}
            <div className="overflow-y-auto h-[calc(100vh-72px)]">
              <div className="max-w-4xl mx-auto px-6 py-8">
                {/* App Title & Description */}
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    AI-Powered Document Generator
                  </h2>
                  <p className="text-[#888] text-lg max-w-2xl mx-auto leading-relaxed">
                    Transform your ideas into professional, production-ready PDF documents in seconds.
                    Powered by advanced AI to generate invoices, contracts, reports, proposals, certificates, and more.
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <span className="px-3 py-1 bg-[#ff6b00]/10 text-[#ff6b00] text-sm font-medium rounded-full border border-[#ff6b00]/20">
                      Enterprise Grade
                    </span>
                    <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-sm font-medium rounded-full border border-[#10b981]/20">
                      AI-Powered
                    </span>
                    <span className="px-3 py-1 bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium rounded-full border border-[#3b82f6]/20">
                      Instant Export
                    </span>
                  </div>
                </div>

                {/* Prompt Section */}
                <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 mb-6">
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Document Description
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the document you want to generate. For example: 'Create an invoice for consulting services provided to Acme Corp, 40 hours at $150/hour, due in 30 days.'"
                    className="w-full h-36 px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl text-white placeholder-[#555] focus:outline-none focus:border-[#ff6b00] transition-colors resize-none text-base"
                    maxLength={5000}
                  />
                  <div className="flex justify-between mt-3">
                    <span className="text-sm text-[#555]">
                      Supports: Invoices, Contracts, Reports, Letters, Proposals, Certificates
                    </span>
                    <span className="text-sm text-[#555]">{prompt.length}/5000</span>
                  </div>
                </div>

                {/* Example Prompts */}
                <div className="mb-6">
                  <p className="text-sm text-[#666] mb-3 font-medium">Quick Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="px-4 py-2 text-sm bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] rounded-lg hover:bg-[#2a2a2a] hover:text-white hover:border-[#3a3a3a] transition-all"
                      >
                        {example.length > 45 ? example.slice(0, 45) + "..." : example}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <AlertCircle size={18} />
                      {error}
                    </p>
                  </div>
                )}

                {/* Success Message */}
                {success && generatedDocument && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <CheckCircle size={18} />
                      Document generated successfully: &quot;{generatedDocument.title}&quot;
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-[#ff6b00] to-[#ff9500] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#ff6b00]/20"
                    whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                    whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={22} className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={22} />
                        Generate Document
                      </>
                    )}
                  </motion.button>

                  {generatedDocument && (
                    <motion.button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="flex-1 px-8 py-4 bg-white text-[#1a1a1a] rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                      whileTap={{ scale: isDownloading ? 1 : 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 size={22} className="animate-spin" />
                          Preparing...
                        </>
                      ) : (
                        <>
                          <Download size={22} />
                          Download PDF
                        </>
                      )}
                    </motion.button>
                  )}
                </div>

                {/* Features Grid */}
                <div className="mt-12 grid grid-cols-3 gap-6">
                  {[
                    { icon: FileText, title: "Multiple Formats", desc: "Invoices, contracts, reports" },
                    { icon: Sparkles, title: "AI-Powered", desc: "Intelligent generation" },
                    { icon: Download, title: "Instant Download", desc: "Production-ready PDFs" },
                  ].map((feature, index) => (
                    <div key={index} className="text-center p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
                      <div className="w-10 h-10 bg-[#ff6b00]/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <feature.icon size={20} className="text-[#ff6b00]" />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-[#555] text-xs">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-[#2a2a2a]">
                  {/* Footer Logo & Branding */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-[#ff6b00]">NGEK</span>
                      <span className="text-[#666] text-xs align-super">™</span>
                    </div>
                    <p className="text-[#555] text-sm">
                      ASI Suite™ — Enterprise AI Solutions
                    </p>
                  </div>

                  {/* Footer Links */}
                  <div className="flex justify-center gap-8 text-xs text-[#444] mb-6">
                    <a href="/terms" className="hover:text-[#ff6b00] transition-colors">Terms of Service</a>
                    <a href="/privacy" className="hover:text-[#ff6b00] transition-colors">Privacy Policy</a>
                    <a href="#contact" onClick={handleCloseApp} className="hover:text-[#ff6b00] transition-colors">Contact</a>
                  </div>

                  {/* Copyright & Legal */}
                  <div className="text-center space-y-2">
                    <p className="text-[#444] text-xs">
                      © {new Date().getFullYear()} NGEK TECH. All Rights Reserved.
                    </p>
                    <p className="text-[#333] text-[10px]">
                      NGEK™, ASI Suite™, and the NGEK logo are registered trademarks of NGEK TECH.
                    </p>
                    <p className="text-[#333] text-[10px]">
                      This application and its contents are protected by international copyright and trademark laws.
                    </p>
                    <p className="text-[#333] text-[10px] mt-4">
                      Powered by Artificial Super Intelligence • Made with innovation in mind
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
