import Link from "next/link";
import Shell from "@/components/Shell";
import { PRODUCTS, money } from "@/lib/products";
import { PRINT_CATEGORIES, PHOTOS } from "@/lib/printshop";

const price = (id) => money(PRODUCTS.find((p) => p.id === id).price);

const BEST = [
  { name: "Classic Heavy Cotton Tee", img: PHOTOS.tee, href: "/product/heavy-cotton-tee", from: `from ${price("heavy-cotton-tee")}` },
  { name: "Pullover Hoodie", img: PHOTOS.hoodie, href: "/product/pullover-hoodie", from: `from ${price("pullover-hoodie")}` },
  { name: "DTF Gang Sheet", img: PHOTOS.dtf, href: "/custom?item=DTF%20Transfers", from: "Get a quote" },
  { name: "Business Cards", img: PHOTOS.cards, href: "/custom?item=Business%20Cards", from: "Get a quote" },
  { name: "Vinyl Banner", img: PHOTOS.signs, href: "/custom?item=Signs%20%26%20Banners", from: "Get a quote" },
];

export default function Home() {
  return (
    <Shell>
      {/* Hero */}
      <section className="ps-hero">
        <img src="/spm-wallpaper.jpg" alt="" className="ps-hero-bg" />
        <div className="ps-hero-shade" />
        <div className="ps-hero-body">
          <img src="/spm-logo.png" alt="SPM Shop" className="ps-hero-logo" />
          <p className="ps-kicker">Where Americans Go</p>
          <h1>Custom printing, made in America</h1>
          <p className="ps-lead">Apparel, DTF transfers, cards, banners and more. You design it, we print it.</p>
          <div className="ps-btns">
            <a href="#categories" className="ps-btn red">Start your order</a>
            <Link href="/design" className="ps-btn white">Design yours</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div id="categories" className="ps-head"><h2>Shop by category</h2></div>
      <div className="ps-cats">
        {PRINT_CATEGORIES.map((c) => (
          <Link key={c.id} href={c.href} className="ps-cat">
            <img src={c.img} alt="" loading="lazy" />
            <div><b>{c.name}</b><small>{c.sub}</small></div>
          </Link>
        ))}
      </div>

      {/* DTF feature */}
      <section className="ps-dtf">
        <img src={PHOTOS.dtf} alt="" loading="lazy" />
        <div className="ps-dtf-body">
          <p className="ps-kicker">Our specialty</p>
          <h2>DTF gang sheets, printed in-house</h2>
          <p>Upload your art, fill a sheet, press it on anything. Bright color with a white underbase and a glossy finish.</p>
          <Link href="/custom?item=DTF%20Transfers" className="ps-btn red block">Order DTF transfers</Link>
        </div>
      </section>

      {/* Best sellers */}
      <div className="ps-head"><h2>Best sellers</h2><span className="ps-hint">Swipe →</span></div>
      <div className="ps-rail">
        {BEST.map((b) => (
          <Link key={b.name} href={b.href} className="ps-prod">
            <img src={b.img} alt="" loading="lazy" />
            <div><b>{b.name}</b><span>{b.from}</span></div>
          </Link>
        ))}
      </div>
      <p className="ps-sample">Sample photos shown. Your design goes on it.</p>

      {/* How it works */}
      <div className="ps-head"><h2>How it works</h2></div>
      <div className="ps-steps">
        <div><b>1</b><span><strong>Pick your product</strong>Apparel, transfers, cards, signs and more.</span></div>
        <div><b>2</b><span><strong>Upload your design</strong>Send your artwork or logo. We check it before printing.</span></div>
        <div><b>3</b><span><strong>We print &amp; you pick up or ship</strong>Made in-house at the Staten Island Mall.</span></div>
      </div>

      {/* Why SPM */}
      <section className="ps-why">
        <h2>Why SPM</h2>
        <p><strong>Printed in-house.</strong> Your apparel and DTF orders are made right here.</p>
        <p><strong>Team pricing.</strong> The more you order, the more you save on 12, 24 and 48+ pieces.</p>
        <p><strong>American-made.</strong> Where Americans go for custom gear.</p>
        <Link href="/custom" className="ps-btn red block">Get a free quote</Link>
      </section>

      {/* Footer */}
      <footer className="ps-foot">
        <img src="/spm-logo.png" alt="SPM Shop" />
        <nav>
          <Link href="/shop">Shop apparel</Link>
          <Link href="/design">Design yours</Link>
          <Link href="/custom">Get a quote</Link>
          <Link href="/cart">Cart</Link>
        </nav>
        <small>Staten Island Mall · Printed in the USA</small>
      </footer>
    </Shell>
  );
}
