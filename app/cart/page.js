"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Shell from "@/components/Shell";
import ProductArt from "@/components/ProductArt";
import { useCart } from "@/components/Cart";
import { money } from "@/lib/products";

const PAYPAL_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

// What the server needs to price the order (it ignores any price sent from here).
const forServer = (items) => items.map((i) => ({ id: i.id, size: i.size, color: i.color, qty: i.qty, custom: !!i.custom, placement: i.design?.placement }));

function PayPalButtons({ items, onPaid, onError }) {
  const ref = useRef(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const cb = useRef({ onPaid, onError });
  cb.current = { onPaid, onError };

  useEffect(() => {
    if (!PAYPAL_ID || !ref.current) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !ref.current) return;
      ref.current.innerHTML = "";
      window.paypal.Buttons({
        style: { layout: "vertical", shape: "pill", label: "pay" },
        createOrder: async () => {
          const r = await fetch("/api/paypal/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: forServer(itemsRef.current) }) });
          const d = await r.json();
          if (!r.ok) throw new Error(d.error || "Checkout failed");
          return d.id;
        },
        onApprove: async ({ orderID }) => {
          const full = itemsRef.current;
          const r = await fetch("/api/paypal/capture-order", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID, items: full.map((i, n) => ({ ...forServer(full)[n], design: i.design || null })) }),
          });
          const d = await r.json();
          if (!r.ok) return cb.current.onError(d.error || "Payment failed");
          cb.current.onPaid(d.id);
        },
        onError: () => cb.current.onError("PayPal had a problem. Please try again."),
      }).render(ref.current);
    };
    if (window.paypal) render();
    else {
      const s = document.createElement("script");
      s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_ID}&currency=USD&intent=capture`;
      s.onload = render;
      document.body.appendChild(s);
    }
    return () => { cancelled = true; };
  }, []);

  if (!PAYPAL_ID) return <p className="note">Checkout is coming soon. For now, tap “Get a quote” and we'll get back to you.</p>;
  return <div ref={ref} className="paypal-box" />;
}

export default function Cart() {
  const { items, setQty, total, clear } = useCart();
  const [paidId, setPaidId] = useState(null);
  const [error, setError] = useState("");
  const hasCustom = items.some((i) => i.custom);

  if (paidId) return (
    <Shell>
      <div className="thanks">
        <h2>Thank you! 🇺🇸</h2>
        <p>Your order <b>{paidId}</b> is in. PayPal will email your receipt.</p>
        <p>We'll print your gear and reach out if we have any questions about your design.</p>
        <Link href="/shop" className="btn">Keep shopping</Link>
      </div>
    </Shell>
  );

  return (
    <Shell>
      <h2>Your cart</h2>
      {items.length === 0 ? (
        <div className="empty"><p>Your cart is empty.</p><Link href="/shop" className="btn">Start shopping</Link></div>
      ) : (
        <>
          {items.map((i) => (
            <div key={i.key} className="line">
              {i.design?.preview ? <img src={i.design.preview} alt="" className="design-thumb" /> : <ProductArt cat={i.cat} color={i.color} size={64} />}
              <div className="info">
                <b>{i.name}</b>
                <small>{i.colorLabel ? `${i.colorLabel} · ` : ""}Size {i.size}{i.design ? ` · ${i.design.placement}` : ""}</small>
                {i.custom && <span className="tag-custom">Custom design</span>}
                <div>{money(i.price * i.qty)}</div>
              </div>
              <div className="qty">
                <button onClick={() => setQty(i.key, i.qty - 1)}>−</button><span>{i.qty}</span><button onClick={() => setQty(i.key, i.qty + 1)}>+</button>
              </div>
            </div>
          ))}
          <div className="totals"><span>Total</span><span>{money(total)}</span></div>
          {hasCustom && <p className="note">Custom items are printed to order. We'll contact you if your artwork needs a tweak before printing.</p>}
          {error && <p className="err">{error}</p>}
          <PayPalButtons items={items} onPaid={(id) => { clear(); setPaidId(id); }} onError={setError} />
        </>
      )}
    </Shell>
  );
}
