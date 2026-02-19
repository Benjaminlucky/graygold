"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://api.graygoldrealty.com";

/**
 * Normalizes a raw DB property row into the shape the UI expects.
 */
function normalizeListing(raw) {
  return {
    id: raw.id,
    title: raw.title ?? "",
    location: raw.location ?? "",
    city: raw.city ?? "",
    price: raw.price
      ? `₦${Number(raw.price).toLocaleString("en-US")}`
      : "Price on Request",
    beds: raw.bedrooms ?? 0,
    baths: raw.bathrooms ?? 0,
    type: raw.property_type ?? "",
    category: raw.category ?? "ready",
    status: raw.status ?? "available",
    featured: Boolean(raw.featured),
    description: raw.description ?? "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    // Use first image as the card thumbnail; fall back to placeholder
    image:
      Array.isArray(raw.images) && raw.images.length > 0
        ? raw.images[0].startsWith("http")
          ? raw.images[0]
          : `${API_BASE_URL}/uploads/properties/${raw.images[0]}`
        : "/propertiesImages/property.jpeg",
    // Keep all images for detail views
    images:
      Array.isArray(raw.images) && raw.images.length > 0
        ? raw.images.map((f) =>
            f.startsWith("http")
              ? f
              : `${API_BASE_URL}/uploads/properties/${f}`,
          )
        : ["/propertiesImages/property.jpeg"],
  };
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
  const [allListings, setAllListings] = useState([]); // full unfiltered set
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch from API (re-runs only when category or status changes) ──────────
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

      setAllListings((json.data ?? []).map(normalizeListing));
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
