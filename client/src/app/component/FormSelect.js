"use client";

import { useState, useRef, useEffect } from "react";

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(name, option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 text-sm font-medium text-primary-700"
        >
          {label}
          {required && <span className="text-secondary-500">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-primary-200 bg-white px-4 py-3 text-left text-primary-900 transition-all duration-200 hover:border-primary-300 focus:border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/20"
        >
          <span className={value ? "text-primary-900" : "text-primary-400"}>
            {value || placeholder || "Select..."}
          </span>
          <svg
            className={`h-5 w-5 text-primary-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full rounded-lg border border-primary-200 bg-white shadow-xl">
            <div className="max-h-60 overflow-y-auto py-1">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-3 text-left transition-colors duration-150 hover:bg-secondary-50 ${
                    value === option
                      ? "bg-secondary-50 text-secondary-600 font-medium"
                      : "text-primary-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
