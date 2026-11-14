import QRCode from "qrcode";
import TouchCheck from "./TouchCheck";

export const metadata = { title: "SPM Apparel — Shop on your phone", robots: { index: false } };

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://spmapparels.store";

export default async function Desktop() {
  const svg = await QRCode.toString(SITE, { type: "svg", margin: 1, color: { dark: "#0b1f44", light: "#ffffff" } });
  return (
    <div className="gate">
      <TouchCheck />
      <div className="gate-card">
        <div>
          <div className="logo" style={{ fontSize: 28 }}><span>SPM</span>APPAREL</div>
          <h1>Our store lives<br />on your phone.</h1>
          <p>SPM Apparel is built for mobile. Scan the code with your phone's camera to shop tees, hoodies, hats, gloves, jackets and custom prints.</p>
          <p className="url">spmapparels.store</p>
        </div>
        <div className="qr">
          <div dangerouslySetInnerHTML={{ __html: svg }} />
          <div style={{ marginTop: 10 }}>Scan to shop</div>
        </div>
      </div>
    </div>
  );
}
