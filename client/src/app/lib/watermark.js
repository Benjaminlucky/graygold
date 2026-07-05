// lib/watermark.js

/**
 * Routes a real (remote) property photo through the on-the-fly watermark
 * proxy at /api/watermark. Local placeholder assets are left untouched.
 */
export function getWatermarkedUrl(originalUrl) {
  if (!originalUrl || typeof originalUrl !== "string") return originalUrl;
  if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
    return originalUrl;
  }
  // Deliberately NOT under /api/* — netlify.toml force-redirects that whole
  // path to the external PHP backend, which would swallow this route.
  return `/watermark?src=${encodeURIComponent(originalUrl)}`;
}
