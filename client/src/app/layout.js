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

export const metadata = {
  title: "Gray Gold Investment Limited",
  description: "Where Architectural Excellence Meets Lasting Wealth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
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
