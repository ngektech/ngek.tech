import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ngek.tech"),
  title: "NGEK TECH | AI Websites for the Future",
  description:
    "NGEK TECH builds AI-powered websites for the future. Founded by Aditya Patange with EK and NA. Full domain, deployment, and features covered.",
  keywords: [
    "AI websites",
    "web development",
    "NGEK TECH",
    "Aditya Patange",
    "website builder",
    "enterprise websites",
  ],
  authors: [{ name: "Aditya Patange" }],
  openGraph: {
    title: "NGEK TECH | AI Websites for the Future",
    description:
      "NGEK TECH builds AI-powered websites for the future. Full domain, deployment, and features covered.",
    type: "website",
    locale: "en_US",
    siteName: "NGEK TECH",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NGEK TECH - AI Websites for the Future.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NGEK TECH | AI Websites for the Future",
    description:
      "NGEK TECH builds AI-powered websites for the future. Full domain, deployment, and features covered.",
    creator: "@AdityaPatange_",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {/* Google Analytics IP Tracking */}
        <GoogleAnalytics measurementId={gaMeasurementId} />
        {children}
      </body>
    </html>
  );
}
