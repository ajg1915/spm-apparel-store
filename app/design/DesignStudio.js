"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductArt from "@/components/ProductArt";
import { useCart } from "@/components/Cart";
import { PRODUCTS, getProduct, colorName, money } from "@/lib/products";

// Printable area per item type, in the 160x160 drawing space of ProductArt.
const AREA = {
  tees: { x: 50, y: 42, w: 60, h: 78 },
  hoodies: { x: 52, y: 50, w: 56, h: 58 },
  jackets: { x: 50, y: 44, w: 60, h: 74 },
  hats: { x: 48, y: 52, w: 64, h: 38 },
  gloves: { x: 60, y: 74, w: 46, h: 44 },
};
const FONTS = [
  { id: "block", label: "Block", css: "900 1em system-ui, sans-serif" },
  { id: "script", label: "Script", css: "italic 700 1em Georgia, serif" },
  { id: "varsity", label: "Varsity", css: "800 1em 'Arial Black', Impact, sans-serif" },
];
// Which sides can be printed for each item type.
const SIDES = { tees: ["Front", "Back"], hoodies: ["Front", "Back"], jackets: ["Front", "Back"], hats: ["Front", "Back"], gloves: ["Front"] };
const VIEW = 300; // on-screen mockup size in px
const S = VIEW / 160;

async function loadImage(src) {
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
}

// Shrink an uploaded image so it fits in the cart (keeps transparency).
async function shrink(file, max = 1200) {
  const url = await new Promise((r) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(file); });
  const img = await loadImage(url);
  const k = Math.min(1, max / Math.max(img.width, img.height));
  const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  return { src: c.toDataURL("image/png"), ratio: img.height / img.width };
}

