import "./globals.css";
import { CartProvider } from "@/components/Cart";

export const metadata = {
  title: "SPM Apparel — Sports Tees, Hoodies, Hats & Custom Prints",
  description: "Shop sports tees, hoodies, hats, gloves and jackets, or get custom apparel printed in-house on Staten Island.",
  applicationName: "SPM Apparel",
  appleWebApp: { capable: true, title: "SPM Apparel", statusBarStyle: "black-translucent" },
  icons: { icon: "/icon-192.png", apple: "/apple-icon.png" },
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0a3161" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
