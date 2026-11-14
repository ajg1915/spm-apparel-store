export default function manifest() {
  return {
    name: "SPM Apparel",
    short_name: "SPM Apparel",
    description: "Sports tees, hoodies, hats, gloves, jackets and custom prints.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b1f44",
    theme_color: "#0b1f44",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
