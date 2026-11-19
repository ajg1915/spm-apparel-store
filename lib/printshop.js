// Print-shop categories and stock photos for the homepage.
// Photos are free-to-use Unsplash images (Unsplash License: commercial use OK, no credit required).
// Swap any `img` for your own product photo (e.g. "/products/tee.jpg" in /public) whenever you're ready.
const u = (id, w = 800) => `https://images.unsplash.com/${id}?w=${w}&q=70&auto=format&fit=crop`;

export const PHOTOS = {
  tee: u("photo-1785315532480-61f2fe427dd8"),
  hoodie: u("photo-1620799140188-3b2a02fd9a77"),
  dtf: u("photo-1663433567177-9f94be0bff4c", 1000),
  cards: u("photo-1623305465231-d884ce752d59"),
  marketing: u("photo-1503694978374-8a2fa686963a"),
  signs: u("photo-1690964099559-ac041f77d7b1"),
  stickers: u("photo-1589384267710-7a170981ca78"),
  promo: u("photo-1610219171722-87b3f4170557"),
  invites: u("photo-1566125882500-87e10f726cdc"),
};

// Apparel links into the real store; everything else goes to a quote request for now.
export const PRINT_CATEGORIES = [
  { id: "apparel", name: "Apparel", sub: "Tees, hoodies, hats, jackets", img: PHOTOS.tee, href: "/shop" },
  { id: "dtf", name: "DTF Transfers", sub: "Gang sheets & singles", img: PHOTOS.dtf, href: "/custom?item=DTF%20Transfers" },
  { id: "cards", name: "Business Cards", sub: "Standard, premium, magnets", img: PHOTOS.cards, href: "/custom?item=Business%20Cards" },
  { id: "marketing", name: "Marketing", sub: "Flyers, postcards, brochures", img: PHOTOS.marketing, href: "/custom?item=Marketing%20Materials" },
  { id: "signs", name: "Signs & Banners", sub: "Vinyl banners, yard signs", img: PHOTOS.signs, href: "/custom?item=Signs%20%26%20Banners" },
  { id: "stickers", name: "Stickers & Labels", sub: "Die-cut, sheets, rolls", img: PHOTOS.stickers, href: "/custom?item=Stickers%20%26%20Labels" },
  { id: "promo", name: "Promo Products", sub: "Mugs, bottles, pens", img: PHOTOS.promo, href: "/custom?item=Promo%20Products" },
  { id: "invites", name: "Invitations", sub: "Invites & stationery", img: PHOTOS.invites, href: "/custom?item=Invitations%20%26%20Stationery" },
];

export const QUOTE_ITEMS = [
  "Tees", "Hoodies", "Hats", "Jackets", "Gloves",
  "DTF Transfers", "Business Cards", "Marketing Materials", "Signs & Banners",
  "Stickers & Labels", "Promo Products", "Invitations & Stationery", "Mixed",
];
