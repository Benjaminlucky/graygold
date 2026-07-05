import FaqClient from "./FaqClient";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about buying, payment, legal process, property management, and investment with Gray Gold Investment Limited.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQs | Gray Gold Investment Limited",
    description:
      "Answers to common questions about buying, payment, legal process, property management, and investment.",
    url: "/faq",
  },
  twitter: {
    title: "FAQs | Gray Gold Investment Limited",
    description:
      "Answers to common questions about buying, payment, legal process, property management, and investment.",
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
