import { getProducts } from "@/app/lib/products";
import ProductBrowser from "@/components/ProductBrowser";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen flex-grow bg-neutral-50">
      <ProductBrowser products={products} />
    </main>
  );
}