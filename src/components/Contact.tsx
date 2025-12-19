"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Phone,
  Globe,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>("");

  // Fetch CSRF token on component mount.
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const response = await fetch("/api/csrf");
        const data = await response.json();
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to fetch CSRF token:", error);
        }
      }
    };

    fetchCSRFToken();
  }, []);

  // Guardrail: Input validation.
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation.
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters.";
    }

    // Email validation.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Message validation.
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    } else if (formData.message.length > 5000) {
      newErrors.message = "Message must be less than 5000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardrail: Sanitize input using DOMPurify for defense in depth.
  const sanitizeInput = (input: string): string => {
    if (typeof window !== "undefined") {
      // Use DOMPurify for comprehensive sanitization.
      return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      });
    }
    // Fallback for server-side: remove HTML tags and dangerous characters.
    return input
      .replace(/<[^>]*>/g, "")
      .replace(/[<>\"'&]/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));

    // Clear error when user starts typing.
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Validate CSRF token is available.
    if (!csrfToken) {
      setErrors((prev) => ({
        ...prev,
        submit: "Security token missing. Please refresh the page and try again.",
      }));
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: undefined }));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          website: formData.website || undefined,
          message: formData.message,
          csrfToken: csrfToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          submit: data.error || "Failed to submit form. Please try again.",
        }));
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after successful submission.
      setFormData({
        name: "",
        email: "",
        phone: "",
        website: "",
        message: "",
      });

      // Fetch new CSRF token for next submission.
      const csrfResponse = await fetch("/api/csrf");
      const csrfData = await csrfResponse.json();
      if (csrfData.csrfToken) {
        setCsrfToken(csrfData.csrfToken);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Form submission error:", error);
      }
      setErrors((prev) => ({
        ...prev,
        submit: "An error occurred. Please try again later.",
      }));
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-[#666] text-lg max-w-2xl mx-auto">
            Request your website today. Fill out the form and we&apos;ll email you
            the website link with full domain, deployment, and features covered.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#fff5eb] rounded-3xl p-8 md:p-12 shadow-lg"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 gradient-bg rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">
                Thank You.
              </h3>
              <p className="text-[#666] mb-6">
                Your request has been received. We&apos;ll get back to you within 24-48 hours.
              </p>
              <motion.button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 border-2 border-[#ff6b00] text-[#ff6b00] rounded-full hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Another Request.
              </motion.button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#333] mb-2 flex items-center gap-2">
                    <User size={16} className="text-[#ff6b00]" />
                    Name. <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? "border-red-500" : "border-[#e5e5e5]"
                    } focus:outline-none focus:border-[#ff6b00] transition-colors bg-white`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#333] mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-[#ff6b00]" />
                    Email. <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-[#e5e5e5]"
                    } focus:outline-none focus:border-[#ff6b00] transition-colors bg-white`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#333] mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-[#ff6b00]" />
                    Phone (Optional).
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:outline-none focus:border-[#ff6b00] transition-colors bg-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Website Field */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-[#333] mb-2 flex items-center gap-2">
                    <Globe size={16} className="text-[#ff6b00]" />
                    Current Website (Optional).
                  </label>
                  <input
                    id="website"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:outline-none focus:border-[#ff6b00] transition-colors bg-white"
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#333] mb-2 flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#ff6b00]" />
                  Message. <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  maxLength={5000}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message ? "border-red-500" : "border-[#e5e5e5]"
                  } focus:outline-none focus:border-[#ff6b00] transition-colors bg-white resize-none`}
                  placeholder="Tell us about your project requirements..."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-[#767676]">
                    {formData.message.length}/5000
                  </span>
                </div>
              </div>

              {/* Guardrail Notice */}
              <div className="guardrail py-4 rounded-r-xl text-sm text-[#666]">
                <p>
                  <strong>Note:</strong> Advance payment of $1,000 is required to
                  start the project. Maintenance is $5,300 per month on a recurring basis.
                </p>
              </div>

              {/* Submit Error Display */}
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 gradient-bg text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending.
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Request.
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
