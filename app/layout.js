import "./globals.css";
import { CartProvider } from "@/components/Cart";

export const metadata = {
  title: "SPM Apparel — Sports Tees, Hoodies, Hats & Custom Prints",
  description: "Shop sports tees, hoodies, hats, gloves and jackets, or get custom apparel printed in-house on Staten Island.",
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0b1f44" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
