import "./globals.css";
import { CartProvider } from "@/components/Cart";

export const metadata = {
  title: "SPM Apparels — Custom Printing: Apparel, DTF Transfers, Cards, Banners & More",
  description: "Custom print shop: apparel, DTF transfers, business cards, flyers, banners, stickers, promo products and invitations, printed in the USA.",
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
