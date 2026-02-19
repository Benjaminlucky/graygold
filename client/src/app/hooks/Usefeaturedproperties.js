"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://api.graygoldrealty.com";

/**
 * Transforms a raw DB property row into the shape the UI components expect.
 */
function normalizeProperty(raw) {
  return {
    id: raw.id,
    title: raw.title ?? "",
    location: raw.location ?? "",
    city: raw.city ?? "",
    // Always format from raw price → ₦340,000,000
    price: raw.price
      ? `₦${Number(raw.price).toLocaleString("en-US")}`
      : "Price on Request",
    priceAvailable: "Price Available Upon Request",
    bedrooms: raw.bedrooms ?? 0,
    bathrooms: raw.bathrooms ?? 0,
    garage: raw.garage ?? 0,
    sqm: raw.sqm ?? null,
    sqft: raw.sqft ?? null,
    yearBuilt: raw.year_built ?? null,
    type: raw.property_type ?? "",
    category: raw.category ?? "ready",
    status: raw.status ?? "available",
    featured: Boolean(raw.featured),
    description: raw.description ?? "",
    // tags come back as a JSON array from the backend
    badges: Array.isArray(raw.tags) ? raw.tags : [],
    // images come back as an array of filenames → build full URLs
    images:
      Array.isArray(raw.images) && raw.images.length > 0
        ? raw.images.map((filename) =>
            filename.startsWith("http")
              ? filename
              : `${API_BASE_URL}/uploads/properties/${filename}`,
          )
        : ["/propertiesImages/property.jpeg"], // sensible fallback
  };
}

/**
 * useFeaturedProperties
 *
 * Fetches featured properties from the PHP REST API.
 * Supports optional refresh via the returned `refetch` function.
 *
 * @param {object}  options
 * @param {number}  options.limit   - Max properties to fetch (default 10)
 * @param {string}  options.status  - Filter by status, e.g. "available"
 */
export function useFeaturedProperties({ limit = 10, status = "" } = {}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        featured: "1",
        limit: String(limit),
      });
      if (status) params.set("status", status);

      const res = await fetch(
        `${API_BASE_URL}/controllers/properties.php?${params.toString()}`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
      );

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to load properties.");
      }

      setProperties((json.data ?? []).map(normalizeProperty));
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [limit, status]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, error, refetch: fetchProperties };
}
