'use client';

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function NotFound() {

    const [query, setQuery] = useState("");
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
    <main className="flex-grow bg-neutral-50 flex flex-col items-center justify-center">
        {/* Narrow centered content */}
        <div className="text-center max-w-2xl px-6 pt-12">
            <h2 className="text-2xl font-bold text-neutral-900">404 - Page Not Found</h2>
            <p className="text-neutral-600 mt-2">
                The page you are looking for does not exist, it might have moved or has been deleted. 
                Feel free to return to the Homepage or continue browsing our selection.
            </p>
            <Link className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all shadow-md mt-6" href="/">
                Go back to Home
            </Link>
            <h2 className="text-xl font-semibold text-neutral-900 mt-12">Search our products</h2>
            <span className="flex items-center gap-6 mt-6 w-full bg-gradient-to-r from-cyan-100 to-teal-100 p-6 rounded-lg shadow-sm">
                <input
                    id="search"
                    type="text"
                    placeholder="Search for craft supplies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-700 outline-none"
                />
                🔍
            </span>
        </div>

        {/* Full width grid */}
        <div className="w-full max-w-6xl px-6 pb-12 mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="text-neutral-500 text-sm col-span-full text-center">
                    No products found.
                    </p>
                )}
            </div>
        </div>
    </main>
    );
}