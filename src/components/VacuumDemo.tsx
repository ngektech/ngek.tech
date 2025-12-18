"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Power, PowerOff, Flower2, RefreshCw } from "lucide-react";

// Cached quotes from various personalities (pre-fetched and stored).
const cachedQuotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    quote: "Be the change you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    quote: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
];

export default function VacuumDemo() {
  const [isOn, setIsOn] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(cachedQuotes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const toggleVacuum = useCallback(() => {
    setIsOn((prev) => !prev);
  }, []);

  const getNextQuote = useCallback(() => {
    setIsLoading(true);

    // Simulate LLM processing with rotation through cached quotes.
    setTimeout(() => {
      const nextIndex = (quoteIndex + 1) % cachedQuotes.length;
      setQuoteIndex(nextIndex);
      setCurrentQuote(cachedQuotes[nextIndex]);
      setIsLoading(false);
    }, 500);
  }, [quoteIndex]);

  return (
    <section id="vacuum" className="py-20 bg-[#fff5eb]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Vacuum Cleaner Demo</span>
          </h2>
          <p className="text-[#666]">
            A simple button-controlled vacuum that rotates wisdom from great minds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          {/* Vacuum Cleaner Visual */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 ${
                isOn ? "gradient-bg animate-pulse-glow" : "bg-[#e5e5e5]"
              }`}
              animate={isOn ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isOn
                  ? { duration: 2, repeat: Infinity, ease: "linear" }
                  : { duration: 0.5 }
              }
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <motion.div
                  animate={isOn ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={isOn ? { duration: 0.5, repeat: Infinity } : {}}
                >
                  {isOn ? (
                    <Power size={40} className="text-[#ff6b00]" />
                  ) : (
                    <PowerOff size={40} className="text-[#767676]" />
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Control Button */}
            <motion.button
              onClick={toggleVacuum}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${
                isOn
                  ? "bg-[#1a1a1a] text-white"
                  : "gradient-bg text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOn ? "Turn Off." : "Turn On."}
            </motion.button>
          </div>

          {/* Quote Display */}
          <AnimatePresence mode="wait">
            {isOn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="guardrail py-6 px-4 rounded-r-xl mb-6">
                  <motion.p
                    key={currentQuote.quote}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl md:text-2xl text-[#1a1a1a] italic mb-3"
                  >
                    &ldquo;{currentQuote.quote}&rdquo;
                  </motion.p>
                  <p className="text-[#ff6b00] font-semibold">
                    &mdash; {currentQuote.author}
                  </p>
                </div>

                <motion.button
                  onClick={getNextQuote}
                  disabled={isLoading}
                  className="flex items-center gap-2 mx-auto px-6 py-2 border-2 border-[#ff6b00] text-[#ff6b00] rounded-full hover:bg-[#fff5eb] transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw
                    size={18}
                    className={isLoading ? "animate-spin" : ""}
                  />
                  {isLoading ? "Loading." : "Next Quote."}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 pt-6 border-t border-[#e5e5e5] text-center"
          >
            <div className="flex items-center justify-center gap-2 text-[#666]">
              <Flower2 className="text-[#ff6b00]" size={20} />
              <p className="italic">
                &ldquo;I&apos;m a polyphase motor that rotates syllables with no strain&rdquo;
              </p>
              <Flower2 className="text-[#ff6b00]" size={20} />
            </div>
            <p className="text-[#ff6b00] font-semibold mt-2">
              &mdash; Real Talk, Adi 55
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
