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
    title: "FAQs | Gray Gold Investment Limited",
    description:
      "Answers to common questions about buying, payment, legal process, property management, and investment.",
    images: ["/grayGoldLogo.png"],
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
