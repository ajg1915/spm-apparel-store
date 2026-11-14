"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Registers the app's service worker and shows an "Install the app" banner.
export default function InstallApp() {
  const path = usePathname();
  const [prompt, setPrompt] = useState(null);
  const [ios, setIos] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});

    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    let dismissed = false;
    try { dismissed = localStorage.getItem("spm_install_dismissed") === "1"; } catch {}
    if (standalone || dismissed) return;

    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
    if (isIos) { setIos(true); setShow(true); }

    const onPrompt = (e) => { e.preventDefault(); setPrompt(e); setShow(true); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const close = () => {
    setShow(false);
    try { localStorage.setItem("spm_install_dismissed", "1"); } catch {}
  };

  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    await prompt.userChoice;
    setPrompt(null);
    setShow(false);
  };

  // Only on browse pages, so it never covers checkout or "Add to cart" buttons.
  if (!show || !(path === "/" || path.startsWith("/shop"))) return null;
  return (
    <div className="install">
      <img src="/icon-192.png" alt="" width="44" height="44" />
      <div className="txt">
        <b>Get the SPM Shop app</b>
        {ios ? <small>Tap <span className="share">Share ⬆</span> then “Add to Home Screen”</small> : <small>Faster shopping, right from your home screen</small>}
      </div>
      {!ios && <button className="btn" onClick={install}>Install</button>}
      <button className="x" aria-label="Close" onClick={close}>×</button>
    </div>
  );
}
