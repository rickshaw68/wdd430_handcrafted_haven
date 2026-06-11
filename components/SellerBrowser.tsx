"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FilterPanel from "@/components/FilterPanel";
import { DEFAULT_FILTERS, FilterState } from "@/types/filters";
import type { Product } from "@/app/lib/products"
import SellerCard from "./SellerCard";
import type { Seller } from "@/data/sellers"

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-white py-20 text-center">
      <span className="text-4xl">🔍</span>
      <h3 className="mt-4 text-lg font-semibold text-neutral-800">
        No sellers found
      </h3>
      <p className="mt-1 text-sm text-neutral-500">
        Try adjusting your filters or search query.
      </p>
      <button
        onClick={onReset}
        className="mt-4 rounded-full bg-teal-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
      >
        Clear all filters
      </button>
    </div>
  );
}

export default function SellerBrowser({ sellers }: { sellers: Seller[] }) {
    console.log(sellers);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");


  const filtered = useMemo(
  () =>
    sellers.filter(
      (s) =>
        (Number(s.rating) >= filters.minRating) &&
        (filters.categories.length === 0 || filters.categories.includes(s.location)) &&
        (search.trim() === "" ||
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase()) ||
          s.name.toLowerCase().includes(search.toLowerCase()))
    ),
  [sellers, filters, search]
);

const allCategories = useMemo(() => {
  const cats = new Set<string>();
  sellers.forEach((s) => cats.add(s.location));
  return Array.from(cats);
}, [sellers]);

  const reset = () => {
    setFilters(DEFAULT_FILTERS);
    setSearch("");
    setSearchInput("");
  };

  return (
    <>
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
              Search artisans and their products
            </label>

            <input
              id="search"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(searchInput);
                }
              }}
              placeholder="Search for craft supplies..."
              className="w-full bg-transparent text-sm text-neutral-800 placeholder-neutral-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setSearch(searchInput)}
              className="text-xl text-neutral-700"
              aria-label="Search"
            >
              🔍
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">


          <div>
            <h2 className="mb-1 text-3xl font-bold text-neutral-900">
              Featured Artisans
            </h2>

            <p className="mb-6 text-neutral-600">
              {filtered.length === sellers.length
                ? "Browse our most popular handcrafted items."
                : `Showing ${filtered.length} of ${sellers.length} sellers. Adjust your filters to find more.`}
            </p>

            {filtered.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((s) => (
                  <SellerCard key={s.id} seller={s} />
                ))}
              </div>
            ) : (
              <EmptyState onReset={reset} />
            )}
        </div>
      </section>
    </>
  );
}