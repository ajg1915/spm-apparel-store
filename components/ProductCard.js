import Link from "next/link";
import ProductArt from "./ProductArt";
import { money } from "@/lib/products";

export default function ProductCard({ p }) {
  return (
    <Link href={`/product/${p.id}`} className="card">
      <div className="img"><ProductArt cat={p.cat} color={p.colors[0]} size={130} /></div>
      <div className="meta">
        <div className="name">{p.name}</div>
        <div className="price">{money(p.price)}</div>
      </div>
    </Link>
  );
}
