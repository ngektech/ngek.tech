"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileImage,
  FileText,
  Award,
  Loader2,
} from "lucide-react";
import html2canvas from "html2canvas";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { SkillScore } from "@/lib/academics-types";

interface QuizCertificateProps {
  certificateId: string;
  participantName: string;
  overallScore: number;
  skillBreakdown: SkillScore[];
  completedAt: Date;
  quizId: string;
}

// PDF Styles.
const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Times-Roman",
  },
  container: {
    border: "3px solid #ff6b00",
    padding: 30,
    height: "100%",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6b00",
    marginBottom: 5,
  },
  trademark: {
    fontSize: 8,
    color: "#666666",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 30,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  certifyText: {
    fontSize: 14,
    color: "#444444",
    textAlign: "center",
    marginBottom: 10,
  },
  participantName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 20,
    borderBottom: "2px solid #ff6b00",
    paddingBottom: 10,
  },
  description: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 1.5,
  },
  scoreSection: {
    textAlign: "center",
    marginBottom: 30,
  },
  scoreLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ff6b00",
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 15,
    textAlign: "center",
  },
  skillsContainer: {
    marginBottom: 30,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 40,
  },
  skillName: {
    fontSize: 10,
    color: "#444444",
  },
  skillScore: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  metaSection: {
    marginTop: "auto",
    paddingTop: 20,
    borderTop: "1px solid #e5e5e5",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  metaLabel: {
    fontSize: 9,
    color: "#999999",
  },
  metaValue: {
    fontSize: 9,
    color: "#666666",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
  copyright: {
    fontSize: 8,
    color: "#999999",
    marginBottom: 3,
  },
  disclaimer: {
    fontSize: 7,
    color: "#bbbbbb",
    marginTop: 5,
  },
});

