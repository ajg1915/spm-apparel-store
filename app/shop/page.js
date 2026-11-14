import Link from "next/link";
import Shell from "@/components/Shell";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default async function Shop({ searchParams }) {
  const { cat, q } = await searchParams;
  const term = (q || "").trim().toLowerCase();
  let list = cat ? PRODUCTS.filter((p) => p.cat === cat) : PRODUCTS;
  if (term) list = list.filter((p) => `${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(term.replace(/s$/, "")));
  return (
    <Shell>
      <h2>{term ? `Results for “${q}”` : "Shop"}</h2>
      <div className="chips">
        <Link href="/shop" className={`chip ${!cat ? "on" : ""}`}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={`/shop?cat=${c.id}`} className={`chip ${cat === c.id ? "on" : ""}`}>{c.name}</Link>
        ))}
      </div>
      <div className="grid" style={{ marginTop: 16 }}>{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      {list.length === 0 && <p className="empty">No matches. Try “tee”, “hoodie” or “hat”.</p>}
    </Shell>
  );
}
