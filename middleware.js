import { NextResponse } from "next/server";

// Phones + tablets get the store. Computers get the QR page at /desktop.
const MOBILE = /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle|BlackBerry|Opera Mini|IEMobile|webOS|Tablet/i;
// Let search engines and link-preview bots through so Google/socials can still read the store.
const BOT = /bot|crawler|spider|slurp|facebookexternalhit|Twitterbot|WhatsApp|Pinterest|Discordbot|Applebot/i;

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const ua = req.headers.get("user-agent") || "";
  const chMobile = req.headers.get("sec-ch-ua-mobile") === "?1";
  // iPads on iPadOS 13+ pretend to be Macs; the desktop page detects touch and sets this cookie.
  const touchCookie = req.cookies.get("spm_touch")?.value === "1";

  const isMobile = MOBILE.test(ua) || chMobile || touchCookie || BOT.test(ua);

  if (pathname.startsWith("/desktop")) {
    if (isMobile) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }
  if (!isMobile) {
    const url = req.nextUrl.clone();
    url.pathname = "/desktop";
    url.search = "";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon|icon|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
