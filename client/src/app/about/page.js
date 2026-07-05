import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Gray Gold Investment Limited — Nigeria's premier gateway to luxury real estate, bridging architectural excellence and generational wealth in Lagos and beyond.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Gray Gold Investment Limited",
    description:
      "Nigeria's premier gateway to luxury real estate — transparency, excellence, and generational wealth creation.",
    url: "/about",
  },
  twitter: {
    title: "About Gray Gold Investment Limited",
    description:
      "Nigeria's premier gateway to luxury real estate — transparency, excellence, and generational wealth creation.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
