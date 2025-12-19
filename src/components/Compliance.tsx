"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  Globe,
  Lock,
  FileCheck,
  X,
  ChevronDown,
  ChevronUp,
  Building2,
  Scale,
  Eye,
  Server,
} from "lucide-react";

const complianceStandards = [
  {
    name: "OWASP Top 10",
    fullForm: "Open Web Application Security Project",
    description: "NGEK TECH is fully compliant with OWASP (Open Web Application Security Project) Application Security standards.",
    icon: Shield,
    status: "Compliant",
  },
  {
    name: "GDPR",
    fullForm: "General Data Protection Regulation",
    description: "NGEK TECH complies with GDPR (General Data Protection Regulation) - the European Union data protection law.",
    icon: Lock,
    status: "Compliant",
  },
  {
    name: "CCPA",
    fullForm: "California Consumer Privacy Act",
    description: "NGEK TECH adheres to CCPA (California Consumer Privacy Act) requirements for consumer data protection.",
    icon: Eye,
    status: "Compliant",
  },
  {
    name: "SOC 2 Type II",
    fullForm: "Service Organization Control 2 Type II",
    description: "NGEK TECH maintains SOC 2 (Service Organization Control 2) Type II security standards compliance.",
    icon: Server,
    status: "Compliant",
  },
  {
    name: "ISO 27001",
    fullForm: "International Organization for Standardization 27001",
    description: "NGEK TECH follows ISO (International Organization for Standardization) 27001 information security management standards.",
    icon: FileCheck,
    status: "Compliant",
  },
  {
    name: "HIPAA Ready",
    fullForm: "Health Insurance Portability and Accountability Act",
    description: "NGEK TECH is ready for HIPAA (Health Insurance Portability and Accountability Act) compliance for healthcare clients.",
    icon: Building2,
    status: "Ready",
  },
];

const jurisdictions = {
  "United States of America (USA)": [
    "California",
    "Texas",
    "New York",
    "Florida",
    "Illinois",
    "Pennsylvania",
    "Ohio",
    "Georgia",
    "North Carolina",
    "Michigan",
    "New Jersey",
    "Virginia",
    "Washington",
    "Arizona",
    "Massachusetts",
    "Tennessee",
    "Indiana",
    "Missouri",
    "Maryland",
    "Wisconsin",
    "Colorado",
    "Minnesota",
    "South Carolina",
    "Alabama",
    "Louisiana",
    "Kentucky",
    "Oregon",
    "Oklahoma",
    "Connecticut",
    "Utah",
    "Nevada",
    "Arkansas",
    "Mississippi",
    "Kansas",
    "New Mexico",
    "Nebraska",
    "Idaho",
    "West Virginia",
    "Hawaii",
    "New Hampshire",
    "Maine",
    "Montana",
    "Rhode Island",
    "Delaware",
    "South Dakota",
    "North Dakota",
    "Alaska",
    "Vermont",
    "Wyoming",
    "District of Columbia",
  ],
  India: [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
    "Ghaziabad",
  ],
  "United Kingdom (UK)": ["London", "Birmingham", "Manchester", "Leeds", "Glasgow", "Liverpool", "Bristol", "Edinburgh"],
  Canada: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle"],
  Germany: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Dusseldorf", "Leipzig"],
  France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier"],
  Japan: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto"],
  Singapore: ["Singapore"],
  "United Arab Emirates (UAE)": ["Dubai", "Abu Dhabi", "Sharjah"],
  "Hong Kong SAR": ["Hong Kong"],
  Netherlands: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
  Switzerland: ["Zurich", "Geneva", "Basel", "Bern"],
  Sweden: ["Stockholm", "Gothenburg", "Malmo"],
  Ireland: ["Dublin", "Cork", "Galway"],
  "New Zealand": ["Auckland", "Wellington", "Christchurch"],
  "South Korea": ["Seoul", "Busan", "Incheon"],
  Brazil: ["Sao Paulo", "Rio de Janeiro", "Brasilia"],
  Mexico: ["Mexico City", "Guadalajara", "Monterrey"],
  Spain: ["Madrid", "Barcelona", "Valencia"],
  Italy: ["Rome", "Milan", "Naples", "Turin"],
};

