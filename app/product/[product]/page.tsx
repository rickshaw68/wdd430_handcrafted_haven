'use client';

import ReviewBoard from "@/components/ReviewBoard";
import { reviewSet } from "@/data/reviews";
import { products } from "@/data/products";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function SellerPage() {
    const params = useParams();
    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6L9 17l-5-5"></path></svg>
    );
    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6L6 18M6 6l12 12"></path></svg>
    );

    const product = products.find(p => p.id === Number(params.product));
    console.log("Product found:", product);

    if (!product) {
        return <div>Product not found</div>;
    }

    const likeProducts = products.filter(
        p => p.category === product.category && p.id !== product.id

    );
    const reviews = reviewSet.filter(r => r.productId === product.id);
    console.log("Like items:", likeProducts);
    console.log("Product Reviews:", reviews);

    return (
        <main className="p-6 bg-neutral-50 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className="block items-center gap-4 bg-gradient-to-r from-teal-500 to-cyan-500 p-4 rounded-2xl text-white">
                    <Link href="/" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-100 mb-4 hover:text-white hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                        Back to Shop
                    </Link>
                    <div className="flex items-center gap-4">
                        <div>
                            <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded-lg" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{product.name}</h1>
                            <p className="inline-flex items-center gap-1 text-sm text-white/80">
                                Sold by: <Link href={`/seller/${product.sellerId}`} className="text-cyan-100 hover:text-white hover:underline">
                                    {product.seller}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4" id="product-info">
                    <h2 className="mt-8 text-xl font-semibold">
                            Product Details
                    </h2>
                    <p className="mt-2 text-neutral-700">
                        Price: ${product.price}
                    </p>
                    <p className="mt-1 text-neutral-700">
                        Category: {product.category}
                    </p>
                    <p className="mt-4 text-neutral-700">
                        {product.description}
                    </p>
                </div>
                <div className="mt-4" id="product-reviews">
                    <div className="mt-4">
                        {ReviewBoard(product.id)}
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="mt-8 text-xl font-semibold">
                        Like Items
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                        {likeProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}