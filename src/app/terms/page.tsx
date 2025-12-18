import Link from "next/link";
import { ArrowLeft, FileText, Scale, Shield, AlertTriangle, CreditCard, Globe, Mail } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Terms and Conditions | NGEK TECH",
  description: "Terms and Conditions for NGEK TECH services. Read our comprehensive terms of service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Logo size={32} />
              <span className="text-lg font-bold gradient-text">NGEK TECH</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-[#666] hover:text-[#ff6b00] transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Terms and Conditions</h1>
            <p className="text-[#666]">Last Updated: December 18, 2025.</p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg max-w-none space-y-8">

            {/* Introduction */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Scale size={24} className="text-[#ff6b00]" />
                1. Introduction.
              </h2>
              <p className="text-[#333] leading-relaxed mb-4">
                Welcome to NGEK© (hereinafter referred to as &quot;NGEK TECH&quot;, &quot;NGEK©&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your use of our website located at ngek.tech and all related services, products, and offerings provided by Aditya Patange™ and NGEK©.
              </p>
              <p className="text-[#333] leading-relaxed mb-4">
                By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>
              <p className="text-[#333] leading-relaxed">
                NGEK© is a registered trademark and all intellectual property rights are reserved by Aditya Patange™.
              </p>
            </section>

            {/* Definitions */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">2. Definitions.</h2>
              <ul className="space-y-3 text-[#333]">
                <li><strong>&quot;Client&quot;</strong> refers to any individual, company, or entity that engages NGEK© for website development services.</li>
                <li><strong>&quot;Services&quot;</strong> refers to all website development, design, deployment, hosting, maintenance, and related services offered by NGEK©.</li>
                <li><strong>&quot;Deliverables&quot;</strong> refers to all websites, code, designs, documentation, and materials created by NGEK© for the Client.</li>
                <li><strong>&quot;Advance Payment&quot;</strong> refers to the initial payment of $1,000 USD (or equivalent in INR) required to commence work.</li>
                <li><strong>&quot;Maintenance Fee&quot;</strong> refers to the recurring monthly fee of $5,300 USD (or equivalent in INR) for ongoing services.</li>
                <li><strong>&quot;Aditya Patange™&quot;</strong> refers to the sole proprietor and founder of NGEK©.</li>
              </ul>
            </section>

            {/* Services */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Globe size={24} className="text-[#ff6b00]" />
                3. Services Offered.
              </h2>
              <p className="text-[#333] leading-relaxed mb-4">
                NGEK© provides the following services:
              </p>
              <ul className="space-y-2 text-[#333] mb-4">
                <li>3.1. Custom AI-powered website development and design.</li>
                <li>3.2. Domain registration and configuration.</li>
                <li>3.3. Website deployment and hosting setup.</li>
                <li>3.4. Ongoing website maintenance and support.</li>
                <li>3.5. Performance optimization and security updates.</li>
                <li>3.6. Content management system integration.</li>
                <li>3.7. Search engine optimization (SEO) implementation.</li>
                <li>3.8. Analytics and tracking setup.</li>
              </ul>
              <p className="text-[#333] leading-relaxed">
                All services are provided by Aditya Patange™ and the NGEK© team, including EK (Chief Wisdom Officer) and NA (Chief Energy Officer).
              </p>
            </section>

            {/* Payment Terms */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <CreditCard size={24} className="text-[#ff6b00]" />
                4. Payment Terms.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>4.1. Advance Payment:</strong> A non-refundable advance payment of $1,000 USD (or equivalent in Indian Rupees at the prevailing exchange rate) is required before any work commences. This payment secures your project slot and initiates the development process.
                </p>
                <p className="leading-relaxed">
                  <strong>4.2. Maintenance Fee:</strong> A recurring maintenance fee of $5,300 USD per month (or equivalent in Indian Rupees) is charged on a month-to-month basis. This fee covers hosting, updates, security patches, and ongoing support.
                </p>
                <p className="leading-relaxed">
                  <strong>4.3. UPI Payments (India):</strong> For payments via UPI, please use the following UPI ID: <span className="font-mono bg-[#fff5eb] px-2 py-1 rounded">adipat247360@okicici</span>.
                </p>
                <div className="bg-[#ff6b00]/10 border-l-4 border-[#ff6b00] p-4 rounded-r-lg">
                  <p className="leading-relaxed">
                    <strong>4.4. Important Tax Compliance Notice:</strong> Please send a proper payment message along with the payment to ensure the funds have an Income Tax (IT) compliant paper trail and all transactions are as per correct Indian laws and regulations. NGEK© maintains full compliance with Indian taxation laws including GST, Income Tax Act, and FEMA regulations.
                  </p>
                </div>
                <p className="leading-relaxed">
                  <strong>4.5. Invoice Generation:</strong> Proper tax invoices will be generated for all payments received. Clients are responsible for any applicable taxes in their jurisdiction.
                </p>
                <p className="leading-relaxed">
                  <strong>4.6. Late Payments:</strong> Late payments may result in suspension of services. A grace period of 7 days is provided after the due date, following which services may be suspended until payment is received.
                </p>
                <p className="leading-relaxed">
                  <strong>4.7. Refund Policy:</strong> The advance payment is non-refundable once work has commenced. Maintenance fees are non-refundable for the month in which they are paid. Partial month refunds are not provided.
                </p>
              </div>
            </section>

            {/* Client Responsibilities */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">5. Client Responsibilities.</h2>
              <div className="space-y-3 text-[#333]">
                <p>5.1. Provide accurate and complete information required for website development.</p>
                <p>5.2. Respond to communications within a reasonable timeframe (48-72 hours).</p>
                <p>5.3. Provide all necessary content, images, logos, and branding materials.</p>
                <p>5.4. Review and approve deliverables within the agreed timeframe.</p>
                <p>5.5. Ensure all provided content does not infringe on third-party intellectual property rights.</p>
                <p>5.6. Maintain confidentiality of access credentials provided by NGEK©.</p>
                <p>5.7. Make timely payments as per the agreed schedule.</p>
                <p>5.8. Comply with all applicable laws and regulations in their jurisdiction.</p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Shield size={24} className="text-[#ff6b00]" />
                6. Intellectual Property Rights.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>6.1.</strong> NGEK© and Aditya Patange™ retain all intellectual property rights to proprietary code, frameworks, templates, and methodologies used in the development process.
                </p>
                <p className="leading-relaxed">
                  <strong>6.2.</strong> Upon full payment of all outstanding fees, the Client receives a non-exclusive, perpetual license to use the custom website developed specifically for them.
                </p>
                <p className="leading-relaxed">
                  <strong>6.3.</strong> The NGEK© name, logo, and all associated trademarks are the exclusive property of Aditya Patange™ and may not be used without written permission.
                </p>
                <p className="leading-relaxed">
                  <strong>6.4.</strong> NGEK© reserves the right to showcase completed projects in portfolios and marketing materials unless otherwise agreed in writing.
                </p>
                <p className="leading-relaxed">
                  <strong>6.5.</strong> Third-party components, libraries, and assets used in development are subject to their respective licenses.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <AlertTriangle size={24} className="text-[#ff6b00]" />
                7. Limitation of Liability.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>7.1.</strong> NGEK©, Aditya Patange™, and all associated team members shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services.
                </p>
                <p className="leading-relaxed">
                  <strong>7.2.</strong> Our total liability for any claim arising from these Terms shall not exceed the total amount paid by the Client in the six (6) months preceding the claim.
                </p>
                <p className="leading-relaxed">
                  <strong>7.3.</strong> NGEK© is not responsible for any losses resulting from downtime caused by third-party hosting providers, domain registrars, or other external services.
                </p>
                <p className="leading-relaxed">
                  <strong>7.4.</strong> We do not guarantee specific business results, traffic levels, or revenue increases from the websites we develop.
                </p>
                <p className="leading-relaxed">
                  <strong>7.5.</strong> Clients are responsible for backing up their own data and content. While NGEK© maintains backups as part of maintenance services, we are not liable for data loss.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">8. Termination.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>8.1.</strong> Either party may terminate the maintenance agreement with 30 days written notice.
                </p>
                <p className="leading-relaxed">
                  <strong>8.2.</strong> NGEK© reserves the right to terminate services immediately if the Client breaches these Terms, engages in illegal activities, or fails to make payments.
                </p>
                <p className="leading-relaxed">
                  <strong>8.3.</strong> Upon termination, the Client will receive all files, databases, and access credentials for their website within 14 business days.
                </p>
                <p className="leading-relaxed">
                  <strong>8.4.</strong> Outstanding payments remain due even after termination.
                </p>
                <p className="leading-relaxed">
                  <strong>8.5.</strong> NGEK© may remove the website from its servers 30 days after termination if the Client has not migrated to alternative hosting.
                </p>
              </div>
            </section>

            {/* Confidentiality */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">9. Confidentiality.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>9.1.</strong> Both parties agree to maintain confidentiality of all proprietary information shared during the course of the engagement.
                </p>
                <p className="leading-relaxed">
                  <strong>9.2.</strong> Confidential information includes but is not limited to: business strategies, financial information, customer data, technical specifications, and proprietary methodologies.
                </p>
                <p className="leading-relaxed">
                  <strong>9.3.</strong> This confidentiality obligation survives termination of the agreement for a period of two (2) years.
                </p>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">10. Dispute Resolution.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>10.1.</strong> Any disputes arising from these Terms shall first be attempted to be resolved through good-faith negotiations.
                </p>
                <p className="leading-relaxed">
                  <strong>10.2.</strong> If negotiations fail, disputes shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India.
                </p>
                <p className="leading-relaxed">
                  <strong>10.3.</strong> The seat of arbitration shall be Pune, Maharashtra, India.
                </p>
                <p className="leading-relaxed">
                  <strong>10.4.</strong> These Terms are governed by the laws of India, and the courts of Pune, Maharashtra shall have exclusive jurisdiction.
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">11. Modifications to Terms.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>11.1.</strong> NGEK© reserves the right to modify these Terms at any time. Changes will be effective upon posting on this website.
                </p>
                <p className="leading-relaxed">
                  <strong>11.2.</strong> Continued use of our services after any modifications constitutes acceptance of the updated Terms.
                </p>
                <p className="leading-relaxed">
                  <strong>11.3.</strong> Material changes will be communicated to active Clients via email at least 14 days before taking effect.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-[#ff6b00] to-[#ff9500] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail size={24} />
                12. Contact Information.
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  For any questions regarding these Terms and Conditions, please contact us:
                </p>
                <div className="bg-white/20 rounded-xl p-6 space-y-3">
                  <p><strong>Company:</strong> NGEK© (NGEK TECH)</p>
                  <p><strong>Founder:</strong> Aditya Patange™</p>
                  <p><strong>Email:</strong> contact.adityapatange@gmail.com</p>
                  <p><strong>Website:</strong> ngek.tech</p>
                  <p><strong>UPI ID:</strong> adipat247360@okicici</p>
                </div>
              </div>
            </section>

            {/* Footer Notice */}
            <section className="text-center text-[#666] mt-12">
              <p className="mb-2">© {new Date().getFullYear()} NGEK© (NGEK TECH). All Rights Reserved.</p>
              <p className="mb-2">Aditya Patange™ is a registered trademark.</p>
              <p>These Terms and Conditions are effective as of December 18, 2025.</p>
            </section>

          </div>

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-[#e5e5e5] flex justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-full font-medium hover:shadow-lg transition-shadow"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ff6b00] text-[#ff6b00] rounded-full font-medium hover:bg-[#fff5eb] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#767676]">
            © {new Date().getFullYear()} NGEK© (NGEK TECH). Aditya Patange™. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
