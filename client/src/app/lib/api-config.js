// lib/api-config.js
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.graygoldrealty.com";

export const API_ENDPOINTS = {
  properties: `${API_URL}/controllers/properties.php`,
  inquiries: `${API_URL}/controllers/inquiries.php`,
  contacts: `${API_URL}/controllers/contact.php`,
  newsletter: `${API_URL}/controllers/newsletter.php`,
  upload: `${API_URL}/controllers/upload.php`,
  auth: `${API_URL}/controllers/auth.php`,
};

export const UPLOADS_URL = `${API_URL}/uploads/properties`;

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("gg_token") : null;

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  return response;
};
