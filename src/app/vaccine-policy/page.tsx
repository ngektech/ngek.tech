import Link from "next/link";
import { ArrowLeft, Syringe, Shield, Heart, Users, Globe, Scale, AlertTriangle, CheckCircle, FileText, Mail, Building, Stethoscope } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Vaccine Policy | NGEK TECH",
  description: "NGEK TECH Vaccine Policy. Our commitment to workplace health, safety, and compliance with global health guidelines.",
};

export default function VaccinePolicyPage() {
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
              <Syringe size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Vaccine Policy.</h1>
            <p className="text-[#666]">Last Updated: December 19, 2025.</p>
          </div>

          {/* Vaccine Policy Content */}
          <div className="prose prose-lg max-w-none space-y-8">

            {/* Introduction */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Shield size={24} className="text-[#ff6b00]" />
                1. Introduction and Purpose.
              </h2>
              <p className="text-[#333] leading-relaxed mb-4">
                NGEK© (hereinafter referred to as &quot;NGEK TECH&quot;, &quot;NGEK©&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), owned and operated by Aditya Patange™, is committed to maintaining a safe and healthy workplace for all team members, clients, and visitors. This Vaccine Policy outlines our approach to vaccination in alignment with global public health guidelines and local regulatory requirements.
              </p>
              <p className="text-[#333] leading-relaxed mb-4">
                Our policy is guided by scientific evidence, respect for individual rights, and commitment to collective well-being. We believe in a balanced approach that prioritizes both public health and personal autonomy, following established guidelines from the World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), and local health authorities.
              </p>
              <p className="text-[#333] leading-relaxed">
                This policy applies to all employees, contractors, interns, visitors, and anyone conducting business on behalf of NGEK© or at NGEK© premises.
              </p>
            </section>

            {/* Our Commitment */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Heart size={24} className="text-[#ff6b00]" />
                2. Our Commitment to Health and Safety.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>2.1.</strong> We are committed to creating a workplace environment that protects the health and safety of all individuals while respecting personal medical decisions.
                </p>
                <p className="leading-relaxed">
                  <strong>2.2. Core Principles:</strong>
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Science-Based Decisions.</strong> All policies are informed by peer-reviewed scientific research and guidance from recognized health authorities.</li>
                  <li>• <strong>Respect for Autonomy.</strong> We respect individual rights to make informed medical decisions in consultation with healthcare providers.</li>
                  <li>• <strong>Non-Discrimination.</strong> No individual shall face discrimination based on their vaccination status.</li>
                  <li>• <strong>Privacy Protection.</strong> All health information is treated with strict confidentiality in accordance with applicable privacy laws.</li>
                  <li>• <strong>Adaptive Approach.</strong> Our policies evolve based on the latest scientific evidence and public health guidance.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>2.3.</strong> We recognize that vaccination is one component of a comprehensive health and safety strategy that includes hygiene practices, ventilation, and flexible work arrangements.
                </p>
              </div>
            </section>

            {/* Vaccination Stance */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Stethoscope size={24} className="text-[#ff6b00]" />
                3. Vaccination Stance.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>3.1. Encouraged, Not Mandated.</strong> NGEK© strongly encourages all eligible individuals to stay up-to-date with recommended vaccinations as advised by their healthcare providers and local health authorities. However, vaccination is not mandated as a condition of employment.
                </p>
                <p className="leading-relaxed">
                  <strong>3.2. Supported Vaccinations.</strong> We encourage individuals to consult with their healthcare providers regarding:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• COVID-19 vaccines and boosters as recommended by health authorities.</li>
                  <li>• Annual influenza (flu) vaccines.</li>
                  <li>• Other vaccinations as recommended by local health guidelines.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>3.3. Informed Decision-Making.</strong> We support individuals in making informed decisions about their health by providing access to reliable, science-based information from trusted sources.
                </p>
                <p className="leading-relaxed">
                  <strong>3.4. Healthcare Provider Consultation.</strong> We encourage all team members to discuss vaccination decisions with their personal healthcare providers who understand their individual health circumstances.
                </p>
              </div>
            </section>

            {/* Workplace Safety Measures */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Building size={24} className="text-[#ff6b00]" />
                4. Workplace Safety Measures.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>4.1.</strong> Regardless of vaccination status, NGEK© implements comprehensive safety measures to protect all individuals:
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">4.2. Hygiene and Sanitation.</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Hand sanitizing stations throughout the workplace.</li>
                      <li>• Regular cleaning and disinfection of high-touch surfaces.</li>
                      <li>• Adequate supply of hygiene products.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">4.3. Ventilation and Air Quality.</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Enhanced ventilation systems where applicable.</li>
                      <li>• Air purification measures in enclosed spaces.</li>
                      <li>• Access to outdoor or well-ventilated meeting areas.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">4.4. Flexible Work Arrangements.</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Remote work options for eligible roles.</li>
                      <li>• Flexible scheduling to reduce workplace density.</li>
                      <li>• Virtual meeting options for those who prefer them.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">4.5. Illness Protocols.</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Clear guidelines for staying home when symptomatic.</li>
                      <li>• Paid sick leave in accordance with applicable laws.</li>
                      <li>• No penalties for taking health-related leave.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Privacy and Confidentiality */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Shield size={24} className="text-[#ff6b00]" />
                5. Privacy and Confidentiality.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>5.1.</strong> NGEK© is committed to protecting the privacy of all health-related information in accordance with applicable privacy laws, including but not limited to:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Information Technology Act, 2000 (India).</li>
                  <li>• Personal Data Protection regulations.</li>
                  <li>• HIPAA (for US-based interactions).</li>
                  <li>• GDPR (for EU-based interactions).</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>5.2.</strong> Vaccination status is considered sensitive personal health information and will be:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Collected only when legally required or voluntarily disclosed.</li>
                  <li>• Stored securely with restricted access.</li>
                  <li>• Never shared without explicit consent or legal requirement.</li>
                  <li>• Used only for legitimate health and safety purposes.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>5.3.</strong> Individuals are not required to disclose their vaccination status to NGEK© unless mandated by applicable law or for specific client engagements that require such disclosure.
                </p>
              </div>
            </section>

            {/* Non-Discrimination */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Users size={24} className="text-[#ff6b00]" />
                6. Non-Discrimination Policy.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>6.1.</strong> NGEK© strictly prohibits discrimination, harassment, or retaliation against any individual based on their vaccination status or decision.
                </p>
                <p className="leading-relaxed">
                  <strong>6.2.</strong> All team members shall be treated with dignity and respect regardless of their personal health decisions.
                </p>
                <p className="leading-relaxed">
                  <strong>6.3.</strong> Employment decisions including hiring, promotion, compensation, and termination shall not be influenced by vaccination status.
                </p>
                <p className="leading-relaxed">
                  <strong>6.4.</strong> Any concerns about discrimination should be reported through our grievance process outlined in Section 11.
                </p>
                <p className="leading-relaxed">
                  <strong>6.5.</strong> We recognize and respect that individuals may have medical conditions, religious beliefs, or personal convictions that inform their vaccination decisions.
                </p>
              </div>
            </section>

            {/* Accommodations */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <CheckCircle size={24} className="text-[#ff6b00]" />
                7. Accommodations and Exemptions.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>7.1.</strong> Where vaccination may be required for specific client sites or jurisdictions, NGEK© will work with individuals to provide reasonable accommodations, including:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Medical Exemptions.</strong> For individuals with documented medical contraindications certified by a licensed healthcare provider.</li>
                  <li>• <strong>Religious Accommodations.</strong> For individuals with sincerely held religious beliefs that preclude vaccination.</li>
                  <li>• <strong>Alternative Arrangements.</strong> Remote work, alternative assignments, or other reasonable accommodations where feasible.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>7.2.</strong> Accommodation requests will be reviewed on a case-by-case basis through an interactive process with the individual.
                </p>
                <p className="leading-relaxed">
                  <strong>7.3.</strong> All accommodation requests and supporting documentation will be treated confidentially.
                </p>
              </div>
            </section>

            {/* Compliance */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Scale size={24} className="text-[#ff6b00]" />
                8. Legal Compliance.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>8.1.</strong> This policy is designed to comply with all applicable laws and regulations, including:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Indian labor laws and workplace safety regulations.</li>
                  <li>• The Epidemic Diseases Act, 1897 (India).</li>
                  <li>• Disaster Management Act, 2005 (India).</li>
                  <li>• Applicable state and local health orders.</li>
                  <li>• International health regulations for cross-border activities.</li>
                  <li>• Client-specific requirements for on-site work.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>8.2.</strong> Where local laws or client requirements mandate specific vaccination requirements, NGEK© will:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Communicate requirements clearly and promptly.</li>
                  <li>• Provide reasonable notice before implementation.</li>
                  <li>• Explore accommodations and alternatives where possible.</li>
                  <li>• Comply with applicable legal mandates.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>8.3.</strong> This policy will be updated as laws, regulations, and public health guidance evolve.
                </p>
              </div>
            </section>

            {/* Resources */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Globe size={24} className="text-[#ff6b00]" />
                9. Resources and Information.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>9.1.</strong> NGEK© encourages individuals to seek information from authoritative, science-based sources:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>World Health Organization (WHO):</strong> who.int</li>
                  <li>• <strong>Centers for Disease Control and Prevention (CDC):</strong> cdc.gov</li>
                  <li>• <strong>Ministry of Health and Family Welfare (India):</strong> mohfw.gov.in</li>
                  <li>• <strong>Indian Council of Medical Research (ICMR):</strong> icmr.gov.in</li>
                  <li>• Your personal healthcare provider.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>9.2.</strong> We encourage critical evaluation of information sources and consultation with qualified healthcare professionals for personal health decisions.
                </p>
                <p className="leading-relaxed">
                  <strong>9.3.</strong> NGEK© does not provide medical advice. All health-related decisions should be made in consultation with licensed healthcare providers.
                </p>
              </div>
            </section>

            {/* Support */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Heart size={24} className="text-[#ff6b00]" />
                10. Support and Well-being.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>10.1.</strong> NGEK© is committed to supporting the overall well-being of our team members:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Paid Time Off.</strong> Time off for vaccination appointments if needed.</li>
                  <li>• <strong>Recovery Time.</strong> Flexibility for those experiencing post-vaccination effects.</li>
                  <li>• <strong>Mental Health Support.</strong> Access to resources for health-related anxiety or concerns.</li>
                  <li>• <strong>Open Communication.</strong> A safe environment to discuss concerns without judgment.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>10.2.</strong> We foster an environment of mutual respect where diverse perspectives on health decisions are acknowledged and respected.
                </p>
              </div>
            </section>

            {/* Grievance */}
            <section className="bg-[#fff5eb] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <AlertTriangle size={24} className="text-[#ff6b00]" />
                11. Grievance and Reporting.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>11.1.</strong> Any individual who believes they have experienced discrimination, harassment, or policy violations related to vaccination status should report their concerns.
                </p>
                <p className="leading-relaxed">
                  <strong>11.2. Reporting Process:</strong>
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Email concerns to contact.adityapatange@gmail.com with subject line &quot;Vaccine Policy Concern&quot;.</li>
                  <li>• All reports will be treated confidentially to the extent possible.</li>
                  <li>• Reports will be investigated promptly and fairly.</li>
                  <li>• Retaliation against anyone who reports concerns is strictly prohibited.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>11.3.</strong> Complaints will be addressed within 30 days of receipt. The complainant will be informed of the outcome and any corrective actions taken.
                </p>
              </div>
            </section>

            {/* Policy Updates */}
            <section className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <FileText size={24} className="text-[#ff6b00]" />
                12. Policy Updates.
              </h2>
              <div className="space-y-4 text-[#333]">
                <p className="leading-relaxed">
                  <strong>12.1.</strong> This policy will be reviewed and updated periodically to reflect:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Changes in scientific understanding and public health guidance.</li>
                  <li>• Updates to applicable laws and regulations.</li>
                  <li>• Evolving workplace needs and circumstances.</li>
                  <li>• Feedback from team members and stakeholders.</li>
                </ul>
                <p className="leading-relaxed">
                  <strong>12.2.</strong> Material changes will be communicated to all affected individuals with reasonable notice before taking effect.
                </p>
                <p className="leading-relaxed">
                  <strong>12.3.</strong> The &quot;Last Updated&quot; date at the top of this policy indicates when it was most recently revised.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-[#ff6b00] to-[#ff9500] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail size={24} />
                13. Contact Information.
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  For questions, concerns, or accommodation requests regarding this Vaccine Policy, please contact us:
                </p>
                <div className="bg-white/20 rounded-xl p-6 space-y-3">
                  <p><strong>Company:</strong> NGEK© (NGEK TECH)</p>
                  <p><strong>Policy Administrator:</strong> Aditya Patange™</p>
                  <p><strong>Email:</strong> contact.adityapatange@gmail.com</p>
                  <p><strong>Website:</strong> ngek.tech</p>
                </div>
                <p className="leading-relaxed mt-4">
                  We are committed to addressing all inquiries promptly and with respect for individual privacy and dignity.
                </p>
              </div>
            </section>

            {/* Footer Notice */}
            <section className="text-center text-[#666] mt-12">
              <p className="mb-2">© {new Date().getFullYear()} NGEK© (NGEK TECH). All Rights Reserved.</p>
              <p className="mb-2">Aditya Patange™ is a registered trademark.</p>
              <p className="mb-4">This Vaccine Policy is effective as of December 19, 2025.</p>
              <p className="text-sm italic">
                Disclaimer: This policy does not constitute medical advice. Please consult with qualified healthcare professionals for personal health decisions.
              </p>
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
