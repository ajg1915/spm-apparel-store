"use client";
import { useState, useEffect } from "react";
import Shell from "@/components/Shell";
import { QUOTE_ITEMS } from "@/lib/printshop";

const SHOP_EMAIL = process.env.NEXT_PUBLIC_SHOP_EMAIL || "orders@spmapparels.store";

export default function Custom() {
  const [f, setF] = useState({ name: "", phone: "", item: "Tees", qty: "12", details: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  // Pre-select the item when coming from a homepage category (/custom?item=...)
  useEffect(() => {
    const item = new URLSearchParams(window.location.search).get("item");
    if (item && QUOTE_ITEMS.includes(item)) setF((cur) => ({ ...cur, item }));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const body = `Name: ${f.name}\nPhone/Email: ${f.phone}\nItem: ${f.item}\nQuantity: ${f.qty}\n\nDetails:\n${f.details}`;
    window.location.href = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent("Custom quote request")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Shell>
      <h2>Custom printing</h2>
      <div className="steps">
        <div className="step"><b>1</b>Tell us what you need</div>
        <div className="step"><b>2</b>We send a quote + mockup</div>
        <div className="step"><b>3</b>We print it and you pick up or ship</div>
      </div>
      <form onSubmit={submit}>
        <div className="field"><label>Name</label><input required value={f.name} onChange={set("name")} /></div>
        <div className="field"><label>Phone or email</label><input required value={f.phone} onChange={set("phone")} /></div>
        <div className="field"><label>Item</label>
          <select value={f.item} onChange={set("item")}>{QUOTE_ITEMS.map((o) => <option key={o}>{o}</option>)}</select>
        </div>
        <div className="field"><label>Quantity</label><input type="number" min="1" inputMode="numeric" value={f.qty} onChange={set("qty")} /></div>
        <div className="field"><label>Design details</label><textarea placeholder="Team name, colors, logo, sizes, due date…" value={f.details} onChange={set("details")} /></div>
        <button className="btn block">Request a quote</button>
        <p className="note">Have artwork? Attach it to the email that opens.</p>
      </form>
    </Shell>
  );
}
