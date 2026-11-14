// Starter catalog — swap names, prices and photos for your real stock.
export const CATEGORIES = [
  { id: "tees", name: "Tees", color: "#1d4ed8" },
  { id: "hoodies", name: "Hoodies", color: "#b91c1c" },
  { id: "hats", name: "Hats", color: "#0f766e" },
  { id: "gloves", name: "Gloves", color: "#7c3aed" },
  { id: "jackets", name: "Jackets", color: "#c2410c" },
];

export const PRODUCTS = [
  { id: "classic-tee", cat: "tees", name: "Classic Game Day Tee", price: 24.99, colors: ["#0b1f44", "#ffffff", "#c8102e"], sizes: ["S", "M", "L", "XL", "2XL"], desc: "Soft ringspun cotton tee, printed in-house with DTF for bright, durable color." },
  { id: "vintage-tee", cat: "tees", name: "Vintage Wash Tee", price: 27.99, colors: ["#4b5563", "#1e3a8a"], sizes: ["S", "M", "L", "XL", "2XL"], desc: "Garment-dyed for a broken-in feel from day one." },
  { id: "pullover-hoodie", cat: "hoodies", name: "Pullover Hoodie", price: 44.99, colors: ["#0b1f44", "#111827", "#9ca3af"], sizes: ["S", "M", "L", "XL", "2XL", "3XL"], desc: "Heavyweight fleece with a lined hood and front pouch." },
  { id: "zip-hoodie", cat: "hoodies", name: "Full-Zip Hoodie", price: 49.99, colors: ["#c8102e", "#111827"], sizes: ["S", "M", "L", "XL", "2XL"], desc: "Full-zip fleece, perfect for cold nights at the park." },
  { id: "snapback", cat: "hats", name: "Structured Snapback", price: 26.99, colors: ["#0b1f44", "#111827"], sizes: ["One Size"], desc: "Flat brim, adjustable snap closure." },
  { id: "dad-hat", cat: "hats", name: "Dad Hat", price: 22.99, colors: ["#f5f5f4", "#1e3a8a", "#065f46"], sizes: ["One Size"], desc: "Unstructured cotton cap with curved brim." },
  { id: "batting-gloves", cat: "gloves", name: "Batting Gloves", price: 29.99, colors: ["#111827", "#ffffff"], sizes: ["YS", "YM", "S", "M", "L", "XL"], desc: "Grippy palm, breathable back, adjustable wrist." },
  { id: "winter-gloves", cat: "gloves", name: "Fan Winter Gloves", price: 19.99, colors: ["#0b1f44", "#c2410c"], sizes: ["S/M", "L/XL"], desc: "Knit gloves with touchscreen fingertips." },
  { id: "dugout-jacket", cat: "jackets", name: "Dugout Jacket", price: 79.99, colors: ["#0b1f44", "#111827"], sizes: ["S", "M", "L", "XL", "2XL"], desc: "Water-resistant shell with quilted lining." },
  { id: "varsity-jacket", cat: "jackets", name: "Varsity Jacket", price: 99.99, colors: ["#c8102e", "#0b1f44"], sizes: ["S", "M", "L", "XL", "2XL"], desc: "Classic snap-front varsity with ribbed trim." },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const money = (n) => `$${n.toFixed(2)}`;