const regulatoryDetails = [
  {
    title: "Data Protection & Privacy",
    icon: Lock,
    content: `NGEK TECH maintains strict compliance with global data protection regulations including:

- **GDPR (General Data Protection Regulation) - European Union (EU)**: NGEK TECH provides full compliance with European data protection standards, including data subject rights, lawful processing bases, and cross-border transfer mechanisms.
- **CCPA (California Consumer Privacy Act) - California, USA**: NGEK TECH adheres completely to California Consumer Privacy Act requirements for consumer data rights and business obligations.
- **LGPD (Lei Geral de Proteção de Dados / General Data Protection Law) - Brazil**: NGEK TECH complies with Brazil's General Data Protection Law for all data processing activities.
- **PDPA (Personal Data Protection Act) - Singapore**: NGEK TECH adheres to Singapore's Personal Data Protection Act requirements.
- **Privacy Act - Australia**: NGEK TECH complies with Australian Privacy Principles (APPs) for handling personal information.

NGEK TECH documents all data processing activities and conducts DPIAs (Data Protection Impact Assessments) for high-risk processing operations.`,
  },
  {
    title: "Information Security Standards",
    icon: Shield,
    content: `NGEK TECH implements industry-leading security standards:

- **ISO 27001 (International Organization for Standardization 27001)**: NGEK TECH maintains a certified ISMS (Information Security Management System) that ensures a systematic approach to managing sensitive information.
- **SOC 2 Type II (Service Organization Control 2 Type II)**: NGEK TECH undergoes annual audits that verify security, availability, processing integrity, confidentiality, and privacy controls.
- **OWASP Top 10 (Open Web Application Security Project Top 10)**: NGEK TECH tests all applications against OWASP ASVS (Application Security Verification Standard).
- **NIST (National Institute of Standards and Technology) Cybersecurity Framework**: NGEK TECH implements NIST guidelines for identifying, protecting, detecting, responding to, and recovering from cyber threats.
- **CIS (Center for Internet Security) Controls**: NGEK TECH adheres to Center for Internet Security critical security controls.

NGEK TECH conducts regular penetration testing and vulnerability assessments through certified third-party auditors.`,
  },
  {
    title: "Financial & Business Compliance",
    icon: Scale,
    content: `NGEK TECH maintains compliance with financial and business regulations:

- **PCI DSS (Payment Card Industry Data Security Standard)**: NGEK TECH complies with Payment Card Industry Data Security Standard for all payment processing activities.
- **AML/KYC (Anti-Money Laundering / Know Your Customer)**: NGEK TECH implements Anti-Money Laundering and Know Your Customer procedures where applicable.
- **SOX (Sarbanes-Oxley Act) Compliance**: NGEK TECH complies with the Sarbanes-Oxley Act for financial reporting and internal controls.
- **FCPA (Foreign Corrupt Practices Act)**: NGEK TECH complies with the Foreign Corrupt Practices Act for all international business operations.
- **Export Controls**: NGEK TECH complies with US EAR (Export Administration Regulations) and international export control regulations.

NGEK TECH subjects all financial operations to regular internal and external audits.`,
  },
  {
    title: "Industry-Specific Compliance",
    icon: Building2,
    content: `NGEK TECH is prepared to meet industry-specific regulatory requirements:

- **HIPAA (Health Insurance Portability and Accountability Act) Ready**: NGEK TECH maintains Health Insurance Portability and Accountability Act compliance infrastructure for healthcare clients.
- **FERPA (Family Educational Rights and Privacy Act)**: NGEK TECH complies with the Family Educational Rights and Privacy Act for educational institutions.
- **GLBA (Gramm-Leach-Bliley Act)**: NGEK TECH complies with the Gramm-Leach-Bliley Act for financial services clients.
- **FedRAMP (Federal Risk and Authorization Management Program) Ready**: NGEK TECH maintains Federal Risk and Authorization Management Program readiness for government clients.
- **ITAR (International Traffic in Arms Regulations) Aware**: NGEK TECH maintains awareness of International Traffic in Arms Regulations for defense-related projects.

NGEK TECH offers custom compliance packages for specialized industry requirements.`,
  },
  {
    title: "Accessibility & Inclusivity",
    icon: Eye,
    content: `NGEK TECH is committed to digital accessibility:

- **WCAG 2.1 AA (Web Content Accessibility Guidelines 2.1 Level AA)**: NGEK TECH complies with Web Content Accessibility Guidelines for all web applications.
- **Section 508**: NGEK TECH complies with United States federal accessibility requirements.
- **ADA (Americans with Disabilities Act) Compliance**: NGEK TECH adheres to Americans with Disabilities Act digital accessibility standards.
- **EN 301 549**: NGEK TECH complies with European accessibility requirements for ICT (Information and Communications Technology) products and services.

NGEK TECH conducts regular accessibility audits and user testing with assistive technologies to ensure inclusive digital experiences.`,
  },
  {
    title: "Environmental & Social Governance (ESG)",
    icon: Globe,
    content: `NGEK TECH maintains strong ESG (Environmental, Social, and Governance) commitments:

- **Carbon Neutral Operations**: NGEK TECH commits to carbon-neutral hosting and operations.
- **UN SDGs (United Nations Sustainable Development Goals)**: NGEK TECH aligns with United Nations Sustainable Development Goals.
- **Ethical AI (Artificial Intelligence) Principles**: NGEK TECH adheres to responsible AI (Artificial Intelligence) development and deployment practices.
- **Supplier Code of Conduct**: NGEK TECH requires ESG (Environmental, Social, and Governance) compliance for all third-party vendors and partners.
- **Diversity & Inclusion**: NGEK TECH commits to diverse and inclusive workplace practices.

NGEK TECH provides annual ESG (Environmental, Social, and Governance) reports upon request.`,
  },
];

