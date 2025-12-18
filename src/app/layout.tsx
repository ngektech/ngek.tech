import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
    <html lang="en">
      <head>
        {/* Google Sans Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Fallback to Product Sans which is similar */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Google Analytics IP Tracking */}
        <GoogleAnalytics measurementId={gaMeasurementId} />
        {children}
      </body>
    </html>
  );
}
