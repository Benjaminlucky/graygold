// lib/api-config.js

// Dynamically determine the API URL based on environment
const getApiUrl = () => {
  // Priority 1: Explicit environment variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Priority 2: Check if we're in development mode
  if (process.env.NODE_ENV === "development") {
    // Check if running on localhost
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "::1"
      ) {
        // Use local API if available, otherwise fallback to production
        return (
          process.env.NEXT_PUBLIC_LOCAL_API_URL ||
          "http://localhost/graygold/api"
        );
      }
    }
  }

  // Default: Production API
  return "https://api.graygoldrealty.com";
};

export const API_URL = getApiUrl();

export const API_ENDPOINTS = {
  properties: `${API_URL}/controllers/properties.php`,
  inquiries: `${API_URL}/controllers/inquiries.php`,
  contacts: `${API_URL}/controllers/contact.php`,
  newsletter: `${API_URL}/controllers/newsletter.php`,
  upload: `${API_URL}/controllers/upload.php`,
  auth: `${API_URL}/controllers/auth.php`,
  sendInquiryEmail: `${API_URL}/controllers/send-inquiry-email.php`,
};

export const UPLOADS_URL = `${API_URL}/uploads/properties`;

// Log environment information
const environment = process.env.NODE_ENV || "production";
console.log(`[API Config] Environment: ${environment}`);
console.log("[API Config] Using API_URL:", API_URL);
console.log("[API Config] Endpoints:", API_ENDPOINTS);

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("gg_token") : null;

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Only set Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  console.log(`[FETCH] ${options.method || "GET"} ${endpoint}`);

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    console.log(`[FETCH] Response: ${response.status} ${response.statusText}`);

    return response;
  } catch (error) {
    console.error(`[FETCH] Error:`, error.message);
    throw error;
  }
};
