import Link from "next/link";
import Shell from "@/components/Shell";
import ProductArt from "@/components/ProductArt";
import { CATEGORIES, PRODUCTS, money } from "@/lib/products";

const startingAt = (cat) => Math.min(...PRODUCTS.filter((p) => p.cat === cat).map((p) => p.price));

export default function Home() {
  const popular = ["heavy-cotton-tee", "pullover-hoodie", "trucker-hat", "coach-jacket", "knit-gloves", "satin-baseball-jacket"].map((id) => PRODUCTS.find((p) => p.id === id));
  return (
    <Shell>
      {/* Category row */}
      <div className="cat-row">
        {CATEGORIES.map((c) => (
          <Link key={c.id} href={`/shop?cat=${c.id}`} className="cat-circle">
            <span className="disc"><ProductArt cat={c.id} color={c.color} size={46} /></span>
            {c.name}
          </Link>
        ))}
      </div>

      {/* Main banner */}
      <section className="hero-flag">
        <div className="hero-inner">
          <img src="/spm-logo.png" alt="SPM Shop" className="hero-logo" />
          <p className="tag">“Where Americans Go”</p>
          <p className="sub">Sports apparel & custom prints made right here in the USA</p>
          <div className="banner-btns">
            <Link href="/shop" className="btn white">Shop now</Link>
            <Link href="/design" className="btn">Design yours</Link>
          </div>
        </div>
      </section>
      <div className="stripes" aria-hidden="true" />

      {/* Two promo tiles */}
      <div className="promo-tiles">
        <Link href="/custom" className="ptile navy">
          <b>Team orders</b><small>Save more on 12, 24 & 48+</small><span>Get a quote ›</span>
        </Link>
        <Link href="/shop?cat=hats" className="ptile red">
          <b>Hats</b><small>Snapbacks & dad hats</small><span>Shop hats ›</span>
        </Link>
      </div>

      {/* Popular products */}
      <div className="section-head"><h2><span className="star">★</span> Popular products</h2><Link href="/shop">See all</Link></div>
      <div className="grid">
        {popular.map((p) => (
          <div key={p.id} className="card pcard">
            <Link href={`/product/${p.id}`} className="img"><ProductArt cat={p.cat} color={p.colors[0]} size={120} /></Link>
            <div className="meta">
              <Link href={`/product/${p.id}`} className="name">{p.name}</Link>
              <div className="from">Starting at <b>{money(p.price)}</b></div>
              <Link href={`/design?p=${p.id}`} className="design-link">Design yours ›</Link>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <h2><span className="star">★</span> How custom orders work</h2>
      <div className="how">
        <div><b>1</b><span>Pick your item</span></div>
        <div><b>2</b><span>Upload your logo or idea</span></div>
        <div><b>3</b><span>Approve your mockup</span></div>
        <div><b>4</b><span>We print & you pick up or ship</span></div>
      </div>

      {/* Bulk pricing band */}
      <section className="bulk">
        <h3>The more you order, the more you save</h3>
        <div className="tiers">
          <div><b>12+</b><small>pieces</small></div>
          <div><b>24+</b><small>pieces</small></div>
          <div><b>48+</b><small>pieces</small></div>
        </div>
        <Link href="/custom" className="btn light block">Get team pricing</Link>
      </section>
    </Shell>
  );
}
