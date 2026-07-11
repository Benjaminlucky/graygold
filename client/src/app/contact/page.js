import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Gray Gold Investment Limited. Call, email, or visit our Lagos office to speak with a dedicated real estate advisor.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Gray Gold Investment Limited",
    description:
      "Get in touch with our team — call, email, or visit our Lagos office to speak with a dedicated real estate advisor.",
    url: "/contact",
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
    title: "Contact Gray Gold Investment Limited",
    description:
      "Get in touch with our team — call, email, or visit our Lagos office to speak with a dedicated real estate advisor.",
    images: ["/grayGoldLogo.png"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
