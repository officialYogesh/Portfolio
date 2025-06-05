"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Github,
  Linkedin,
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { personalInfo } from "../../../config/personal-info";

// Form validation interface
interface FormData {
  subject: string;
  message: string;
}

interface FormErrors {
  subject?: string;
  message?: string;
}

// Contact form component
const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create mailto URL with form data
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(formData.message);
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoUrl;

      // Simulate submission delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      setFormData({ subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Subject Field */}
      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground"
        >
          Subject *
        </label>
        <motion.input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
            errors.subject
              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
              : "border-border hover:border-primary/50"
          }`}
          placeholder="What would you like to discuss?"
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        {errors.subject && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.subject}
          </motion.p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground"
        >
          Message *
        </label>
        <motion.textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none ${
            errors.message
              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
              : "border-border hover:border-primary/50"
          }`}
          placeholder="Tell me about your project, opportunity, or just say hello..."
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
          isSubmitting
            ? "bg-primary/50 cursor-not-allowed"
            : "bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
        } text-primary-foreground min-w-[160px]`}
        whileHover={!isSubmitting ? { scale: 1.05 } : {}}
        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm sm:text-base">Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span className="text-sm sm:text-base">Send Message</span>
          </>
        )}
      </motion.button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm sm:text-base">
            Your email client should open shortly. Thank you for reaching out!
          </span>
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm sm:text-base">
            Something went wrong. Please try emailing me directly.
          </span>
        </motion.div>
      )}
    </motion.form>
  );
};

// Social media icons mapping
const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "portfolio":
      return Globe;
    case "email":
      return Mail;
    default:
      return Globe;
  }
};

export default function ContactPage() {
  return (
    <>
      <Container className="py-8 md:py-16">
        {/* Hero Section */}
        <AnimatedContainer delay={0.1} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Let&apos;s Connect
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Want to collaborate? Or just want to say
              hello? I&apos;d love to hear from you.
            </p>
          </motion.div>
        </AnimatedContainer>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form Section */}
          <AnimatedContainer delay={0.2}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Send a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and I&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>
              <ContactForm />
            </div>
          </AnimatedContainer>

          {/* Contact Information Section */}
          <AnimatedContainer delay={0.3}>
            <div className="space-y-8">
              {/* Contact Details */}
              <div>
                <div className="mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Get in Touch
                  </h2>
                </div>

                <StaggerContainer className="space-y-6">
                  {/* Email */}
                  <StaggerItem>
                    <motion.div
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="text-primary hover:underline break-all text-sm sm:text-base"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </motion.div>
                  </StaggerItem>

                  {/* Location */}
                  <StaggerItem>
                    <motion.div
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="p-3 bg-primary/10 rounded-full">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          Location
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          {personalInfo.location}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>

                  {/* Response Time */}
                  <StaggerItem>
                    <motion.div
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          Response Time
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Usually within 24 hours
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {personalInfo.availability}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>
              </div>

              {/* Social Media Links */}
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    Connect on Social Media
                  </h3>
                </div>
                <StaggerContainer className="grid grid-cols-2 gap-4">
                  {personalInfo.socialLinks
                    .filter((link) => link.platform.toLowerCase() !== "email")
                    .map((link, index) => {
                      const IconComponent = getSocialIcon(link.platform);
                      return (
                        <StaggerItem key={index}>
                          <motion.a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm">
                                {link.platform}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {link.username}
                              </p>
                            </div>
                          </motion.a>
                        </StaggerItem>
                      );
                    })}
                </StaggerContainer>
              </div>

              {/* Availability Status */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Current Availability
                </h3>
                <p className="text-primary font-medium mb-2">
                  {personalInfo.availability}
                </p>
                <p className="text-sm text-muted-foreground">
                  Interested in full-time opportunities, and collaborations.
                  Let&apos;s discuss how we can work together!
                </p>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </Container>
    </>
  );
}
