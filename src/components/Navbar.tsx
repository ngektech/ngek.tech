"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Info, Menu, X, GraduationCap } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const navItems = [
  { name: "Home.", href: "#home", icon: Home },
  { name: "About.", href: "#about", icon: Info },
  { name: "Team.", href: "#team", icon: Users },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.a
            href="#home"
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Logo size={40} />
            <span className="text-xl font-bold gradient-text">NGEK TECH</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-[#1a1a1a] hover:bg-[#fff5eb] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={18} className="text-[#ff6b00]" />
                <span>{item.name}</span>
              </motion.a>
            ))}
            <Link href="/academics" passHref legacyBehavior>
              <motion.a
                className="flex items-center space-x-2 px-4 py-2 rounded-full text-[#1a1a1a] hover:bg-[#fff5eb] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GraduationCap size={18} className="text-[#ff6b00]" />
                <span>Academics.</span>
              </motion.a>
            </Link>
            <motion.a
              href="#contact"
              className="ml-4 px-6 py-2 gradient-bg text-white rounded-full font-medium"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(255, 107, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us.
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-[#fff5eb]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu."
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-[#ff6b00]" />
            ) : (
              <Menu size={24} className="text-[#ff6b00]" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-menu"
            className="md:hidden glass-effect border-t border-[#e5e5e5]"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#fff5eb] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon size={20} className="text-[#ff6b00]" />
                  <span>{item.name}</span>
                </motion.a>
              ))}
              <Link href="/academics" passHref legacyBehavior>
                <motion.a
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-[#fff5eb] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  <GraduationCap size={20} className="text-[#ff6b00]" />
                  <span>Academics.</span>
                </motion.a>
              </Link>
              <motion.a
                href="#contact"
                className="block text-center px-4 py-3 gradient-bg text-white rounded-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us.
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
