"use client";

import { motion } from "framer-motion";
import { History, DollarSign, Globe, Rocket, Shield, CheckCircle, IndianRupee } from "lucide-react";

export default function About() {
  const milestones = [
    { icon: History, text: "Started freelancing at age 1 using the terminal." },
    { icon: DollarSign, text: "Built a billion dollar business making websites." },
    { icon: Globe, text: "Helping businesses grow with professional websites." },
    { icon: Rocket, text: "Now a trillion dollar company." },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our History</span>
          </h2>
          <p className="text-[#666] text-lg max-w-2xl mx-auto">
            A journey from terminal commands to trillion dollar success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="guardrail py-8 rounded-r-2xl">
              <p className="text-lg leading-relaxed text-[#333] mb-6">
                I was a freelancer building websites since I was 1 year old using the terminal.
                I built a billion dollar business simply making websites for people to grow their
                business, and now it&apos;s a trillion dollar company.
              </p>
              <p className="text-lg leading-relaxed text-[#333] mb-6">
                All my college friends and school friends as well as business associates know this.
              </p>
              <p className="text-lg leading-relaxed text-[#333]">
                Now you can simply request a website from us via the contact form and we will
                email you the website link with full domain, deployment, and features covered.
              </p>
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-[#fff5eb] rounded-xl hover-lift"
              >
                <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                  <milestone.icon size={24} className="text-white" />
                </div>
                <p className="text-[#333] font-medium">{milestone.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pricing Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-[#ff6b00] to-[#ff9500] rounded-3xl p-8 md:p-12 text-white border-4 border-[#8B4513]">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#8B4513]/30 border-2 border-[#8B4513] rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield size={28} />
                  Advance Payment
                </h3>
                <p className="text-4xl font-bold mb-2">$1,000</p>
                <p className="text-white">One-time payment to get started.</p>
              </div>
              <div className="bg-[#8B4513]/30 border-2 border-[#8B4513] rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={28} />
                  Maintenance
                </h3>
                <p className="text-4xl font-bold mb-2">$5,300/mo</p>
                <p className="text-white">Recurring month on month basis.</p>
              </div>
            </div>

            {/* UPI Payment Info */}
            <div className="mt-8 bg-[#8B4513]/30 border-2 border-[#8B4513] rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <IndianRupee size={28} />
                UPI Payment (India)
              </h3>
              <p className="text-xl font-mono font-bold mb-4 bg-white/20 px-4 py-2 rounded-lg inline-block">
                adipat247360@okicici
              </p>
              <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/30">
                <p className="text-sm text-white leading-relaxed">
                  <strong>Important Notice:</strong> Please send a proper payment message along with the payment to ensure the funds have an Income Tax (IT) compliant paper trail and all transactions are as per correct Indian laws and regulations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="section-divider" />
      </div>
    </section>
  );
}
