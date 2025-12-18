"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Code, Timer, Heart, Atom } from "lucide-react";

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
];

export default function Blog() {
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

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#fff5eb] rounded-2xl overflow-hidden hover-lift group"
            >
              <div className="p-8">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-white text-[#ff6b00] text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#767676] text-sm">
                    <Clock size={14} />
                    {post.readTime}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-4">
                  <post.icon size={28} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#ff6b00] transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#666] mb-6 line-clamp-2">{post.excerpt}</p>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#ff6b00] font-medium group/link"
                >
                  <BookOpen size={18} />
                  Read Article.
                  <ArrowRight
                    size={16}
                    className="transform group-hover/link:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="section-divider" />
      </div>
    </section>
  );
}
