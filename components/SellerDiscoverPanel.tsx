import { Product, sortBySeller } from "@/app/lib/products";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default async function SellerDiscoverPanel({ sellers, fallback = false }: { sellers: string[]; fallback?: boolean;}) {
    const latestProducts: Product[] = [];

    for (const seller of sellers) {
        const products = await sortBySeller(seller, 4);
        latestProducts.push(...products);
    }

    if (latestProducts.length === 0 && !fallback) {
        return (
            <SellerDiscoverPanel 
                sellers={["CozyCrafts", "ColorfulCreations", "BrushMasters"]} 
                fallback={true}
            />
        );
    }

    if (latestProducts.length === 0 && fallback) {
        return ( 
            <div className="flex flex-col items-center justify-center border rounded-2xl border-neutral-200 bg-white p-6 shadow-sm space-y-6 self-start top-6">
                <h2 className="text-slate-500 text-sm">No Recent Purchases found. Keep exploring our great selection!</h2>
                <Link className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all shadow-md cursor-pointer w-48 mt-6" href="/">Go back to Home</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center border rounded-2xl border-neutral-200 bg-white p-6 shadow-sm space-y-6 self-start top-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}