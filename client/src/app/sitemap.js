const SITE_URL = "https://graygoldrealty.com";
const API_BASE_URL = "https://api.graygoldrealty.com";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/listing", priority: 0.9, changeFrequency: "daily" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/inquiry", priority: 0.6, changeFrequency: "monthly" },
];

async function fetchPropertyEntries() {
  try {
    const res = await fetch(
      `${API_BASE_URL}/controllers/properties.php?limit=1000`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];

    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    return json.data.map((property) => ({
      url: `${SITE_URL}/listing/${property.id}`,
      lastModified: property.updated_at || property.created_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    console.error("[sitemap] Failed to fetch properties:", err.message);
    return [];
  }
}

export default async function sitemap() {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const propertyEntries = await fetchPropertyEntries();

  return [...staticEntries, ...propertyEntries];
}
