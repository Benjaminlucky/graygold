"use client";

import { useState } from "react";
import FormSelect from "./FormSelect";
import FormInput from "./FormInput";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    inquiryType: "Rental",
    information: "I'm a first time buyer",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    maxPrice: "",
    bedrooms: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
        {/* Form Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-primary-900">
            Got any inquiry?{" "}
            <span className="text-secondary-500">Start here</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Inquiry Type & Information */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormSelect
              label="Inquiry Type"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              options={["Rental", "Purchase", "Lease", "Investment"]}
              required
            />
            <FormSelect
              label="Information"
              name="information"
              value={formData.information}
              onChange={handleChange}
              options={[
                "I'm a first time buyer",
                "I'm looking to invest",
                "I'm relocating",
                "I'm upgrading",
                "Other",
              ]}
              required
            />
          </div>

          {/* Row 2: First Name & Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <FormInput
              label="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>

          {/* Row 3: Email & Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>

          {/* Row 4: Property Type, Max Price & Bedrooms */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormSelect
              label="Property Type"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              options={["Apartment", "House", "Villa", "Penthouse", "Land"]}
              placeholder="Property Type"
              required
            />
            <FormInput
              label="Max Price"
              name="maxPrice"
              type="text"
              value={formData.maxPrice}
              onChange={handleChange}
              placeholder="Max Price"
              required
            />
            <FormSelect
              label="Number of Beds"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              options={["1", "2", "3", "4", "5", "6+"]}
              placeholder="Number of Beds"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-lg bg-secondary-500 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-secondary-600 hover:shadow-xl hover:shadow-secondary-500/30"
          >
            <span className="relative z-10">Submit Inquiry</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-secondary-600 to-secondary-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </form>
      </div>
    </div>
  );
}
