import ListingsClient from "./ListingsClient";

export const metadata = {
  title: "Property Listings",
  description:
    "Browse ready-to-move-in and off-plan luxury properties for sale across Lagos and Nigeria's most prestigious addresses with Gray Gold Investment Limited.",
  alternates: {
    canonical: "/listing",
  },
  openGraph: {
    title: "Property Listings | Gray Gold Investment Limited",
    description:
      "Browse ready-to-move-in and off-plan luxury properties for sale across Lagos and Nigeria's most prestigious addresses.",
    url: "/listing",
    images: [
      {
        url: "/grayGoldLogo.png",
        width: 800,
        height: 800,
        alt: "Gray Gold Investment Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Listings | Gray Gold Investment Limited",
    description:
      "Browse ready-to-move-in and off-plan luxury properties for sale across Lagos and Nigeria's most prestigious addresses.",
    images: ["/grayGoldLogo.png"],
  },
};

export default function ListingPage() {
  return <ListingsClient />;
}
