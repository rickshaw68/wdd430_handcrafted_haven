import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
    //throw new Error("Simulated error for testing error handling");
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

          {/* Filter placeholder */}
          <aside className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">
              Filters
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Filter component coming soon.
            </p>
          </aside>

          {/* Products placeholder */}          
          <div>
            <h2 className="mb-2 text-3xl text-center font-bold text-neutral-900">
              Featured Products
            </h2>

            <p className="mb-6 text-neutral-600 text-center">
              Browse some of our most popular handcrafted items.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>      
    </main>
  );
}