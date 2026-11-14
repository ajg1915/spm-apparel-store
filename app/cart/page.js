"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Shell from "@/components/Shell";
import ProductArt from "@/components/ProductArt";
import { useCart } from "@/components/Cart";
import { money } from "@/lib/products";

const PAYPAL_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

function PayPalButtons({ total, items, onPaid }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!PAYPAL_ID || !ref.current) return;
    const render = () => {
      ref.current.innerHTML = "";
      window.paypal.Buttons({
        style: { layout: "vertical", shape: "pill" },
        createOrder: (_, actions) => actions.order.create({
          purchase_units: [{
            description: "SPM Apparel order",
            amount: { currency_code: "USD", value: total.toFixed(2) },
          }],
        }),
        onApprove: async (_, actions) => { await actions.order.capture(); onPaid(); },
      }).render(ref.current);
    };
    if (window.paypal) return render();
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_ID}&currency=USD`;
    s.onload = render;
    document.body.appendChild(s);
  }, [total, items, onPaid]);

  if (!PAYPAL_ID) return <p className="note">PayPal checkout turns on once your PayPal Client ID is added in Vercel.</p>;
  return <div ref={ref} />;
}

export default function Cart() {
  const { items, setQty, total, clear } = useCart();
  const [paid, setPaid] = useState(false);

  if (paid) return (
    <Shell><div className="empty"><h2>Thank you! 🎉</h2><p>Your order is in. You'll get a PayPal receipt by email.</p><Link href="/shop" className="btn">Keep shopping</Link></div></Shell>
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
              <ProductArt cat={i.cat} color={i.color} size={64} />
              <div className="info"><b>{i.name}</b><small>Size {i.size}</small><div>{money(i.price * i.qty)}</div></div>
              <div className="qty">
                <button onClick={() => setQty(i.key, i.qty - 1)}>−</button><span>{i.qty}</span><button onClick={() => setQty(i.key, i.qty + 1)}>+</button>
              </div>
            </div>
          ))}
          <div className="totals"><span>Total</span><span>{money(total)}</span></div>
          <PayPalButtons total={total} items={items} onPaid={() => { clear(); setPaid(true); }} />
        </>
      )}
    </Shell>
  );
}