export default function Compliance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const totalCities = Object.values(jurisdictions).flat().length;

  return (
    <section id="compliance" className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Compliance & Regulatory.</span>
          </h2>
          <p className="text-[#666] text-lg max-w-3xl mx-auto">
            NGEK TECH maintains the highest standards of regulatory compliance across {totalCities}+ jurisdictions worldwide and ensures your business operates within all applicable legal frameworks.
          </p>
        </motion.div>

        {/* Compliance Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {complianceStandards.map((standard, index) => (
            <motion.div
              key={standard.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e5e5] text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 gradient-bg rounded-full mx-auto mb-3 flex items-center justify-center">
                <standard.icon size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a] text-sm mb-1">{standard.name}</h3>
              <p className="text-[10px] text-[#888] mb-2">{standard.fullForm}</p>
              <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                <CheckCircle size={12} />
                {standard.status}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Key Jurisdictions Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-[#e5e5e5] mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe size={28} className="text-[#ff6b00]" />
            <h3 className="text-xl font-bold text-[#1a1a1a]">Global Jurisdiction Coverage.</h3>
          </div>
          <p className="text-[#666] mb-6">
            NGEK TECH is fully compliant with all local and global laws, regulations, and industry standards across major jurisdictions including but not limited to:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {["California, USA", "Texas, USA", "Mumbai, India", "Delhi, India", "London, UK", "Singapore", "Tokyo, Japan", "Sydney, Australia"].map(
              (city) => (
                <div key={city} className="flex items-center gap-2 text-sm text-[#333]">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <span>{city}</span>
                </div>
              )
            )}
          </div>
          <p className="text-sm text-[#666] italic">
            + {totalCities - 8} more cities across {Object.keys(jurisdictions).length} countries.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 gradient-bg text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileCheck size={24} />
            View Full Regulatory & Compliance (FRC) Details.
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="gradient-bg p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield size={28} className="text-white" />
                  <div>
                    <h2 className="text-xl font-bold text-white">FRC (Full Regulatory & Compliance) Details.</h2>
                    <p className="text-white/80 text-sm">NGEK TECH Compliance Documentation.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
                {/* Compliance Standards Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-[#ff6b00]" />
                    Compliance Standards & Certifications.
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {complianceStandards.map((standard) => (
                      <div key={standard.name} className="bg-[#f5f5f5] rounded-xl p-4 flex items-start gap-3">
                        <div className="w-10 h-10 bg-[#ff6b00] rounded-lg flex items-center justify-center flex-shrink-0">
                          <standard.icon size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[#1a1a1a]">{standard.name}</h4>
                            <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              <CheckCircle size={10} />
                              {standard.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#888] mb-1">{standard.fullForm}</p>
                          <p className="text-sm text-[#666]">{standard.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Regulatory Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <FileCheck size={20} className="text-[#ff6b00]" />
                    Detailed Regulatory Information.
                  </h3>
                  <div className="space-y-3">
                    {regulatoryDetails.map((detail, index) => (
                      <div key={detail.title} className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                          className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-[#fafafa] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <detail.icon size={18} className="text-[#ff6b00]" />
                            <span className="font-medium text-[#1a1a1a]">{detail.title}</span>
                          </div>
                          {expandedSection === index ? (
                            <ChevronUp size={18} className="text-[#666]" />
                          ) : (
                            <ChevronDown size={18} className="text-[#666]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedSection === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 py-4 bg-[#fafafa] border-t border-[#e5e5e5]">
                                <div className="prose prose-sm max-w-none text-[#666]">
                                  {detail.content.split("\n\n").map((paragraph, pIndex) => (
                                    <p key={pIndex} className="mb-3 last:mb-0 whitespace-pre-line">
                                      {paragraph.split("**").map((part, partIndex) =>
                                        partIndex % 2 === 1 ? (
                                          <strong key={partIndex} className="text-[#1a1a1a]">
                                            {part}
                                          </strong>
                                        ) : (
                                          part
                                        )
                                      )}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jurisdiction Coverage */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <Globe size={20} className="text-[#ff6b00]" />
                    Complete Jurisdiction Coverage ({totalCities}+ Cities).
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(jurisdictions).map(([country, cities]) => (
                      <div key={country} className="border border-[#e5e5e5] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedCountry(expandedCountry === country ? null : country)}
                          className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-[#fafafa] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="font-medium text-[#1a1a1a]">{country}</span>
                            <span className="text-xs text-[#666] bg-[#f5f5f5] px-2 py-0.5 rounded-full">
                              {cities.length} {cities.length === 1 ? "jurisdiction" : "jurisdictions"}
                            </span>
                          </div>
                          {expandedCountry === country ? (
                            <ChevronUp size={18} className="text-[#666]" />
                          ) : (
                            <ChevronDown size={18} className="text-[#666]" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedCountry === country && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 py-3 bg-[#fafafa] border-t border-[#e5e5e5]">
                                <div className="flex flex-wrap gap-2">
                                  {cities.map((city) => (
                                    <span
                                      key={city}
                                      className="inline-flex items-center gap-1 text-xs text-[#333] bg-white px-2 py-1 rounded-lg border border-[#e5e5e5]"
                                    >
                                      <CheckCircle size={10} className="text-green-500" />
                                      {city}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="bg-[#fff5eb] rounded-xl p-4 border-l-4 border-[#ff6b00]">
                  <p className="text-sm text-[#666]">
                    <strong className="text-[#1a1a1a]">Compliance Guarantee:</strong> NGEK TECH continuously monitors regulatory changes across all operating jurisdictions. Our legal and compliance teams ensure that all services remain compliant with evolving local and international regulations. For specific compliance inquiries, please contact{" "}
                    <a href="mailto:contact.adityapatange@gmail.com" className="text-[#ff6b00] hover:underline">
                      contact.adityapatange@gmail.com
                    </a>
                    .
                  </p>
                </div>

                {/* Acronym Reference */}
                <div className="mt-6 bg-[#f5f5f5] rounded-xl p-4">
                  <h4 className="font-semibold text-[#1a1a1a] mb-3 text-sm">Acronym Reference Guide.</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#666]">
                    <div><strong>ADA</strong> - Americans with Disabilities Act</div>
                    <div><strong>AI</strong> - Artificial Intelligence</div>
                    <div><strong>AML</strong> - Anti-Money Laundering</div>
                    <div><strong>APPs</strong> - Australian Privacy Principles</div>
                    <div><strong>ASVS</strong> - Application Security Verification Standard</div>
                    <div><strong>CCPA</strong> - California Consumer Privacy Act</div>
                    <div><strong>CIS</strong> - Center for Internet Security</div>
                    <div><strong>DPIA</strong> - Data Protection Impact Assessment</div>
                    <div><strong>EAR</strong> - Export Administration Regulations</div>
                    <div><strong>ESG</strong> - Environmental, Social, and Governance</div>
                    <div><strong>EU</strong> - European Union</div>
                    <div><strong>FCPA</strong> - Foreign Corrupt Practices Act</div>
                    <div><strong>FedRAMP</strong> - Federal Risk and Authorization Management Program</div>
                    <div><strong>FERPA</strong> - Family Educational Rights and Privacy Act</div>
                    <div><strong>FRC</strong> - Full Regulatory & Compliance</div>
                    <div><strong>GDPR</strong> - General Data Protection Regulation</div>
                    <div><strong>GLBA</strong> - Gramm-Leach-Bliley Act</div>
                    <div><strong>HIPAA</strong> - Health Insurance Portability and Accountability Act</div>
                    <div><strong>ICT</strong> - Information and Communications Technology</div>
                    <div><strong>ISO</strong> - International Organization for Standardization</div>
                    <div><strong>ISMS</strong> - Information Security Management System</div>
                    <div><strong>ITAR</strong> - International Traffic in Arms Regulations</div>
                    <div><strong>KYC</strong> - Know Your Customer</div>
                    <div><strong>LGPD</strong> - Lei Geral de Proteção de Dados (General Data Protection Law)</div>
                    <div><strong>NIST</strong> - National Institute of Standards and Technology</div>
                    <div><strong>OWASP</strong> - Open Web Application Security Project</div>
                    <div><strong>PCI DSS</strong> - Payment Card Industry Data Security Standard</div>
                    <div><strong>PDPA</strong> - Personal Data Protection Act</div>
                    <div><strong>SAR</strong> - Special Administrative Region</div>
                    <div><strong>SDGs</strong> - Sustainable Development Goals</div>
                    <div><strong>SOC</strong> - Service Organization Control</div>
                    <div><strong>SOX</strong> - Sarbanes-Oxley Act</div>
                    <div><strong>UAE</strong> - United Arab Emirates</div>
                    <div><strong>UK</strong> - United Kingdom</div>
                    <div><strong>UN</strong> - United Nations</div>
                    <div><strong>USA</strong> - United States of America</div>
                    <div><strong>WCAG</strong> - Web Content Accessibility Guidelines</div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="mt-6 text-center text-xs text-[#999]">
                  <p>Last Updated: December 19, 2025.</p>
                  <p>Document Version: FRC-2025.12.001.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
