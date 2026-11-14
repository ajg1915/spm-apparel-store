import { NextResponse } from "next/server";
import { captureOrder, paypalConfigured, priceItems } from "@/lib/paypal";

// Optional order email with the customer's designs attached.
// Needs RESEND_API_KEY, ORDER_EMAIL_TO (your inbox) and ORDER_EMAIL_FROM (a sender on a domain verified in Resend).
async function emailOrder(capture, items) {
  const key = process.env.RESEND_API_KEY, to = process.env.ORDER_EMAIL_TO, from = process.env.ORDER_EMAIL_FROM;
  if (!key || !to || !from) return false;
  const pu = capture.purchase_units?.[0] || {};
  const ship = pu.shipping || {};
  const addr = ship.address ? [ship.address.address_line_1, ship.address.address_line_2, `${ship.address.admin_area_2 || ""}, ${ship.address.admin_area_1 || ""} ${ship.address.postal_code || ""}`].filter(Boolean).join("<br>") : "—";
  const paid = pu.payments?.captures?.[0]?.amount?.value;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const { lines } = priceItems(items);
  const attachments = [];
  const rows = items.map((i, n) => {
    const d = i.design || {};
    if (d.preview?.startsWith("data:image/")) attachments.push({ filename: `item${n + 1}-mockup.jpg`, content: d.preview.split(",")[1] });
    if (d.art?.startsWith("data:image/")) attachments.push({ filename: `item${n + 1}-artwork.png`, content: d.art.split(",")[1] });
    return `<tr><td>${esc(lines[n].quantity)} × ${esc(lines[n].name)}</td><td>${esc(lines[n].description)}</td><td>${d.text ? `Text: “${esc(d.text)}”` : ""}${d.art ? " + logo (attached)" : ""}</td></tr>`;
  }).join("");
  const html = `<h2>New SPM Shop order</h2>
    <p><b>PayPal order:</b> ${esc(capture.id)}<br><b>Paid:</b> $${esc(paid)}<br>
    <b>Customer:</b> ${esc(capture.payer?.name?.given_name)} ${esc(capture.payer?.name?.surname)} (${esc(capture.payer?.email_address)})</p>
    <p><b>Ship to:</b> ${esc(ship.name?.full_name)}<br>${addr}</p>
    <table border="1" cellpadding="6" style="border-collapse:collapse">${rows}</table>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject: `New order ${capture.id} — $${paid}`, html, attachments }),
  });
  return r.ok;
}

export async function POST(req) {
  if (!paypalConfigured()) return NextResponse.json({ error: "Checkout is not set up yet." }, { status: 503 });
  try {
    const { orderID, items } = await req.json();
    const capture = await captureOrder(orderID);
    if (capture.status !== "COMPLETED") return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    let emailed = false;
    try { emailed = await emailOrder(capture, items || []); } catch {}
    return NextResponse.json({ ok: true, id: capture.id, emailed });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Payment failed" }, { status: 400 });
  }
}
