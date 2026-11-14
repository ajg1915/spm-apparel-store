import Link from "next/link";
import Shell from "@/components/Shell";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default async function Shop({ searchParams }) {
  const { cat } = await searchParams;
  const list = cat ? PRODUCTS.filter((p) => p.cat === cat) : PRODUCTS;
  return (
    <Shell>
      <h2>Shop</h2>
      <div className="chips">
        <Link href="/shop" className={`chip ${!cat ? "on" : ""}`}>All</Link>
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={`/shop?cat=${c.id}`} className={`chip ${cat === c.id ? "on" : ""}`}>{c.name}</Link>
        ))}
      </div>
      <div className="grid" style={{ marginTop: 16 }}>{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </Shell>
  );
}
