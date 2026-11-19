import Link from "next/link";
import BottomNav from "./BottomNav";
import InstallApp from "./InstallApp";

export default function Shell({ children, back }) {
  return (
    <>
      <div className="promo"><span>★</span> Printed in the United States <span>★</span></div>
      <header className="topbar">
        <div className="topbar-row">
          {back ? <Link href={back} className="back">‹</Link> : null}
          <Link href="/" className="logo"><img src="/spm-logo.png" alt="SPM Shop" /><small>Where Americans Go</small></Link>
          <nav className="desk-nav" aria-label="Main">
            <Link href="/shop">Shop</Link>
            <Link href="/design">Design</Link>
            <Link href="/custom">Get a quote</Link>
            <Link href="/cart">Cart</Link>
          </nav>
          <Link href="/custom" className="topbar-cta">Get a quote</Link>
        </div>
        <form action="/shop" className="search">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input name="q" placeholder="Search shirts, hoodies, hats…" aria-label="Search products" />
        </form>
      </header>
      <main className="page">{children}</main>
      <InstallApp />
      <BottomNav />
    </>
  );
}
