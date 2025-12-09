"use client";

import { ContactSectionData } from "@/lib/api";
import { useState, FormEvent, useEffect } from "react";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneCode?: string;
  phoneNumber?: string;
  message?: string;
}

export default function ContactSection({
  contactSectionData,
}: {
  contactSectionData: ContactSectionData;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneCode.trim()) {
      newErrors.phoneCode = "Phone code is required";
    } else if (!/^\d+$/.test(formData.phoneCode)) {
      newErrors.phoneCode = "Phone code must contain only numbers";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain only numbers";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: {
              code: formData.phoneCode,
              number: formData.phoneNumber,
            },
            message: formData.message,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`
        );
      }

      const data = await response.json();
      setSubmitStatus({
        type: "success",
        message: data.message || "Message sent successfully!",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneCode: "",
        phoneNumber: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (submitStatus.type === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  return (
    <section
      id="contact"
      className="px-10 py-16 flex flex-col items-center max-w-full lg:max-w-[70%] mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        {contactSectionData.title}
      </h2>
      <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
        {contactSectionData.description}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid md:grid-cols-2 gap-6 bg-white rounded-xl p-6 border w-full"
      >
        {/* First Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm text-slate-600">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className={`rounded-md border bg-surface px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.firstName
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300"
            }`}
            placeholder="First"
            required
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm text-slate-600">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className={`rounded-md border bg-surface px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300"
            }`}
            placeholder="Last"
            required
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Phone Code */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneCode" className="text-sm text-slate-600">
            Phone Code <span className="text-red-500">*</span>
          </label>
          <input
            id="phoneCode"
            name="phoneCode"
            type="text"
            value={formData.phoneCode}
            onChange={handleChange}
            className={`rounded-md border bg-surface px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.phoneCode
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300"
            }`}
            placeholder="961"
            required
          />
          {errors.phoneCode && (
            <p className="text-sm text-red-500 mt-1">{errors.phoneCode}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="text-sm text-slate-600">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`rounded-md border bg-surface px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.phoneNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300"
            }`}
            placeholder="71234567"
            required
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Email */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-slate-600">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`rounded-md border bg-surface px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300"
            }`}
            placeholder="john.doe@example.com"
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-slate-600">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`rounded-md border bg-surface px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300"
            }`}
            placeholder="Your message here..."
            required
          />
          {errors.message && (
            <p className="text-sm text-red-500 mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Status Messages */}
        {submitStatus.type && (
          <div
            className={`md:col-span-2 p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p className="text-sm font-medium">{submitStatus.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-primary min-w-[150px] ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
}
