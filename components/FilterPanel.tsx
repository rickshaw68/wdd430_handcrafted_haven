"use client";

// components/FilterPanel.tsx

import { FilterState, PRICE_MAX, DEFAULT_FILTERS } from "@/types/filters";

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  availableCategories: string[];
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-3 text-sm font-semibold text-neutral-700 uppercase tracking-wide">
    {children}
  </h3>
);

const Divider = () => <div className="border-t border-neutral-100" />;

export default function FilterPanel({ filters, onChange, availableCategories }: Props) {
  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  const toggleCategory = (cat: string) =>
    set({
      categories: filters.categories.includes(cat)
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });

  const isActive = filters.categories.length > 0 || filters.maxPrice < PRICE_MAX;

  const activeSummary = [
    filters.categories.length > 0 && `${filters.categories.length} categor${filters.categories.length > 1 ? "ies" : "y"}`,
    filters.maxPrice < PRICE_MAX && `under $${filters.maxPrice}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <aside className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-6 self-start sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
        {isActive && (
          <button onClick={() => onChange(DEFAULT_FILTERS)} className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors">
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <SectionTitle>Category</SectionTitle>
        <div className="space-y-2">
          {availableCategories.map((cat) => {
            const checked = filters.categories.includes(cat);
            return (
              <label key={cat} onClick={() => toggleCategory(cat)} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-neutral-50 transition-colors">
                <div className={`h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "border-teal-500 bg-teal-500" : "border-neutral-300"}`}>
                  {checked && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 10 8">
                      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-neutral-700">{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* Price */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <SectionTitle>Max Price</SectionTitle>
          <span className="text-sm font-semibold text-teal-600">${filters.maxPrice.toFixed(2)}</span>
        </div>
        <input type="range" min={0} max={PRICE_MAX} step={1} value={filters.maxPrice} onChange={(e) => set({ maxPrice: Number(e.target.value) })} className="w-full accent-teal-500 cursor-pointer" />
        <div className="mt-1 flex justify-between text-xs text-neutral-400">
          <span>$0</span><span>${PRICE_MAX}</span>
        </div>
      </div>

      {/* Active summary */}
      {isActive && (
        <div className="rounded-lg bg-teal-50 border border-teal-100 px-3 py-2 text-center">
          <p className="text-xs text-teal-700 font-medium">{activeSummary}</p>
        </div>
      )}
    </aside>
  );
}