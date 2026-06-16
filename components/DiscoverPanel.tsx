import { sortLatestProducts } from "@/app/lib/products";
import ProductCard from "./ProductCard";

export default async function DiscoverPanel() {
  const latestProducts = await sortLatestProducts(4);

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-transparent">
      <h2 className="text-2xl text-neutral-700 font-bold mb-4 top-3 bg-white px-8 py-7 rounded-lg shadow-lg">
        Discover the latest of Craftsmanships from our Handworkers and Creators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}