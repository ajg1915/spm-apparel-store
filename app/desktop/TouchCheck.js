"use client";
import { useEffect } from "react";

// iPads report themselves as Macs. If this "desktop" actually has a touchscreen Mac UA, treat it as a tablet.
export default function TouchCheck() {
  useEffect(() => {
    const iPadAsMac = /Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
    if (iPadAsMac) {
      document.cookie = "spm_touch=1; path=/; max-age=31536000; samesite=lax";
      window.location.replace("/");
    }
  }, []);
  return null;
}
