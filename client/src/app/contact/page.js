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
  },
  twitter: {
    title: "Contact Gray Gold Investment Limited",
    description:
      "Get in touch with our team — call, email, or visit our Lagos office to speak with a dedicated real estate advisor.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
