import { Poppins } from "next/font/google";
import "./globals.css";
import HeaderPremium from "./component/Header";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";
import WhatsAppButton from "./component/WhatsAppButton";

// Poppins - Best Gilroy alternative on Google Fonts
// Geometric, modern, clean with all weights
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const SITE_NAME = "Gray Gold Investment Limited";
const SITE_DESCRIPTION =
  "Where Architectural Excellence Meets Lasting Wealth. Discover premium ready-to-move-in and off-plan properties for sale in Lagos, Nigeria with Gray Gold Investment Limited.";
const SITE_URL = "https://graygoldrealty.com";
const DEFAULT_OG_IMAGE = "/grayGoldLogo.png";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Gray Gold Investment Limited",
    "Lagos real estate",
    "properties for sale in Lagos",
    "off-plan properties Nigeria",
    "luxury homes Lagos",
    "Gray Gold Realty",
  ],
  openGraph: {
    title: SITE_NAME,
    description: "Where Architectural Excellence Meets Lasting Wealth",
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 800,
        height: 800,
        alt: SITE_NAME,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Where Architectural Excellence Meets Lasting Wealth",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  email: "info@graygoldrealty.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite A12, Princess and Angel Mall, Eti-Osa",
    addressLocality: "Sangotedo",
    addressRegion: "Lagos",
    postalCode: "106104",
    addressCountry: "NG",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <HeaderPremium />
        <main className="pt-20 lg:pt-28">{children}</main>
        <Footer />
        {/* Floating Action Buttons - Stack vertically */}
        <WhatsAppButton /> {/* Bottom position (above scroll button) */}
        <ScrollToTop /> {/* Top position */}
      </body>
    </html>
  );
}
