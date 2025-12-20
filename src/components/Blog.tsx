"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Code, Timer, Heart, Atom, Wifi, Layers, Music, Terminal, Brain, Blocks, Sparkles, Globe, VolumeX, Zap } from "lucide-react";

const blogPosts = [
  {
    slug: "big-o-notation-for-websites",
    title: "Big O Notation for Websites.",
    excerpt: "Understanding algorithmic complexity in web development and how it affects your website performance.",
    icon: Code,
    readTime: "8 min read.",
    category: "Performance.",
  },
  {
    slug: "tso-time-space-organization",
    title: "TSO (Time Space Organization) Of Web Applications.",
    excerpt: "A comprehensive guide to organizing time and space complexity in modern web applications.",
    icon: Timer,
    readTime: "12 min read.",
    category: "Architecture.",
  },
  {
    slug: "how-does-yoga-work-on-web-apps",
    title: "How Does Yoga Work on Web Apps.",
    excerpt: "Exploring the spiritual and mindful approach to building sustainable web applications.",
    icon: Heart,
    readTime: "6 min read.",
    category: "Philosophy.",
  },
  {
    slug: "quantum-science-behind-nextjs",
    title: "The Quantum Science Behind NextJS.",
    excerpt: "Diving deep into the quantum mechanics principles that power Next.js and modern React frameworks.",
    icon: Atom,
    readTime: "15 min read.",
    category: "Framework.",
  },
  {
    slug: "data-analytics-on-jio-wifi-by-nikola-frequency",
    title: "Data Analytics on Jio WiFi by Nikola Frequency.",
    excerpt: "Exploring electromagnetic frequency principles that power Jio's WiFi network through Tesla's theories.",
    icon: Wifi,
    readTime: "10 min read.",
    category: "Analytics.",
  },
  {
    slug: "nikola-tonic-in-reactjs",
    title: "Nikola Tonic in ReactJS.",
    excerpt: "Applying Tesla's tonic frequencies to ReactJS component architecture for harmonically balanced UIs.",
    icon: Layers,
    readTime: "12 min read.",
    category: "React.",
  },
  {
    slug: "nikola-sonic-using-cpp",
    title: "Nikola Sonic using C++.",
    excerpt: "Implementing Tesla's sonic frequency theories in C++ for high-performance audio processing.",
    icon: Music,
    readTime: "14 min read.",
    category: "C++.",
  },
  {
    slug: "the-truth-of-c-language-by-aditya-patange",
    title: "The Truth Of C Language.",
    excerpt: "A deep exploration into the fundamental truths of the C programming language by Aditya Patange.",
    icon: Terminal,
    readTime: "18 min read.",
    category: "C Language.",
  },
  {
    slug: "data-mining-business-intelligence-friston-signals",
    title: "Data Mining & BI from a Lens of Friston Signals.",
    excerpt: "Exploring the intersection of Karl Friston's Free Energy Principle and modern data analytics for predictive business intelligence.",
    icon: Brain,
    readTime: "14 min read.",
    category: "Data Science.",
  },
  {
    slug: "solid-principles-ydni-you-do-need-it",
    title: "SOLID Principles and YDNI (You Do Need It).",
    excerpt: "A counterpoint to YAGNI: Understanding when you actually do need abstraction, planning, and proper architecture.",
    icon: Blocks,
    readTime: "16 min read.",
    category: "Architecture.",
  },
  {
    slug: "divine-programming-system-dps",
    title: "Divine Programming System (DPS).",
    excerpt: "A transcendent approach to software architecture that aligns code with universal principles of creation and harmony.",
    icon: Sparkles,
    readTime: "18 min read.",
    category: "Philosophy.",
  },
  {
    slug: "ebxo-energy-bits-xi-openers-polyglot-programmers",
    title: "EBXO: How Polyglot Programmers Work.",
    excerpt: "Understanding how polyglot programmers harness the power of multiple languages through the EBXO framework.",
    icon: Globe,
    readTime: "15 min read.",
    category: "Career.",
  },
  {
    slug: "the-build-of-silence-python-version",
    title: "The Build Of Silence (Python Version).",
    excerpt: "Where code meets consciousness—silent computation and the elegance of minimal expression in Python.",
    icon: VolumeX,
    readTime: "16 min read.",
    category: "Philosophy.",
  },
  {
    slug: "knowledge-generator-kg-programming-freestyles",
    title: "Knowledge Generator (KG) as Programming Freestyles.",
    excerpt: "The art of spontaneous code composition—algorithmic intuition meets creative flow in real-time knowledge synthesis.",
    icon: Zap,
    readTime: "18 min read.",
    category: "Creativity.",
  },
];

const INITIAL_DISPLAY_COUNT = 8;

export default function Blog() {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? blogPosts : blogPosts.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMorePosts = blogPosts.length > INITIAL_DISPLAY_COUNT;

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Tech Blog</span>
          </h2>
          <p className="text-[#666] text-lg max-w-2xl mx-auto">
            Insights and knowledge from our engineering team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#fff5eb] rounded-2xl overflow-hidden hover-lift group"
            >
              <div className="p-5 lg:p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-white text-[#ff6b00] text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#767676] text-xs">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-3">
                  <post.icon size={24} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-base lg:text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#ff6b00] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#666] text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-[#ff6b00] text-sm font-medium group/link"
                >
                  <BookOpen size={14} />
                  Read.
                  <ArrowRight
                    size={14}
                    className="transform group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* See More Button */}
        {hasMorePosts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b00] to-[#ff8533] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#ff6b00]/25 transition-all duration-300 group"
            >
              {showAll ? (
                <>
                  Show Less
                  <ArrowRight size={18} className="transform rotate-[-90deg] group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  See More
                  <ArrowRight size={18} className="transform rotate-90 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}

        <div className="section-divider" />
      </div>
    </section>
  );
}
