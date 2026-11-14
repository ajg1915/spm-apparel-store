import Link from "next/link";
import BottomNav from "./BottomNav";
import InstallApp from "./InstallApp";

export default function Shell({ children, back }) {
  return (
    <>
      <header className="topbar">
        <Link href="/" className="logo"><span>SPM</span>APPAREL</Link>
        {back && <Link href={back} className="back">‹ Back</Link>}
      </header>
      <main className="page">{children}</main>
      <InstallApp />
      <BottomNav />
    </>
  );
}
