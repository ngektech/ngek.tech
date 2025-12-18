"use client";

import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Guardrail: Only render if measurement ID is provided.
  if (!measurementId) {
    return null;
  }

  // Guardrail: Validate measurement ID format.
  const isValidMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId);
  if (!isValidMeasurementId) {
    console.warn("Invalid Google Analytics measurement ID format.");
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure'
          });

          // Track page views on route change.
          if (typeof window !== 'undefined') {
            window.addEventListener('popstate', function() {
              gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
              });
            });
          }

          // IP tracking enabled (IP is automatically captured by GA4).
        `}
      </Script>
    </>
  );
}
