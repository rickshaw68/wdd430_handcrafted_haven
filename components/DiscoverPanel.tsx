import { sortLatestProducts } from "@/app/lib/products";
import ProductCard from "./ProductCard";

export default async function DiscoverPanel() {
  const latestProducts = await sortLatestProducts(4);

  return (
    <div className="flex flex-col items-center justify-center border rounded-2xl border-neutral-200 bg-white p-6 shadow-sm space-y-6 self-start top-6">
      <h2 className="text-2xl font-bold mb-4">
        These are the latest of Craftsmanships from our Handworkers and Creators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}