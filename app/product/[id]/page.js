import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import ProductDetail from "./ProductDetail";
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
      <ProductDetail p={p} />
    </Shell>
  );
}
