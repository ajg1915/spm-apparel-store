"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductArt from "@/components/ProductArt";
import { useCart } from "@/components/Cart";
import Link from "next/link";
import { money, colorName } from "@/lib/products";

export default function ProductDetail({ p }) {
  const [color, setColor] = useState(p.colors[0]);
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const router = useRouter();

  const addToCart = () => {
    add({ id: p.id, name: p.name, cat: p.cat, price: p.price, color, colorLabel: colorName(p, color), size, qty });
    router.push("/cart");
  };

  return (
    <div className="pd">
      <div className="pd-img"><ProductArt cat={p.cat} color={color} size={240} /></div>
      <h1>{p.name}</h1>
      <div className="price">{money(p.price)}</div>
      <p className="note">{p.desc}</p>
      <Link href={`/design?p=${p.id}&c=${encodeURIComponent(color)}`} className="btn ghost block customize">★ Customize with your logo or text</Link>

      <div className="label">Color: {colorName(p, color)}</div>
      <div className="swatches">
        {p.colors.map((c) => (
          <button key={c} aria-label={colorName(p, c)} className={`swatch ${c === color ? "on" : ""}`} style={{ background: c }} onClick={() => setColor(c)} />
        ))}
      </div>

      <div className="label">Size</div>
      <div className="sizes">
        {p.sizes.map((s) => (
          <button key={s} className={`size ${s === size ? "on" : ""}`} onClick={() => setSize(s)}>{s}</button>
        ))}
      </div>

      <div className="label">Quantity</div>
      <div className="qty">
        <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
        <span>{qty}</span>
        <button onClick={() => setQty(qty + 1)}>+</button>
      </div>

      <div className="sticky-cta">
        <button className="btn block" disabled={!size} onClick={addToCart}>
          {size ? `Add to cart · ${money(p.price * qty)}` : "Pick a size"}
        </button>
      </div>
    </div>
  );
}
