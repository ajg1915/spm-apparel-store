// SPM catalog — real, widely stocked blank styles that take DTF prints well.
// Prices are retail with one SPM print included. Edit freely.
export const CATEGORIES = [
  { id: "tees", name: "Tees", color: "#1d4ed8" },
  { id: "hoodies", name: "Hoodies", color: "#b31942" },
  { id: "hats", name: "Hats", color: "#0f766e" },
  { id: "gloves", name: "Gloves", color: "#7c3aed" },
  { id: "jackets", name: "Jackets", color: "#c2410c" },
];

const C = {
  black: ["#111827", "Black"], navy: ["#0a3161", "Navy"], red: ["#b31942", "Red"], white: ["#ffffff", "White"],
  grey: ["#9ca3af", "Sport Grey"], royal: ["#1d4ed8", "Royal"], charcoal: ["#374151", "Charcoal"],
  forest: ["#14532d", "Forest Green"], khaki: ["#c8b98f", "Khaki"], stone: ["#e7e2d6", "Stone"],
};
const pick = (...keys) => ({ colors: keys.map((k) => C[k][0]), colorNames: keys.map((k) => C[k][1]) });

export const PRODUCTS = [
  { id: "heavy-cotton-tee", cat: "tees", name: "Classic Heavy Cotton Tee", blank: "Gildan 5000", price: 24.99, ...pick("black", "navy", "red", "white", "grey", "royal"), sizes: ["S", "M", "L", "XL", "2XL", "3XL"], desc: "5.3 oz 100% cotton classic-fit tee. Durable, prints bold, the go-to team shirt." },
  { id: "softstyle-tee", cat: "tees", name: "Soft Premium Tee", blank: "Gildan 64000 Softstyle", price: 27.99, ...pick("black", "navy", "red", "white", "charcoal"), sizes: ["XS", "S", "M", "L", "XL", "2XL"], desc: "Lighter, softer ring-spun cotton with a modern fit." },
  { id: "pullover-hoodie", cat: "hoodies", name: "Heavy Blend Pullover Hoodie", blank: "Gildan 18500", price: 44.99, ...pick("black", "navy", "red", "grey", "royal", "forest"), sizes: ["S", "M", "L", "XL", "2XL", "3XL"], desc: "8 oz 50/50 fleece with double-lined hood and front pouch." },
  { id: "zip-hoodie", cat: "hoodies", name: "Heavy Blend Full-Zip Hoodie", blank: "Gildan 18600", price: 54.99, ...pick("black", "navy", "red", "grey"), sizes: ["S", "M", "L", "XL", "2XL"], desc: "8 oz 50/50 full-zip fleece. Print left chest, back, or both." },
  { id: "trucker-hat", cat: "hats", name: "Snapback Trucker Hat", blank: "Richardson 112", price: 29.99, ...pick("black", "navy", "red", "charcoal", "khaki"), sizes: ["One Size"], desc: "Structured mid-profile front with mesh back and snap closure." },
  { id: "dad-hat", cat: "hats", name: "Dad Hat", blank: "Richardson 326-style twill", price: 27.99, ...pick("black", "navy", "stone", "red"), sizes: ["One Size"], desc: "Unstructured soft twill cap with curved brim and adjustable strap." },
  { id: "knit-gloves", cat: "gloves", name: "Touchscreen Knit Gloves", blank: "Acrylic knit gloves", price: 19.99, ...pick("black", "grey", "navy", "red"), sizes: ["One Size"], desc: "Warm acrylic knit with touchscreen fingertips. Logo on the back of the hand." },
  { id: "coach-jacket", cat: "jackets", name: "Coach's Jacket", blank: "Augusta 3100", price: 59.99, ...pick("black", "navy", "red", "royal", "forest"), sizes: ["S", "M", "L", "XL", "2XL"], desc: "Water-resistant nylon taffeta with brushed tricot lining and snap front." },
  { id: "satin-baseball-jacket", cat: "jackets", name: "Satin Baseball Jacket", blank: "Augusta 3610", price: 84.99, ...pick("black", "navy", "red", "royal"), sizes: ["S", "M", "L", "XL", "2XL"], desc: "Classic satin dugout jacket with striped rib trim. Big back print area." },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const colorName = (p, hex) => p.colorNames?.[p.colors.indexOf(hex)] || hex;
export const money = (n) => `$${n.toFixed(2)}`;
