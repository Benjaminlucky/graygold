// lib/api-config.js

// Use production API since local backend isn't available
// For production, this stays the same
// For local development, we connect to the production API
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.graygoldrealty.com";

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
