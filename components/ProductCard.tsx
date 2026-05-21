type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="h-64 bg-neutral-200">
        <p className="flex h-full items-center justify-center text-neutral-500">
          Product image
        </p>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
            {product.category}
          </span>

          <span className="text-sm text-neutral-600">⭐ {product.rating}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-neutral-900">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-neutral-600">
          Handcrafted item made by local artisans.
        </p>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-2xl font-semibold text-cyan-600">
            ${product.price.toFixed(2)}
          </p>

          <button className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white">
            Add
          </button>
        </div>
      </div>
    </article>
  );
}