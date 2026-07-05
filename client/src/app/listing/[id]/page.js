import Link from "next/link";
import { fetchProperty } from "./normalize";
import PropertyDetailClient from "./PropertyDetailClient";

const SITE_URL = "https://graygoldrealty.com";

function buildDescription(property) {
  const cleaned = (property.description || "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned) return cleaned.slice(0, 160);

  return `${property.title} in ${property.location}, ${property.city}. ${property.price}.`;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await fetchProperty(id);

  if (!property) {
    return {
      title: "Property Not Found",
      description:
        "The property you're looking for doesn't exist or has been removed.",
    };
  }

  const description = buildDescription(property);
  const image = property.images?.[0];
  const url = `/listing/${id}`;

  return {
    title: property.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: property.title,
      description,
      url,
      type: "website",
      images: image
        ? [{ url: image, width: 1200, height: 800, alt: property.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary-900 mb-2">
            Property Not Found
          </h2>
          <p className="text-primary-400 mb-6">
            The property you're looking for doesn't exist or has been
            removed.
          </p>
          <Link
            href="/listings"
            className="px-6 py-3 bg-secondary-500 text-white font-bold rounded-xl hover:bg-secondary-600 transition-colors duration-300"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = await fetchProperty(id);

  if (!property) {
    return <PropertyNotFound />;
  }

  const description = buildDescription(property);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description,
    image: property.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: property.priceRaw || undefined,
      availability:
        property.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: `${SITE_URL}/listing/${id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient property={property} />
    </>
  );
}
