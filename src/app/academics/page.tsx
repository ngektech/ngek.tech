import { Metadata } from "next";
import AcademicsQuiz from "@/components/AcademicsQuiz";

export const metadata: Metadata = {
  title: "ASI Knowledge Assessment | NGEK TECH Academics",
  description:
    "Test your knowledge on Artificial Superintelligence (ASI) with our comprehensive quiz. Earn a certificate and assess your skills in AI safety, ethics, alignment, and more.",
  keywords: [
    "ASI",
    "Artificial Superintelligence",
    "AI Quiz",
    "AI Knowledge Test",
    "AI Safety",
    "AI Ethics",
    "AI Alignment",
    "NGEK TECH",
  ],
  openGraph: {
    title: "ASI Knowledge Assessment | NGEK TECH Academics",
    description:
      "Test your knowledge on Artificial Superintelligence with our AI-powered quiz and earn a certificate.",
    type: "website",
  },
};

export default function AcademicsPage() {
  return <AcademicsQuiz />;
}
