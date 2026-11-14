"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./Cart";

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

export default function BottomNav() {
  const path = usePathname();
  const { count } = useCart();
  const tabs = [
    { href: "/", label: "Home", d: "M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" },
    { href: "/shop", label: "Shop", d: "M4 7h16l-1.5 12a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2zM9 7a3 3 0 0 1 6 0" },
    { href: "/custom", label: "Custom", d: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" },
    { href: "/cart", label: "Cart", d: "M6 6h15l-2 9H8zM6 6L5 3H2M9 20a1 1 0 1 0 0-.01M18 20a1 1 0 1 0 0-.01" },
  ];
  return (
    <nav className="bottomnav">
      {tabs.map((t) => {
        const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
        return (
          <Link key={t.href} href={t.href} className={active ? "active" : ""}>
            <span className="ico"><Icon d={t.d} />{t.href === "/cart" && count > 0 && <b className="badge">{count}</b>}</span>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
