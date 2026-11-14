import { Suspense } from "react";
import Shell from "@/components/Shell";
import DesignStudio from "./DesignStudio";

export const metadata = { title: "Design yours — SPM Shop" };

export default function Design() {
  return (
    <Shell>
      <Suspense fallback={<p className="empty">Loading designer…</p>}>
        <DesignStudio />
      </Suspense>
    </Shell>
  );
}
