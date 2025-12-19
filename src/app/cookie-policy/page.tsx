import Link from "next/link";
import { ArrowLeft, Cookie, Shield, Settings, BarChart3, Target, Globe, Clock, Trash2, Mail, FileText } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Cookie Policy | NGEK TECH",
  description: "Cookie Policy for NGEK TECH. Learn how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
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
              <Cookie size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Cookie Policy.</h1>
            <p className="text-[#666]">Last Updated: December 19, 2025.</p>
          </div>

          {/* Cookie Policy Content */}
          <div className="prose prose-lg max-w-none space-y-8">

            {/* Introduction */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Cookie size={24} className="text-[#ff6b00]" />
                1. Introduction.
              </h2>
              <p className="text-[#333] leading-relaxed mb-4">
                NGEK© (hereinafter referred to as &quot;NGEK TECH&quot;, &quot;NGEK©&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), owned and operated by Aditya Patange™, uses cookies and similar tracking technologies on our website ngek.tech. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
              </p>
              <p className="text-[#333] leading-relaxed mb-4">
                By continuing to use our website, you consent to our use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, you should adjust your browser settings accordingly or refrain from using our website.
              </p>
              <p className="text-[#333] leading-relaxed">
                This Cookie Policy should be read together with our Privacy Policy, which provides additional information about how we collect and process your personal data.
              </p>
            </section>

            {/* What Are Cookies */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <FileText size={24} className="text-[#ff6b00]" />
                2. What Are Cookies.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>2.1.</strong> Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
                <p className="leading-relaxed">
                  <strong>2.2.</strong> Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Persistent Cookies.</strong> These remain on your device for a set period or until you delete them. They are activated each time you visit the website that created the cookie.</li>
                  <li>• <strong>Session Cookies.</strong> These are temporary and are deleted when you close your browser. They allow websites to link your actions during a browser session.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>2.3.</strong> Cookies can also be classified as:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>First-Party Cookies.</strong> Set by the website you are visiting.</li>
                  <li>• <strong>Third-Party Cookies.</strong> Set by a domain other than the one you are visiting, such as analytics or advertising services.</li>
                </ul>
              </div>
            </section>

            {/* Types of Cookies We Use */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Settings size={24} className="text-[#ff6b00]" />
                3. Types of Cookies We Use.
              </h2>
              <div className="space-y-6 text-[#333]">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Shield size={20} className="text-[#ff6b00]" />
                    3.1. Strictly Necessary Cookies.
                  </h3>
                  <p className="leading-relaxed mb-2">These cookies are essential for the website to function properly. They enable basic functions like page navigation, secure areas access, and CSRF protection.</p>
                  <div className="bg-white rounded-lg p-4 border border-[#e5e5e5]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Cookie Name</th>
                          <th className="text-left py-2">Purpose</th>
                          <th className="text-left py-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-mono">csrf_token</td>
                          <td className="py-2">Security - prevents cross-site request forgery.</td>
                          <td className="py-2">1 hour</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono">cookie_consent</td>
                          <td className="py-2">Stores your cookie preferences.</td>
                          <td className="py-2">1 year</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono">session_id</td>
                          <td className="py-2">Maintains session state.</td>
                          <td className="py-2">Session</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 size={20} className="text-[#ff6b00]" />
                    3.2. Analytics Cookies.
                  </h3>
                  <p className="leading-relaxed mb-2">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                  <div className="bg-white rounded-lg p-4 border border-[#e5e5e5]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Cookie Name</th>
                          <th className="text-left py-2">Purpose</th>
                          <th className="text-left py-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-mono">_ga</td>
                          <td className="py-2">Google Analytics - distinguishes users.</td>
                          <td className="py-2">2 years</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-mono">_ga_*</td>
                          <td className="py-2">Google Analytics 4 - maintains session state.</td>
                          <td className="py-2">2 years</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono">_gid</td>
                          <td className="py-2">Google Analytics - distinguishes users.</td>
                          <td className="py-2">24 hours</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Settings size={20} className="text-[#ff6b00]" />
                    3.3. Functional Cookies.
                  </h3>
                  <p className="leading-relaxed mb-2">These cookies enable enhanced functionality and personalization, such as remembering your preferences.</p>
                  <div className="bg-white rounded-lg p-4 border border-[#e5e5e5]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Cookie Name</th>
                          <th className="text-left py-2">Purpose</th>
                          <th className="text-left py-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-mono">theme_preference</td>
                          <td className="py-2">Stores your display theme preference.</td>
                          <td className="py-2">1 year</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono">language</td>
                          <td className="py-2">Stores your language preference.</td>
                          <td className="py-2">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Target size={20} className="text-[#ff6b00]" />
                    3.4. Marketing Cookies.
                  </h3>
                  <p className="leading-relaxed mb-2">These cookies are used to track visitors across websites to display relevant advertisements. We currently do not use marketing cookies, but this may change in the future with prior notice.</p>
                </div>
              </div>
            </section>

            {/* How We Use Cookies */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">4. How We Use Cookies.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>4.1.</strong> We use cookies for the following purposes:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Authentication and Security.</strong> To verify your identity and protect against fraudulent activity.</li>
                  <li>• <strong>Preferences.</strong> To remember your settings and preferences.</li>
                  <li>• <strong>Analytics.</strong> To understand how visitors use our website and improve our services.</li>
                  <li>• <strong>Performance.</strong> To ensure the website functions correctly and loads efficiently.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>4.2.</strong> We store your cookie consent preferences in our database to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Maintain a record of consent for compliance purposes.</li>
                  <li>• Apply your preferences consistently across sessions.</li>
                  <li>• Respond to data subject access requests.</li>
                </ul>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Globe size={24} className="text-[#ff6b00]" />
                5. Third-Party Cookies.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>5.1.</strong> Some cookies on our website are placed by third-party services. We use the following third-party services:
                </p>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-[#e5e5e5]">
                    <h4 className="font-semibold mb-2">Google Analytics</h4>
                    <p className="text-sm mb-2">We use Google Analytics to analyze website traffic and user behavior.</p>
                    <p className="text-sm"><strong>Privacy Policy:</strong> policies.google.com/privacy</p>
                    <p className="text-sm"><strong>Opt-out:</strong> tools.google.com/dlpage/gaoptout</p>
                  </div>
                </div>
                <p className="leading-relaxed">
                  <strong>5.2.</strong> We do not control these third-party cookies. Please refer to the respective third-party privacy policies for more information.
                </p>
              </div>
            </section>

            {/* Cookie Consent */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Shield size={24} className="text-[#ff6b00]" />
                6. Cookie Consent.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>6.1.</strong> When you first visit our website, you will be presented with a cookie consent banner that allows you to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Accept all cookies.</li>
                  <li>• Accept only necessary cookies.</li>
                  <li>• Customize your cookie preferences.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>6.2.</strong> Your consent preferences are stored in:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• A cookie on your device (cookie_consent).</li>
                  <li>• Our secure MongoDB database for record-keeping.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>6.3.</strong> You can withdraw or modify your consent at any time by:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Clearing your browser cookies and revisiting the website.</li>
                  <li>• Contacting us at contact.adityapatange@gmail.com.</li>
                </ul>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Settings size={24} className="text-[#ff6b00]" />
                7. Managing Cookies.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>7.1.</strong> Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• View cookies stored on your device.</li>
                  <li>• Delete all or specific cookies.</li>
                  <li>• Block cookies from all or specific websites.</li>
                  <li>• Set preferences for first-party vs. third-party cookies.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>7.2.</strong> Browser-specific instructions:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li>• <strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                  <li>• <strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li>• <strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>7.3.</strong> Please note that blocking certain cookies may impact the functionality of our website.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Clock size={24} className="text-[#ff6b00]" />
                8. Data Retention.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>8.1.</strong> Cookie data retention periods vary based on cookie type:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Session Cookies.</strong> Deleted when you close your browser.</li>
                  <li>• <strong>Persistent Cookies.</strong> Retained for the duration specified in Section 3.</li>
                  <li>• <strong>Consent Records.</strong> Retained in our database for 3 years for compliance purposes.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>8.2.</strong> You can request deletion of your consent records by contacting us.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Trash2 size={24} className="text-[#ff6b00]" />
                9. Your Rights.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>9.1.</strong> Under applicable data protection laws, you have the right to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Access.</strong> Request information about cookies we use and data we collect.</li>
                  <li>• <strong>Withdraw Consent.</strong> Withdraw your cookie consent at any time.</li>
                  <li>• <strong>Deletion.</strong> Request deletion of your cookie consent records.</li>
                  <li>• <strong>Object.</strong> Object to processing based on legitimate interests.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>9.2.</strong> To exercise these rights, please contact us using the details in Section 11.
                </p>
              </div>
            </section>

            {/* Updates to Policy */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">10. Updates to This Policy.</h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>10.1.</strong> We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements.
                </p>
                <p className="leading-relaxed">
                  <strong>10.2.</strong> Material changes will be notified through a prominent notice on our website or by updating the &quot;Last Updated&quot; date.
                </p>
                <p className="leading-relaxed">
                  <strong>10.3.</strong> We encourage you to review this policy periodically.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-[#ff6b00] to-[#ff9500] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail size={24} />
                11. Contact Us.
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  If you have any questions about this Cookie Policy or our use of cookies, please contact us:
                </p>
                <div className="bg-white/20 rounded-xl p-6 space-y-3">
                  <p><strong>Company:</strong> NGEK© (NGEK TECH)</p>
                  <p><strong>Data Controller:</strong> Aditya Patange™</p>
                  <p><strong>Email:</strong> contact.adityapatange@gmail.com</p>
                  <p><strong>Website:</strong> ngek.tech</p>
                </div>
                <p className="leading-relaxed mt-4">
                  For cookie-related inquiries, please email us with the subject line &quot;Cookie Policy Inquiry&quot;.
                </p>
              </div>
            </section>

            {/* Footer Notice */}
            <section className="text-center text-[#666] mt-12">
              <p className="mb-2">© {new Date().getFullYear()} NGEK© (NGEK TECH). All Rights Reserved.</p>
              <p className="mb-2">Aditya Patange™ is a registered trademark.</p>
              <p>This Cookie Policy is effective as of December 19, 2025.</p>
            </section>

          </div>

          {/* Back Link */}
          <div className="mt-16 pt-8 border-t border-[#e5e5e5] flex flex-wrap justify-center gap-4">
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
