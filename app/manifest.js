export default function manifest() {
  return {
    name: "SPM Shop — Where Americans Go",
    short_name: "SPM Shop — Where Americans Go",
    description: "Sports tees, hoodies, hats, gloves, jackets and custom prints.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a3161",
    theme_color: "#0a3161",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
