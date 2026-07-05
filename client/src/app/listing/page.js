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
  },
  twitter: {
    title: "Property Listings | Gray Gold Investment Limited",
    description:
      "Browse ready-to-move-in and off-plan luxury properties for sale across Lagos and Nigeria's most prestigious addresses.",
  },
};

export default function ListingPage() {
  return <ListingsClient />;
}
