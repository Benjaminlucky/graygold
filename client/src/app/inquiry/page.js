import InquiryClient from "./InquiryClient";

export const metadata = {
  title: "Make an Inquiry",
  description:
    "Tell us what you're looking for and a Gray Gold Investment Limited advisor will match you with the right property in Lagos and beyond.",
  alternates: {
    canonical: "/inquiry",
  },
  openGraph: {
    title: "Make an Inquiry | Gray Gold Investment Limited",
    description:
      "Tell us what you're looking for and a dedicated advisor will match you with the right property.",
    url: "/inquiry",
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
    title: "Make an Inquiry | Gray Gold Investment Limited",
    description:
      "Tell us what you're looking for and a dedicated advisor will match you with the right property.",
    images: ["/grayGoldLogo.png"],
  },
};

export default function InquiryPage() {
  return <InquiryClient />;
}
