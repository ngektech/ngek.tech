import Link from "next/link";
import { ArrowLeft, Shield, Eye, Database, Lock, UserCheck, Globe, Bell, Mail, Server, Cookie, FileText } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Privacy Policy | NGEK TECH",
  description: "Privacy Policy for NGEK TECH. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
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
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Privacy Policy</h1>
            <p className="text-[#666]">Last Updated: December 18, 2025.</p>
          </div>

          {/* Privacy Content */}
          <div className="prose prose-lg max-w-none space-y-8">

            {/* Introduction */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Eye size={24} className="text-[#ff6b00]" />
                1. Introduction.
              </h2>
              <p className="text-[#333] leading-relaxed mb-4">
                NGEK© (hereinafter referred to as &quot;NGEK TECH&quot;, &quot;NGEK©&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), owned and operated by Aditya Patange™, is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ngek.tech and use our services.
              </p>
              <p className="text-[#333] leading-relaxed mb-4">
                By accessing our website or using our services, you consent to the data practices described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the website or use our services.
              </p>
              <p className="text-[#333] leading-relaxed">
                This Privacy Policy complies with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian laws and regulations.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Database size={24} className="text-[#ff6b00]" />
                2. Information We Collect.
              </h2>
              <div className="space-y-6 text-[#333]">
                <div>
                  <h3 className="text-xl font-semibold mb-3">2.1. Personal Information.</h3>
                  <p className="leading-relaxed mb-3">We may collect personally identifiable information that you voluntarily provide to us, including but not limited to:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Full name and title.</li>
                    <li>• Email address.</li>
                    <li>• Phone number.</li>
                    <li>• Business name and address.</li>
                    <li>• Website URL (if applicable).</li>
                    <li>• Payment information (processed securely through third-party providers).</li>
                    <li>• Any other information you choose to provide in communications with us.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">2.2. Automatically Collected Information.</h3>
                  <p className="leading-relaxed mb-3">When you visit our website, we automatically collect certain information about your device and usage, including:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• IP address and geographic location.</li>
                    <li>• Browser type and version.</li>
                    <li>• Operating system.</li>
                    <li>• Device type and screen resolution.</li>
                    <li>• Pages visited and time spent on each page.</li>
                    <li>• Referring website or source.</li>
                    <li>• Date and time of access.</li>
                    <li>• Click patterns and navigation behavior.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">2.3. Information from Third Parties.</h3>
                  <p className="leading-relaxed">We may receive information about you from third-party sources, including social media platforms, business partners, and publicly available sources. This information may be combined with other information we collect about you.</p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <UserCheck size={24} className="text-[#ff6b00]" />
                3. How We Use Your Information.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">We use the information we collect for various purposes, including:</p>
                <ul className="space-y-2">
                  <li>3.1. To provide, maintain, and improve our services.</li>
                  <li>3.2. To process transactions and send related information, including confirmations and invoices.</li>
                  <li>3.3. To communicate with you about projects, updates, and promotional offers.</li>
                  <li>3.4. To respond to your inquiries and provide customer support.</li>
                  <li>3.5. To monitor and analyze usage patterns and trends.</li>
                  <li>3.6. To detect, prevent, and address technical issues and security threats.</li>
                  <li>3.7. To comply with legal obligations and enforce our terms of service.</li>
                  <li>3.8. To personalize your experience on our website.</li>
                  <li>3.9. To send periodic newsletters and marketing communications (with your consent).</li>
                  <li>3.10. To generate anonymized, aggregated statistics about website usage.</li>
                </ul>
              </div>
            </section>

            {/* Google Analytics */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Globe size={24} className="text-[#ff6b00]" />
                4. Google Analytics and IP Tracking.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>4.1.</strong> We use Google Analytics to collect and analyze information about how visitors use our website. Google Analytics collects information such as how often users visit the site, what pages they visit, and what other sites they used prior to visiting.
                </p>
                <p className="leading-relaxed">
                  <strong>4.2.</strong> Google Analytics collects the IP address assigned to you on the date you visit our website. This information is used to analyze geographic distribution of visitors and website performance.
                </p>
                <p className="leading-relaxed">
                  <strong>4.3.</strong> We do not combine the information collected through Google Analytics with personally identifiable information unless you explicitly provide such information through our contact forms.
                </p>
                <p className="leading-relaxed">
                  <strong>4.4.</strong> You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on available at: tools.google.com/dlpage/gaoptout.
                </p>
                <p className="leading-relaxed">
                  <strong>4.5.</strong> For more information on Google&apos;s privacy practices, please visit: policies.google.com/privacy.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Cookie size={24} className="text-[#ff6b00]" />
                5. Cookies and Tracking Technologies.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>5.1.</strong> We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small data files stored on your device.
                </p>
                <p className="leading-relaxed">
                  <strong>5.2. Types of Cookies We Use:</strong>
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Essential Cookies:</strong> Required for basic website functionality.</li>
                  <li>• <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                  <li>• <strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
                  <li>• <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>5.3.</strong> You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Lock size={24} className="text-[#ff6b00]" />
                6. Data Security.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>6.1.</strong> We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="leading-relaxed">
                  <strong>6.2. Security Measures Include:</strong>
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• SSL/TLS encryption for data transmission.</li>
                  <li>• Secure password hashing and storage.</li>
                  <li>• Regular security audits and vulnerability assessments.</li>
                  <li>• Access controls and authentication mechanisms.</li>
                  <li>• Firewall protection and intrusion detection systems.</li>
                  <li>• Regular data backups and disaster recovery procedures.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>6.3.</strong> While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
                <p className="leading-relaxed">
                  <strong>6.4.</strong> We comply with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 of India.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Server size={24} className="text-[#ff6b00]" />
                7. Data Retention.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>7.1.</strong> We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
                <p className="leading-relaxed">
                  <strong>7.2. Retention Periods:</strong>
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Client project files: Retained for 7 years after project completion.</li>
                  <li>• Financial records: Retained for 8 years as per Indian tax laws.</li>
                  <li>• Contact form submissions: Retained for 3 years.</li>
                  <li>• Analytics data: Retained for 26 months.</li>
                  <li>• Marketing communications consent: Retained until withdrawal of consent.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>7.3.</strong> Upon expiration of the retention period, personal data will be securely deleted or anonymized.
                </p>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">8. Data Sharing and Disclosure.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>8.1.</strong> We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                </p>
                <p className="leading-relaxed">
                  <strong>8.2.</strong> We may share your information in the following circumstances:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Service Providers:</strong> With third-party vendors who assist in website hosting, payment processing, and analytics.</li>
                  <li>• <strong>Legal Requirements:</strong> When required by law, court order, or government request.</li>
                  <li>• <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                  <li>• <strong>Protection of Rights:</strong> To protect the rights, property, or safety of NGEK©, our clients, or others.</li>
                  <li>• <strong>With Consent:</strong> When you have given explicit consent for a specific purpose.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>8.3.</strong> All third-party service providers are contractually obligated to protect your information and use it only for the specified purposes.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <UserCheck size={24} className="text-[#ff6b00]" />
                9. Your Rights.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">Under applicable data protection laws, you have the following rights:</p>
                <ul className="space-y-2">
                  <li><strong>9.1. Right to Access:</strong> Request a copy of your personal data we hold.</li>
                  <li><strong>9.2. Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                  <li><strong>9.3. Right to Erasure:</strong> Request deletion of your personal data (subject to legal retention requirements).</li>
                  <li><strong>9.4. Right to Restriction:</strong> Request limitation of processing in certain circumstances.</li>
                  <li><strong>9.5. Right to Data Portability:</strong> Request transfer of your data in a machine-readable format.</li>
                  <li><strong>9.6. Right to Object:</strong> Object to processing of your personal data for marketing purposes.</li>
                  <li><strong>9.7. Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
                </ul>
                <p className="leading-relaxed">
                  To exercise any of these rights, please contact us at contact.adityapatange@gmail.com. We will respond to your request within 30 days.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">10. Children&apos;s Privacy.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>10.1.</strong> Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18.
                </p>
                <p className="leading-relaxed">
                  <strong>10.2.</strong> If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.
                </p>
                <p className="leading-relaxed">
                  <strong>10.3.</strong> If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </div>
            </section>

            {/* International Transfers */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">11. International Data Transfers.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>11.1.</strong> Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ.
                </p>
                <p className="leading-relaxed">
                  <strong>11.2.</strong> If you are located outside India and choose to provide information to us, please note that we transfer the data to India and process it there.
                </p>
                <p className="leading-relaxed">
                  <strong>11.3.</strong> We ensure that appropriate safeguards are in place for any international data transfers.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Bell size={24} className="text-[#ff6b00]" />
                12. Changes to This Privacy Policy.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>12.1.</strong> We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                </p>
                <p className="leading-relaxed">
                  <strong>12.2.</strong> Material changes will be communicated via email or through a prominent notice on our website.
                </p>
                <p className="leading-relaxed">
                  <strong>12.3.</strong> You are advised to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-[#ff6b00] to-[#ff9500] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail size={24} />
                13. Contact Us.
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-white/20 rounded-xl p-6 space-y-3">
                  <p><strong>Data Controller:</strong> NGEK© (NGEK TECH)</p>
                  <p><strong>Owner:</strong> Aditya Patange™</p>
                  <p><strong>Email:</strong> contact.adityapatange@gmail.com</p>
                  <p><strong>Website:</strong> ngek.tech</p>
                </div>
                <p className="leading-relaxed mt-4">
                  For data protection inquiries or to exercise your rights, please email us with the subject line &quot;Privacy Request&quot; and we will respond within 30 days.
                </p>
              </div>
            </section>

            {/* Grievance Officer */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <FileText size={24} className="text-[#ff6b00]" />
                14. Grievance Officer (India).
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  In accordance with the Information Technology Act, 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
                </p>
                <div className="bg-white rounded-xl p-6 border-2 border-[#e5e5e5] space-y-2">
                  <p><strong>Grievance Officer:</strong> Aditya Patange™</p>
                  <p><strong>Email:</strong> contact.adityapatange@gmail.com</p>
                  <p><strong>Response Time:</strong> Within 30 days of receiving the complaint.</p>
                </div>
              </div>
            </section>

            {/* Footer Notice */}
            <section className="text-center text-[#666] mt-12">
              <p className="mb-2">© {new Date().getFullYear()} NGEK© (NGEK TECH). All Rights Reserved.</p>
              <p className="mb-2">Aditya Patange™ is a registered trademark.</p>
              <p>This Privacy Policy is effective as of December 18, 2025.</p>
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
              href="/terms"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#ff6b00] text-[#ff6b00] rounded-full font-medium hover:bg-[#fff5eb] transition-colors"
            >
              Terms and Conditions
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
