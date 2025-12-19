"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VacuumDemo from "@/components/VacuumDemo";
import About from "@/components/About";
import Team from "@/components/Team";
import Blog from "@/components/Blog";
import Compliance from "@/components/Compliance";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import RayTracer from "@/components/RayTracer";

export default function Home() {
  return (
    <>
      {/* Neon Green Ray Tracer Cursor Effect */}
      <RayTracer />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Vacuum Cleaner Demo */}
        <VacuumDemo />

        {/* About / History Section */}
        <About />

        {/* Team Section */}
        <Team />

        {/* Blog Section */}
        <Blog />

        {/* Compliance & Regulatory Section */}
        <Compliance />

        {/* Contact Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* NGEK Talker Chatbot */}
      <Chatbot />
    </>
  );
}
