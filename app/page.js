import Link from "next/link";
import Shell from "@/components/Shell";
import ProductArt from "@/components/ProductArt";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default function Home() {
  const featured = ["classic-tee", "pullover-hoodie", "snapback", "dugout-jacket"].map((id) => PRODUCTS.find((p) => p.id === id));
  return (
    <Shell>
      <section className="hero">
        <h1>Rep your team.<br />Wear your style.</h1>
        <p>Sports apparel and custom prints made in-house on Staten Island.</p>
        <Link href="/shop" className="btn light">Shop now</Link>{" "}
        <Link href="/custom" className="btn">Custom order</Link>
      </section>

      <h2>Shop by category</h2>
      <div className="cats">
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={`/shop?cat=${c.id}`} className="cat">
            <ProductArt cat={c.id} color={c.color} size={44} />
            {c.name}
          </Link>
        ))}
      </div>

      <h2>Best sellers</h2>
      <div className="grid">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </Shell>
  );
}
