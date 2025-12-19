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
} from "lucide-react";
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
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 11,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
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

export default function ASISuite() {
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

  const examplePrompts = [
    "Create a professional invoice for web development services, $5,000 total",
    "Generate a project proposal for a mobile app development",
    "Create an employment contract for a software engineer",
    "Generate a certificate of completion for an online course",
  ];

  return (
    <section id="asi-suite" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b00]/10 rounded-full mb-6">
            <Cpu size={18} className="text-[#ff6b00]" />
            <span className="text-[#ff6b00] font-semibold text-sm">Artificial Super Intelligence.</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">ASI</span>{" "}
            <span className="gradient-text">Suite™</span>
          </h2>
          <p className="text-[#999] text-lg max-w-2xl mx-auto">
            Enterprise-grade AI-powered tools for document generation, powered by NGEK TECH's Artificial Super Intelligence.
          </p>
        </motion.div>

        {/* PDF Generator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[#2a2a2a] rounded-3xl border border-[#3a3a3a] overflow-hidden shadow-2xl">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#ff6b00] to-[#ff9500] p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">PDF Generator.</h3>
                  <p className="text-white/80 text-sm">Generate professional documents instantly.</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  Document Description.
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the document you want to generate. For example: 'Create an invoice for consulting services provided to Acme Corp, 40 hours at $150/hour, due in 30 days.'"
                  className="w-full h-32 px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-[#ff6b00] transition-colors resize-none"
                  maxLength={5000}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-[#666]">
                    Supports: Invoices, Contracts, Reports, Letters, Proposals, Certificates, and more.
                  </span>
                  <span className="text-xs text-[#666]">{prompt.length}/5000</span>
                </div>
              </div>

              {/* Example Prompts */}
              <div className="mb-6">
                <p className="text-sm text-[#666] mb-2">Try an example:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="px-3 py-1 text-xs bg-[#3a3a3a] text-[#999] rounded-full hover:bg-[#4a4a4a] hover:text-white transition-colors"
                    >
                      {example.length > 40 ? example.slice(0, 40) + "..." : example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {success && generatedDocument && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <p className="text-green-400 text-sm flex items-center gap-2">
                    <CheckCircle size={16} />
                    Document generated successfully: "{generatedDocument.title}"
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex-1 px-6 py-4 gradient-bg text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                  whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Document.
                    </>
                  )}
                </motion.button>

                {generatedDocument && (
                  <motion.button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 px-6 py-4 bg-white text-[#1a1a1a] rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                    whileTap={{ scale: isDownloading ? 1 : 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        Download PDF.
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-[#1a1a1a] border-t border-[#3a3a3a]">
              <p className="text-xs text-[#666] text-center">
                © {new Date().getFullYear()} NGEK TECH. All Rights Reserved. NGEK™ and ASI Suite™ are registered trademarks of NGEK TECH.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { icon: FileText, title: "Multiple Formats", desc: "Invoices, contracts, reports, and more." },
            { icon: Sparkles, title: "AI-Powered", desc: "Intelligent content generation." },
            { icon: Download, title: "Instant Download", desc: "Production-ready PDFs." },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-[#ff6b00]/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <feature.icon size={24} className="text-[#ff6b00]" />
              </div>
              <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
              <p className="text-[#666] text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
