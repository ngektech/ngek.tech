"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ChevronDown, ChevronUp, Shield, BarChart3, Settings, Target } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

interface ConsentData {
  consentId: string;
  preferences: CookiePreferences;
  timestamp: string;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  // Check for existing consent on mount.
  useEffect(() => {
    const checkConsent = async () => {
      try {
        // First check local cookie.
        const localConsent = document.cookie
          .split("; ")
          .find((row) => row.startsWith("cookie_consent="));

        if (localConsent) {
          try {
            const consentData: ConsentData = JSON.parse(
              decodeURIComponent(localConsent.split("=")[1])
            );
            setPreferences(consentData.preferences);
            setIsVisible(false);
            return;
          } catch {
            // Invalid cookie, show banner.
          }
        }

        // No valid consent found, show banner.
        // Small delay for better UX.
        setTimeout(() => setIsVisible(true), 1000);
      } catch (error) {
        console.error("Error checking consent:", error);
        setIsVisible(true);
      }
    };

    checkConsent();
  }, []);

  const saveConsent = async (prefs: CookiePreferences) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cookie-consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preferences: prefs,
        }),
      });

      if (response.ok) {
        setPreferences(prefs);
        setIsVisible(false);
      } else {
        console.error("Failed to save consent.");
      }
    } catch (error) {
      console.error("Error saving consent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Can't toggle necessary cookies.
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e5e5] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#ff6b00] to-[#ff9500] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cookie size={24} className="text-white" />
                <h3 className="text-lg font-bold text-white">Cookie Settings.</h3>
              </div>
              <button
                onClick={acceptNecessary}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close cookie banner"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-[#333] mb-4">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                You can choose which cookies you&apos;d like to allow. For more information, please read our{" "}
                <Link href="/cookie-policy" className="text-[#ff6b00] hover:underline font-medium">
                  Cookie Policy
                </Link>
                .
              </p>

              {/* Toggle Details */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-[#ff6b00] font-medium mb-4 hover:text-[#e55a00] transition-colors"
              >
                {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                {showDetails ? "Hide Details" : "Customize Cookies"}
              </button>

              {/* Cookie Details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-6 border-t border-[#e5e5e5] pt-4">
                      {/* Necessary Cookies */}
                      <div className="flex items-center justify-between p-4 bg-[#f5f5f5] rounded-xl">
                        <div className="flex items-center gap-3">
                          <Shield size={20} className="text-[#ff6b00]" />
                          <div>
                            <p className="font-medium text-[#1a1a1a]">Strictly Necessary.</p>
                            <p className="text-sm text-[#666]">Essential for website functionality.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#666] bg-[#e5e5e5] px-2 py-1 rounded">Always On</span>
                          <div className="w-12 h-6 bg-[#ff6b00] rounded-full relative cursor-not-allowed">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-center justify-between p-4 bg-[#fff5eb] rounded-xl">
                        <div className="flex items-center gap-3">
                          <BarChart3 size={20} className="text-[#ff6b00]" />
                          <div>
                            <p className="font-medium text-[#1a1a1a]">Analytics.</p>
                            <p className="text-sm text-[#666]">Help us improve our website.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => togglePreference("analytics")}
                          className={`w-12 h-6 rounded-full relative transition-colors ${
                            preferences.analytics ? "bg-[#ff6b00]" : "bg-[#ccc]"
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              preferences.analytics ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Functional Cookies */}
                      <div className="flex items-center justify-between p-4 bg-[#fff5eb] rounded-xl">
                        <div className="flex items-center gap-3">
                          <Settings size={20} className="text-[#ff6b00]" />
                          <div>
                            <p className="font-medium text-[#1a1a1a]">Functional.</p>
                            <p className="text-sm text-[#666]">Remember your preferences.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => togglePreference("functional")}
                          className={`w-12 h-6 rounded-full relative transition-colors ${
                            preferences.functional ? "bg-[#ff6b00]" : "bg-[#ccc]"
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              preferences.functional ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-center justify-between p-4 bg-[#fff5eb] rounded-xl">
                        <div className="flex items-center gap-3">
                          <Target size={20} className="text-[#ff6b00]" />
                          <div>
                            <p className="font-medium text-[#1a1a1a]">Marketing.</p>
                            <p className="text-sm text-[#666]">Personalized advertisements.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => togglePreference("marketing")}
                          className={`w-12 h-6 rounded-full relative transition-colors ${
                            preferences.marketing ? "bg-[#ff6b00]" : "bg-[#ccc]"
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              preferences.marketing ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptAll}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff6b00] to-[#ff9500] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#ff6b00]/25 transition-all disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Accept All"}
                </button>
                {showDetails ? (
                  <button
                    onClick={savePreferences}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 border-2 border-[#ff6b00] text-[#ff6b00] font-medium rounded-full hover:bg-[#fff5eb] transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </button>
                ) : (
                  <button
                    onClick={acceptNecessary}
                    disabled={isLoading}
                    className="flex-1 px-6 py-3 border-2 border-[#e5e5e5] text-[#666] font-medium rounded-full hover:bg-[#f5f5f5] transition-colors disabled:opacity-50"
                  >
                    Necessary Only
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
