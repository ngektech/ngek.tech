"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="NGEK TECH Logo - Atomic structure with orbiting electrons."
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <title>NGEK TECH Logo.</title>
      {/* Nucleoid - Central nucleus */}
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        fill="url(#nucleoidGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Electron orbit 1 */}
      <motion.ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="15"
        fill="none"
        stroke="#ff6b00"
        strokeWidth="2"
        opacity="0.6"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Electron orbit 2 */}
      <motion.ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="15"
        fill="none"
        stroke="#ff9500"
        strokeWidth="2"
        opacity="0.6"
        transform="rotate(60 50 50)"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Electron orbit 3 */}
      <motion.ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="15"
        fill="none"
        stroke="#ffb347"
        strokeWidth="2"
        opacity="0.6"
        transform="rotate(120 50 50)"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Electron 1 */}
      <motion.circle
        cx="90"
        cy="50"
        r="5"
        fill="#ff6b00"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Electron 2 */}
      <motion.circle
        cx="90"
        cy="50"
        r="5"
        fill="#ff9500"
        initial={{ rotate: 60 }}
        animate={{ rotate: -300 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Electron 3 */}
      <motion.circle
        cx="90"
        cy="50"
        r="5"
        fill="#ffb347"
        initial={{ rotate: 120 }}
        animate={{ rotate: 480 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="nucleoidGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9500" />
          <stop offset="100%" stopColor="#ff6b00" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
}
