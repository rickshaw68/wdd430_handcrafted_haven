import Image from "next/image";
import Link from "next/link";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: number;
    image: string;
    seller: string;
    description: string;
};

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) { 
    const cleanedUpProduct= Object.fromEntries(
    Object.entries(product).map(([key, value]) => {
        let newValue = value;
        if (typeof value === 'string') {
            newValue = value.trim().replace(/[<>%#@*^]+/g, '');         
        }      
        return [key, newValue];
    
    })
  )
      
return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md flex flex-col h-full">
        <div className="relative h-64">
            <Link href={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
                <Image
                    src={product.image}
                    alt={cleanedUpProduct.name as string}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                />
            </Link>
        </div>

        <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
                    {cleanedUpProduct.category}
                </span>
                <span className="text-sm text-neutral-600">⭐ {product.rating}</span>
            </div>

            {/* Product name is the primary navigation link */}
            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
                <Link
                    href={`/product/${product.id}`}
                    className="hover:text-cyan-600 hover:underline transition-colors"
                >
                    {cleanedUpProduct.name}
                </Link>
            </h3>

            <div className="mt-2 text-sm text-neutral-600">
                <Link href={`/sellers/${cleanedUpProduct.id}`} rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-600 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {cleanedUpProduct.seller}
                </Link>
            </div>

            <p className="mt-2 text-sm text-neutral-600 pb-6">
                {cleanedUpProduct.description || "Handcrafted item made by local artisans."}
            </p>

            <div className="mt-auto flex items-center justify-between">
                <p className="text-2xl font-semibold text-cyan-600">
                    ${Number(product.price).toFixed(2)}
                </p>
                <div className="flex items-center gap-2">
                    <Link
                        href={`/product/${product.id}`}
                        className="rounded-xl border border-cyan-500 px-4 py-2 text-sm font-semibold text-cyan-600 hover:bg-cyan-50 transition-colors"
                    >
                        View
                    </Link>
                    <button className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-600 transition-colors">
                        Add
                    </button>
                </div>
            </div>
        </div>
    </article>
);
}