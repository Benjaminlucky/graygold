import { getWatermarkedUrl } from "../../lib/watermark";

const API_BASE_URL = "https://api.graygoldrealty.com";

/**
 * Normalizes a raw DB property row for the detail view.
 * Shared between the server page (metadata + initial render) and the
 * client component (interactive gallery/UI).
 */
export function normalizeProperty(raw) {
  return {
    id: raw.id,
    title: raw.title ?? "",
    location: raw.location ?? "",
    city: raw.city ?? "",
    price: raw.price
      ? `₦${Number(raw.price).toLocaleString("en-US")}`
      : "Price on Request",
    priceRaw: raw.price ?? 0,
    priceDisplay: raw.price_display ?? "",
    bedrooms: raw.bedrooms ?? 0,
    bathrooms: raw.bathrooms ?? 0,
    garage: raw.garage ?? 0,
    sqm: raw.sqm ?? "N/A",
    sqft: raw.sqft ?? "N/A",
    yearBuilt: raw.year_built ?? "N/A",
    propertyType: raw.property_type ?? "",
    category: raw.category ?? "ready",
    status: raw.status ?? "available",
    featured: Boolean(raw.featured),
    description: raw.description ?? "",
    youtubeVideo: raw.youtube_video ?? null,
    badges: Array.isArray(raw.tags)
      ? raw.tags
      : typeof raw.tags === "string"
        ? JSON.parse(raw.tags)
        : [],
    images:
      Array.isArray(raw.images) && raw.images.length > 0
        ? raw.images.map((filename) =>
            getWatermarkedUrl(
              filename.startsWith("http")
                ? filename
                : `${API_BASE_URL}/uploads/properties/${filename}`,
            ),
          )
        : ["/propertiesImages/property.jpeg"],
    createdAt: raw.created_at ?? "",
  };
}

export async function fetchProperty(id) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/controllers/properties.php?id=${id}`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success || !json.data || json.data.length === 0) return null;

    return normalizeProperty(json.data[0]);
  } catch (err) {
    console.error("Error fetching property:", err);
    return null;
  }
}
