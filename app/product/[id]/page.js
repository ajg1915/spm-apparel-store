import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import { Suspense } from "react";
import DesignStudio from "@/app/design/DesignStudio";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function Page({ params }) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();
  return (
    <Shell back={`/shop?cat=${p.cat}`}>
      <Suspense fallback={<p className="empty">Loading…</p>}>
        <DesignStudio product={p} />
      </Suspense>
    </Shell>
  );
}
