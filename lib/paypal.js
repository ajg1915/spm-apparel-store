// Server-only PayPal helpers. Needs these Vercel environment variables:
//   PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_ENV ("live" or "sandbox")
import { getProduct } from "./products";

const BASE = () => (process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com");

export function paypalConfigured() {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

async function token() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64");
  const r = await fetch(`${BASE()}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!r.ok) throw new Error("PayPal auth failed");
  return (await r.json()).access_token;
}

// Rebuild the order from the catalog so prices can't be changed in the browser.
export function priceItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) throw new Error("Cart is empty");
  const lines = items.map((i) => {
    const p = getProduct(i.id);
    const qty = Math.floor(Number(i.qty));
    if (!p || !(qty >= 1 && qty <= 500)) throw new Error("Invalid item");
    if (!p.sizes.includes(i.size) || !p.colors.includes(i.color)) throw new Error("Invalid option");
    const label = p.colorNames[p.colors.indexOf(i.color)];
    return {
      name: `${p.name}${i.custom ? " (custom design)" : ""}`.slice(0, 127),
      description: `${label} / ${i.size}${i.custom && i.placement ? ` / ${i.placement} print` : ""}`.slice(0, 127),
      sku: p.id.slice(0, 127),
      quantity: String(qty),
      unit_amount: { currency_code: "USD", value: p.price.toFixed(2) },
      category: "PHYSICAL_GOODS",
    };
  });
  const total = lines.reduce((s, l) => s + Number(l.unit_amount.value) * Number(l.quantity), 0);
  return { lines, total: total.toFixed(2) };
}

export async function createOrder(items) {
  const { lines, total } = priceItems(items);
  const r = await fetch(`${BASE()}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        description: "SPM Shop order",
        amount: { currency_code: "USD", value: total, breakdown: { item_total: { currency_code: "USD", value: total } } },
        items: lines,
      }],
      application_context: { brand_name: "SPM Shop", shipping_preference: "GET_FROM_FILE", user_action: "PAY_NOW" },
    }),
    cache: "no-store",
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.message || "Could not create order");
  return data.id;
}

export async function captureOrder(orderID) {
  if (!/^[A-Z0-9]{5,40}$/.test(orderID || "")) throw new Error("Bad order id");
  const r = await fetch(`${BASE()}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.message || "Could not capture payment");
  return data;
}