// `product` set = embedded on that product's own page (no product switcher, design optional).
export default function DesignStudio({ product = null }) {
  const params = useSearchParams();
  const router = useRouter();
  const { add } = useCart();
  const embedded = !!product;
  const start = product || getProduct(params.get("p")) || PRODUCTS[0];
  const [p, setP] = useState(start);
  const [color, setColor] = useState(params.get("c") && start.colors.includes(params.get("c")) ? params.get("c") : start.colors[0]);
  const [size, setSize] = useState(start.sizes.length === 1 ? start.sizes[0] : "");
  const [qty, setQty] = useState(1);
  // Front and back each keep their own artwork and text.
  const [side, setSide] = useState("Front");
  const blankText = { value: "", color: "#ffffff", font: "block", x: 0.5, y: 0.8, size: 0.16 };
  const [sides, setSides] = useState({ Front: { art: null, text: blankText }, Back: { art: null, text: { ...blankText, y: 0.5 } } });
  const art = sides[side].art; // {src, ratio, x, y, w}
  const text = sides[side].text;
  const setArt = (v) => setSides((all) => ({ ...all, [side]: { ...all[side], art: typeof v === "function" ? v(all[side].art) : v } }));
  const setText = (v) => setSides((all) => ({ ...all, [side]: { ...all[side], text: typeof v === "function" ? v(all[side].text) : v } }));
  const hasDesign = (sd) => !!(sides[sd].art || sides[sd].text.value.trim());
  const sideList = SIDES[p.cat] || ["Front"];
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const stage = useRef(null);
  const drag = useRef(null);

  const area = AREA[p.cat];
  const box = { left: area.x * S, top: area.y * S, width: area.w * S, height: area.h * S };

  useEffect(() => {
    setColor((c) => (p.colors.includes(c) ? c : p.colors[0]));
    setSize(p.sizes.length === 1 ? p.sizes[0] : "");
    if (!(SIDES[p.cat] || ["Front"]).includes(side)) setSide("Front");
  }, [p]);

  useEffect(() => {
    // pick a readable default text color for the shirt
    const light = ["#ffffff", "#e7e2d6", "#c8b98f", "#9ca3af"].includes(color);
    const c = light ? "#0a3161" : "#ffffff";
    setSides((all) => ({ Front: { ...all.Front, text: { ...all.Front.text, color: c } }, Back: { ...all.Back, text: { ...all.Back.text, color: c } } }));
  }, [color]);

  const onUpload = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/^image\//.test(f.type)) return setErr("Please choose an image file (PNG or JPG).");
    setErr("");
    const { src, ratio } = await shrink(f);
    setArt({ src, ratio, x: 0.5, y: 0.4, w: 0.8 });
    e.target.value = ""; // lets the same file be picked again for the other side
  };

  // Drag inside the print area. Positions are stored as 0..1 of the area.
  const startDrag = (what) => (e) => {
    e.preventDefault();
    drag.current = { what, rect: stage.current.getBoundingClientRect() };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const { rect, what } = drag.current;
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left - box.left) / box.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top - box.top) / box.height));
    if (what === "art") setArt((a) => ({ ...a, x, y }));
    else setText((t) => ({ ...t, x, y }));
  };
  const endDrag = () => { drag.current = null; };

  // Render the finished mockup to a small image for the cart and order email.
  const renderPreview = async (sd) => {
    const { art, text } = sides[sd];
    const svg = stage.current.querySelector("svg");
    const xml = new XMLSerializer().serializeToString(svg);
    const base = await loadImage("data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml));
    const N = 480, k = N / VIEW;
    const c = document.createElement("canvas"); c.width = N; c.height = N;
    const g = c.getContext("2d");
    g.fillStyle = "#eef1f6"; g.fillRect(0, 0, N, N);
    g.drawImage(base, 0, 0, N, N);
    if (art) {
      const img = await loadImage(art.src);
      const w = art.w * box.width * k, h = w * art.ratio;
      g.drawImage(img, (box.left + art.x * box.width) * k - w / 2, (box.top + art.y * box.height) * k - h / 2, w, h);
    }
    if (text.value.trim()) {
      const f = FONTS.find((x) => x.id === text.font);
      g.font = f.css.replace("1em", `${Math.round(text.size * box.height * k)}px`);
      g.fillStyle = text.color; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText(text.value, (box.left + text.x * box.width) * k, (box.top + text.y * box.height) * k, box.width * k);
    }
    g.fillStyle = "#0a3161"; g.font = "800 22px system-ui, sans-serif"; g.textAlign = "left"; g.textBaseline = "top";
    g.fillText(sd.toUpperCase(), 14, 12);
    return c.toDataURL("image/jpeg", 0.8);
  };

  const addToCart = async () => {
    if (!size) return setErr("Pick a size first.");
    const used = sideList.filter(hasDesign);
    if (!used.length) {
      if (!embedded) return setErr("Upload a logo or type some text first.");
      // No design on a product page = order the plain item.
      add({ id: p.id, name: p.name, cat: p.cat, price: p.price, color, colorLabel: colorName(p, color), size, qty });
      return router.push("/cart");
    }
    setBusy(true); setErr("");
    try {
      const saved = {};
      for (const sd of used) {
        const { art, text } = sides[sd];
        saved[sd.toLowerCase()] = { preview: await renderPreview(sd), art: art?.src || null, text: text.value.trim() || null, font: text.font, textColor: text.color };
      }
      const first = saved[used[0].toLowerCase()];
      add({
        id: p.id, name: p.name, cat: p.cat, price: p.price, color, colorLabel: colorName(p, color), size, qty,
        custom: true, uid: Date.now().toString(36),
        design: { ...first, front: saved.front || null, back: saved.back || null, placement: used.join(" & ") },
      });
      router.push("/cart");
    } catch {
      setErr("Couldn't save the design. Try a smaller image.");
      setBusy(false);
    }
  };

  const fontCss = FONTS.find((x) => x.id === text.font).css.replace("1em", `${text.size * box.height}px`);

  return (
    <div className={`studio${embedded ? " embedded" : ""}`}>
      {embedded ? (
        <div className="studio-head">
          <h1>{p.name}</h1>
          <div className="price">{money(p.price)}</div>
          <p className="note">{p.desc}</p>
        </div>
      ) : (
        <>
          <h2>Design yours</h2>
          <div className="chips">
            {PRODUCTS.map((x) => (
              <button key={x.id} className={`chip ${x.id === p.id ? "on" : ""}`} onClick={() => setP(x)}>{x.name}</button>
            ))}
          </div>
        </>
      )}

      <div className="stage-wrap">
        <div className="stage" ref={stage} style={{ width: VIEW, height: VIEW }} onPointerMove={onMove} onPointerUp={endDrag} onPointerLeave={endDrag}>
          <ProductArt cat={p.cat} color={color} size={VIEW} plain />
          <span className="side-tag">{side}</span>
          <div className="print-area" style={box}>
            {art && (
              <img src={art.src} alt="Your logo" draggable={false} onPointerDown={startDrag("art")}
                style={{ width: art.w * box.width, left: art.x * box.width, top: art.y * box.height }} className="layer" />
            )}
            {text.value && (
              <div onPointerDown={startDrag("text")} className="layer txt-layer"
                style={{ left: text.x * box.width, top: text.y * box.height, color: text.color, font: fontCss, maxWidth: box.width }}>
                {text.value}
              </div>
            )}
            {!art && !text.value && <span className="area-hint">Print area</span>}
          </div>
        </div>
        {sideList.length > 1 && <div className="seg">
          {sideList.map((pl) => (
            <button key={pl} className={side === pl ? "on" : ""} onClick={() => setSide(pl)}>
              {pl}{hasDesign(pl) ? " ✓" : ""}
            </button>
          ))}
        </div>}
      </div>

      <div className="panel">
        {embedded && <p className="tip">Add your own logo or text below, or skip it to order it plain.</p>}
        {sideList.length > 1 && <p className="tip">Designing the <b>{side.toLowerCase()}</b>. Switch to {side === "Front" ? "Back" : "Front"} above to add a different image there.</p>}
        <div className="label">1. {side} logo or artwork</div>
        <label className="upload">
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onUpload} />
          {art ? "Change image" : "Upload image (PNG with clear background works best)"}
        </label>
        {art && (
          <div className="row">
            <span>Size</span>
            <input type="range" min="0.2" max="1" step="0.01" value={art.w} onChange={(e) => setArt({ ...art, w: +e.target.value })} />
            <button className="link" onClick={() => setArt(null)}>Remove</button>
          </div>
        )}

        <div className="label">2. {side} text (optional)</div>
        <input className="text-in" maxLength={28} placeholder="Team name, number, slogan…" value={text.value} onChange={(e) => setText({ ...text, value: e.target.value })} />
        {text.value && (
          <>
            <div className="row">
              {FONTS.map((f) => (
                <button key={f.id} className={`chip ${text.font === f.id ? "on" : ""}`} style={{ font: f.css.replace("1em", "14px") }} onClick={() => setText({ ...text, font: f.id })}>{f.label}</button>
              ))}
            </div>
            <div className="row">
              <span>Color</span>
              {["#ffffff", "#111827", "#b31942", "#0a3161", "#d4af37"].map((c) => (
                <button key={c} aria-label={`Text color ${c}`} className={`swatch sm ${text.color === c ? "on" : ""}`} style={{ background: c }} onClick={() => setText({ ...text, color: c })} />
              ))}
            </div>
            <div className="row">
              <span>Size</span>
              <input type="range" min="0.08" max="0.35" step="0.01" value={text.size} onChange={(e) => setText({ ...text, size: +e.target.value })} />
            </div>
          </>
        )}
        <p className="tip">Tip: drag your logo or text to move it.</p>

        <div className="label">3. {p.name} color: {colorName(p, color)}</div>
        <div className="swatches">
          {p.colors.map((c, i) => (
            <button key={c} aria-label={p.colorNames[i]} className={`swatch ${c === color ? "on" : ""}`} style={{ background: c }} onClick={() => setColor(c)} />
          ))}
        </div>

        <div className="label">4. Size & quantity</div>
        <div className="sizes">
          {p.sizes.map((s) => (
            <button key={s} className={`size ${s === size ? "on" : ""}`} onClick={() => setSize(s)}>{s}</button>
          ))}
        </div>
        <div className="qty" style={{ marginTop: 10 }}>
          <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button>
        </div>
        {err && <p className="err">{err}</p>}
      </div>

      <div className="sticky-cta">
        <button className="btn block" disabled={busy} onClick={addToCart}>
          {busy ? "Saving your design…" : !size ? "Pick a size" : `Add to cart · ${money(p.price * qty)}`}
        </button>
      </div>
    </div>
  );
}
