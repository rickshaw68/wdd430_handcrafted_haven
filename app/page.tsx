"use client";

// app/page.tsx

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import FilterPanel from "@/components/FilterPanel";
import { products } from "@/data/products";
import { DEFAULT_FILTERS, FilterState } from "@/types/filters";

const allCategories = [...new Set(products.map((p) => p.category))];


function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-white py-20 text-center">
      <span className="text-4xl">🔍</span>
      <h3 className="mt-4 text-lg font-semibold text-neutral-800">No products found</h3>
      <p className="mt-1 text-sm text-neutral-500">Try adjusting your filters or search query.</p>
      <button onClick={onReset} className="mt-4 rounded-full bg-teal-500 px-5 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors">
        Clear all filters
      </button>
    </div>
  );
}

export default function Home() {
  throw new Error("Simulated error for testing error handling");

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    products.filter((p) =>
      (filters.categories.length === 0 || filters.categories.includes(p.category)) &&
      p.price <= filters.maxPrice &&
      (search.trim() === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    ),
    [filters, search]
  );

  const reset = () => { setFilters(DEFAULT_FILTERS); setSearch(""); };

  return (

    <main className="flex-grow bg-neutral-50">

     {/* Hero section */}
     <section className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Handcrafted Haven
          </h1>

          <p className="mt-4 text-lg">
            Support independent artisans and find unique, handmade supplies
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl items-center rounded-full bg-white px-6 py-4 shadow-lg">
            <label htmlFor="search" className="sr-only">
              Search products
            </label>

            <input
              id="search"
              type="text"
              placeholder="Search for craft supplies..."
              className="w-full bg-transparent text-sm text-neutral-800 placeholder-neutral-500 outline-none"
            />

            <span className="text-xl text-neutral-700">🔍</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 py-12">

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <FilterPanel filters={filters} onChange={setFilters} availableCategories={allCategories} />

            <div>
              <h2 className="mb-1 text-3xl font-bold text-neutral-900">Featured Products</h2>
              <p className="mb-6 text-neutral-600">
                {filtered.length === products.length
                  ? "Browse our most popular handcrafted items."
                  : `Showing ${filtered.length} of ${products.length} products`}
              </p>

              {filtered.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              ) : (
                <EmptyState onReset={reset} />
              )}
            </div>

        </div>
      </section>      
    </main>
  );
}