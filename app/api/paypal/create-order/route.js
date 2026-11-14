import { NextResponse } from "next/server";
import { createOrder, paypalConfigured } from "@/lib/paypal";

export async function POST(req) {
  if (!paypalConfigured()) return NextResponse.json({ error: "Checkout is not set up yet." }, { status: 503 });
  try {
    const { items } = await req.json();
    const id = await createOrder(items);
    return NextResponse.json({ id });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Could not start checkout" }, { status: 400 });
  }
}
