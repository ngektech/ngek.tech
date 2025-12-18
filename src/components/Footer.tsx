"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={40} />
              <span className="text-2xl font-bold">NGEK TECH</span>
            </div>
            <p className="text-[#767676] mb-6 max-w-md">
              AI websites for the future. Building trillion dollar dreams one
              website at a time.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://x.com/AdityaPatange_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff6b00] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                href="https://github.com/ngektech/ngek.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff6b00] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/ngek-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff6b00] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="mailto:contact.adityapatange@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff6b00] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links.</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-[#767676] hover:text-[#ff6b00] transition-colors"
                >
                  Home.
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-[#767676] hover:text-[#ff6b00] transition-colors"
                >
                  About.
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-[#767676] hover:text-[#ff6b00] transition-colors"
                >
                  Team.
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-[#767676] hover:text-[#ff6b00] transition-colors"
                >
                  Blog.
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[#767676] hover:text-[#ff6b00] transition-colors"
                >
                  Contact.
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services.</h4>
            <ul className="space-y-3">
              <li className="text-[#767676]">AI Websites.</li>
              <li className="text-[#767676]">Domain Setup.</li>
              <li className="text-[#767676]">Deployment.</li>
              <li className="text-[#767676]">Maintenance.</li>
              <li className="text-[#767676]">Support.</li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Link
            href="/terms"
            className="text-[#767676] hover:text-[#ff6b00] transition-colors"
          >
            Terms and Conditions
          </Link>
          <span className="text-[#666]">|</span>
          <Link
            href="/privacy"
            className="text-[#767676] hover:text-[#ff6b00] transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Guardrail Notice */}
        <div className="mt-12 py-4 px-4 rounded-xl border-l-4 border-[#ff6b00] bg-white/10">
          <p className="text-sm text-white/90">
            <strong className="text-[#ff6b00]">Security Notice:</strong> All data
            is encrypted and handled according to industry standards. Your privacy
            is protected by our comprehensive security measures.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center space-y-2">
          <p className="text-[#767676] flex items-center justify-center gap-2">
            &copy; {currentYear} NGEK&copy; (NGEK TECH). Made with
            <Heart size={16} className="text-[#ff6b00] fill-[#ff6b00]" />
            by Aditya Patange&trade;, EK & NA.
          </p>
          <p className="text-[#666] text-sm">
            Aditya Patange&trade; is a registered trademark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
