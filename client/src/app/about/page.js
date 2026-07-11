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
    title: "About Gray Gold Investment Limited",
    description:
      "Nigeria's premier gateway to luxury real estate — transparency, excellence, and generational wealth creation.",
    images: ["/grayGoldLogo.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
