"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://api.graygoldrealty.com";

/**
 * Transforms a raw DB property row into the shape the UI components expect.
 * Now includes youtube_video field for property tours.
 */
function normalizeProperty(raw) {
  return {
    id: raw.id,
    title: raw.title ?? "",
    location: raw.location ?? "",
    city: raw.city ?? "",
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
    youtube_video: raw.youtube_video ?? null, // ✅ YouTube video ID
    badges: Array.isArray(raw.tags)
      ? raw.tags
      : typeof raw.tags === "string"
        ? JSON.parse(raw.tags)
        : [],
    images:
      Array.isArray(raw.images) && raw.images.length > 0
        ? raw.images.map((filename) =>
            filename.startsWith("http")
              ? filename
              : `${API_BASE_URL}/uploads/properties/${filename}`,
          )
        : ["/propertiesImages/property.jpeg"],
  };
}

/**
 * useFeaturedProperties
 *
 * Fetches featured properties from the PHP REST API.
 * Now includes youtube_video field for property tours.
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

/**
 * useProperty
 *
 * Fetches a single property by ID from the PHP REST API.
 * Ideal for individual property detail pages.
 *
 * @param {number|string} propertyId - The ID of the property to fetch
 */
export function useProperty(propertyId) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperty = useCallback(async () => {
    if (!propertyId) {
      setError("Property ID is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/controllers/properties.php?id=${propertyId}`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
      );

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to load property.");
      }

      if (!json.data || json.data.length === 0) {
        throw new Error("Property not found");
      }

      setProperty(normalizeProperty(json.data[0]));
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId, fetchProperty]);

  return { property, loading, error, refetch: fetchProperty };
}

/**
 * useListings
 *
 * Fetches properties from the PHP REST API with support for
 * category filtering, search, pagination, and sorting.
 *
 * @param {object} options
 * @param {string} options.category   - "all" | "off-plan" | "ready"
 * @param {string} options.status     - "available" | "sold" | "reserved" | ""
 * @param {string} options.search     - free-text search (client-side)
 * @param {number} options.page       - current page (1-based)
 * @param {number} options.perPage    - items per page
 * @param {string} options.sortBy     - "newest" | "price_asc" | "price_desc"
 */
export function useListings({
  category = "all",
  status = "",
  search = "",
  page = 1,
  perPage = 6,
  sortBy = "newest",
} = {}) {
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ limit: "100" });
      if (category && category !== "all") params.set("category", category);
      if (status) params.set("status", status);

      const res = await fetch(
        `${API_BASE_URL}/controllers/properties.php?${params.toString()}`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
      );

      if (!res.ok) {
        throw new Error(`Server error ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to load listings.");
      }

      setAllListings((json.data ?? []).map(normalizeProperty));
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [category, status]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // ── Client-side search ─────────────────────────────────────────────────────
  const searched = allListings.filter((l) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q) ||
      l.type.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q)
    );
  });

  // ── Client-side sort ───────────────────────────────────────────────────────
  const sorted = [...searched].sort((a, b) => {
    if (sortBy === "price_asc")
      return (
        (Number(a.price.replace(/\D/g, "")) || 0) -
        (Number(b.price.replace(/\D/g, "")) || 0)
      );
    if (sortBy === "price_desc")
      return (
        (Number(b.price.replace(/\D/g, "")) || 0) -
        (Number(a.price.replace(/\D/g, "")) || 0)
      );
    return 0; // "newest" — API already returns ORDER BY created_at DESC
  });

  // ── Client-side pagination ─────────────────────────────────────────────────
  const totalCount = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice((safePage - 1) * perPage, safePage * perPage);

  return {
    listings: paginated,
    totalCount,
    totalPages,
    loading,
    error,
    refetch: fetchListings,
  };
}
