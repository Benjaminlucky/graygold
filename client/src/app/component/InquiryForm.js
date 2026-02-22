"use client";

import { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { API_ENDPOINTS } from "../lib/api-config";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    inquiryType: "",
    buyerInfo: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    maxPrice: "",
    beds: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(API_ENDPOINTS.sendInquiryEmail, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          inquiryType: "",
          buyerInfo: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          propertyType: "",
          maxPrice: "",
          beds: "",
          location: "",
          message: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-primary-900">
          Find Your Perfect Property
        </h2>
        <p className="text-primary-600">
          Tell us what you're looking for and we'll match you with the best
          options
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 rounded-lg border-2 border-green-500 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-green-600 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold text-green-800">Success!</p>
              <p className="text-sm text-green-700">
                Thank you for your inquiry! We'll get back to you within 24
                hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 p-4">
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-red-600 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Inquiry Type & Buyer Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormSelect
            label="I am interested in"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            options={["Buying", "Renting", "Selling", "Investment"]}
            placeholder="Select inquiry type"
            required
          />
          <FormSelect
            label="I am a"
            name="buyerInfo"
            value={formData.buyerInfo}
            onChange={handleChange}
            options={[
              "First-time buyer",
              "Repeat buyer",
              "Investor",
              "Developer",
            ]}
            placeholder="Select buyer type"
            required
          />
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
          />
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
          />
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
            required
          />
        </div>

        {/* Property Preferences */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormSelect
            label="Property Type"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            options={[
              "Apartment",
              "House",
              "Villa",
              "Penthouse",
              "Duplex",
              "Land",
            ]}
            placeholder="Select type"
          />
          <FormSelect
            label="Max Budget"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            options={[
              "₦50M - ₦100M",
              "₦100M - ₦200M",
              "₦200M - ₦500M",
              "₦500M - ₦1B",
              "₦1B+",
            ]}
            placeholder="Select budget"
          />
          <FormSelect
            label="Bedrooms"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            options={["1", "2", "3", "4", "5", "6+"]}
            placeholder="Select"
          />
        </div>

        {/* Location */}
        <FormSelect
          label="Preferred Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          options={[
            "Lagos - Victoria Island",
            "Lagos - Ikoyi",
            "Lagos - Lekki",
            "Lagos - Banana Island",
            "Abuja - Maitama",
            "Abuja - Asokoro",
            "Asaba",
            "Enugu",
          ]}
          placeholder="Select location"
        />

        {/* Message */}
        <div className="flex flex-col">
          <label
            htmlFor="message"
            className="mb-2 text-sm font-medium text-primary-700"
          >
            Additional Details
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Tell us more about what you're looking for..."
            rows={4}
            className="rounded-lg border border-primary-200 bg-white px-4 py-3 text-primary-900 placeholder-primary-400 transition-all duration-200 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-secondary-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-secondary-600 hover:shadow-xl hover:shadow-secondary-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Inquiry"
          )}
        </button>
      </form>
    </div>
  );
}
