"use client";

import { motion } from "framer-motion";
import { User, Crown, Heart } from "lucide-react";

const teamMembers = [
  {
    name: "Aditya Patange",
    role: "Solo Founder & CEO.",
    description: "Visionary entrepreneur who started coding at age 1. Built a trillion dollar empire from scratch.",
    icon: Crown,
    isFounder: true,
  },
  {
    name: "EK",
    role: "Chief Wisdom Officer.",
    description: "A real snake with mystical insights. You just don't see them in human form here.",
    icon: User,
    isSnake: true,
  },
  {
    name: "NA",
    role: "Chief Energy Officer.",
    description: "A real snake bringing powerful energy. You just don't see them in human form here.",
    icon: User,
    isSnake: true,
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-[#fff5eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Meet Our Team</span>
          </h2>
          <p className="text-[#666] text-lg max-w-2xl mx-auto">
            A unique trio leading NGEK TECH to unprecedented heights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg hover-lift text-center"
            >
              {/* Avatar */}
              <motion.div
                className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  member.isFounder
                    ? "gradient-bg"
                    : "bg-gradient-to-br from-[#ff9500] to-[#ffb347]"
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <member.icon size={40} className="text-white" />
              </motion.div>

              {/* Name */}
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 flex items-center justify-center gap-2">
                {member.name}
                {member.isFounder && (
                  <Crown size={18} className="text-[#ff6b00]" />
                )}
                {member.isSnake && (
                  <Heart size={18} className="text-[#ff6b00]" />
                )}
              </h3>

              {/* Role */}
              <p className="text-[#ff6b00] font-semibold mb-4">{member.role}</p>

              {/* Description */}
              <div className="guardrail text-left rounded-r-lg">
                <p className="text-[#666] text-sm">{member.description}</p>
              </div>

              {/* Snake indicator */}
              {member.isSnake && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-xs text-[#767676] italic"
                >
                  The snakes are real. You just don&apos;t see them in human form here.
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="section-divider" />
      </div>
    </section>
  );
}