// PDF Document Component.
function CertificatePDF({
  certificateId,
  participantName,
  overallScore,
  skillBreakdown,
  completedAt,
}: QuizCertificateProps) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={pdfStyles.page}>
        <View style={pdfStyles.container}>
          <View style={pdfStyles.header}>
            <Text style={pdfStyles.logo}>NGEK TECH</Text>
            <Text style={pdfStyles.trademark}>TM</Text>
          </View>

          <Text style={pdfStyles.title}>ASI Knowledge Assessment Certificate</Text>

          <Text style={pdfStyles.certifyText}>This is to certify that</Text>

          <Text style={pdfStyles.participantName}>{participantName}</Text>

          <Text style={pdfStyles.description}>
            has successfully completed the Artificial Superintelligence Knowledge Assessment
            and demonstrated understanding of ASI concepts, safety, ethics, and governance.
          </Text>

          <View style={pdfStyles.scoreSection}>
            <Text style={pdfStyles.scoreLabel}>Overall Score</Text>
            <Text style={pdfStyles.scoreValue}>{overallScore}%</Text>
          </View>

          <Text style={pdfStyles.skillsTitle}>Skills Assessed</Text>
          <View style={pdfStyles.skillsContainer}>
            {skillBreakdown.map((skill) => (
              <View key={skill.skill} style={pdfStyles.skillRow}>
                <Text style={pdfStyles.skillName}>{skill.skill}</Text>
                <Text style={pdfStyles.skillScore}>{skill.score}/10</Text>
              </View>
            ))}
          </View>

          <View style={pdfStyles.metaSection}>
            <View style={pdfStyles.metaRow}>
              <Text style={pdfStyles.metaLabel}>Certificate ID:</Text>
              <Text style={pdfStyles.metaValue}>{certificateId}</Text>
            </View>
            <View style={pdfStyles.metaRow}>
              <Text style={pdfStyles.metaLabel}>Date Issued:</Text>
              <Text style={pdfStyles.metaValue}>
                {completedAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>

          <View style={pdfStyles.footer}>
            <Text style={pdfStyles.copyright}>
              © {new Date().getFullYear()} NGEK TECH. All Rights Reserved.
            </Text>
            <Text style={pdfStyles.copyright}>
              NGEK™ and ASI Suite™ are trademarks of NGEK TECH Private Limited.
            </Text>
            <Text style={pdfStyles.disclaimer}>
              This certificate is for educational purposes only. Unauthorized reproduction is prohibited.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default function QuizCertificate(props: QuizCertificateProps) {
  const {
    certificateId,
    participantName,
    overallScore,
    skillBreakdown,
    completedAt,
  } = props;

  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const downloadAsPDF = async () => {
    setIsDownloading("pdf");
    try {
      const blob = await pdf(<CertificatePDF {...props} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ASI_Certificate_${certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error);
    } finally {
      setIsDownloading(null);
    }
  };

  const downloadAsImage = async (format: "png" | "jpeg") => {
    setIsDownloading(format);
    try {
      if (!certificateRef.current) return;

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `ASI_Certificate_${certificateId}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`, format === "jpeg" ? 0.9 : 1);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Image download error:", error);
    } finally {
      setIsDownloading(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
        <Award className="text-[#ff6b00]" size={24} />
        Your Certificate
      </h3>

      {/* Certificate Preview */}
      <div
        ref={certificateRef}
        className="bg-white rounded-2xl p-8 border-4 border-[#ff6b00] shadow-lg"
        style={{ aspectRatio: "1.414/1" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold gradient-text">NGEK TECH<sup className="text-xs">TM</sup></h2>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-center text-[#1a1a1a] uppercase tracking-widest mb-8">
          ASI Knowledge Assessment Certificate
        </h3>

        {/* Certification Text */}
        <p className="text-center text-[#666] mb-4">This is to certify that</p>

        {/* Participant Name */}
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-[#1a1a1a] border-b-2 border-[#ff6b00] inline-block pb-2 px-8">
            {participantName}
          </p>
        </div>

        {/* Description */}
        <p className="text-center text-[#666] text-sm mb-6 max-w-lg mx-auto">
          has successfully completed the Artificial Superintelligence Knowledge Assessment
          and demonstrated understanding of ASI concepts, safety, ethics, and governance.
        </p>

        {/* Score */}
        <div className="text-center mb-6">
          <p className="text-sm text-[#666] mb-1">Overall Score</p>
          <p className="text-5xl font-bold gradient-text">{overallScore}%</p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <p className="text-center font-bold text-[#1a1a1a] mb-4">Skills Assessed</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-md mx-auto">
            {skillBreakdown.map((skill) => (
              <div key={skill.skill} className="flex justify-between text-sm">
                <span className="text-[#666]">{skill.skill}</span>
                <span className={`font-bold ${getScoreColor(skill.score)}`}>
                  {skill.score}/10
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Info */}
        <div className="border-t border-[#e5e5e5] pt-4 mt-auto">
          <div className="flex justify-between text-xs text-[#999] mb-4">
            <span>Certificate ID: {certificateId}</span>
            <span>
              Date: {completedAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-[#999]">
              © {new Date().getFullYear()} NGEK TECH. All Rights Reserved.
            </p>
            <p className="text-xs text-[#999]">
              NGEK™ and ASI Suite™ are trademarks of NGEK TECH Private Limited.
            </p>
            <p className="text-[10px] text-[#ccc] mt-2">
              This certificate is for educational purposes only. Unauthorized reproduction is prohibited.
            </p>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <motion.button
          onClick={downloadAsPDF}
          disabled={isDownloading !== null}
          className="flex items-center gap-2 px-4 py-2 gradient-bg text-white rounded-lg disabled:opacity-50"
          whileHover={{ scale: isDownloading ? 1 : 1.02 }}
          whileTap={{ scale: isDownloading ? 1 : 0.98 }}
        >
          {isDownloading === "pdf" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileText size={18} />
          )}
          Download PDF
        </motion.button>

        <motion.button
          onClick={() => downloadAsImage("png")}
          disabled={isDownloading !== null}
          className="flex items-center gap-2 px-4 py-2 border border-[#ff6b00] text-[#ff6b00] rounded-lg hover:bg-[#fff5eb] disabled:opacity-50"
          whileHover={{ scale: isDownloading ? 1 : 1.02 }}
          whileTap={{ scale: isDownloading ? 1 : 0.98 }}
        >
          {isDownloading === "png" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileImage size={18} />
          )}
          Download PNG
        </motion.button>

        <motion.button
          onClick={() => downloadAsImage("jpeg")}
          disabled={isDownloading !== null}
          className="flex items-center gap-2 px-4 py-2 border border-[#e5e5e5] text-[#666] rounded-lg hover:bg-[#fff5eb] disabled:opacity-50"
          whileHover={{ scale: isDownloading ? 1 : 1.02 }}
          whileTap={{ scale: isDownloading ? 1 : 0.98 }}
        >
          {isDownloading === "jpeg" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          Download JPEG
        </motion.button>
      </div>
    </div>
  );
}
