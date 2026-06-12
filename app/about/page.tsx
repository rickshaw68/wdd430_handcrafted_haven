import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="bg-stone-50 text-stone-900">
        <section className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 px-6 py-20 text-center text-white">
            <h1 className="text-4xl font-bold md:text-5xl">About Handcrafted Haven</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg">
            A marketplace built to connect talented artisans with customers who value handmade,
            meaningful, and one-of-a-kind products.
            </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-teal-700 text-center">Our Story</h2>
                <p className="mt-4 text-stone-700">
                Handcrafted Haven was created to celebrate creativity and craftsmanship.
                Our goal is to give independent makers a place to share their work while helping
                shoppers find products that feel personal, unique, and thoughtfully made.
                </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-teal-700 text-center">Our Mission</h2>
                <p className="mt-4 text-stone-700">
                We support small businesses, promote handmade products, and build a creative
                community where artisans and customers can connect through quality craftsmanship.
                </p>
            </div>
            </div>

            <div className="mt-12 rounded-xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-teal-700 text-center">What We Offer</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {["Home Décor", "Jewelry", "Textiles", "Seasonal Crafts"].map((item) => (
                <div
                    key={item}
                    className="rounded-lg border border-stone-400 bg-stone-50 p-5 text-center text-stone-800 font-bold"
                >
                    {item}
                </div>
                ))}
            </div>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-stone-900">Support Artisans</h3>
                <p className="mt-3 text-stone-700">
                Every purchase helps independent creators continue doing meaningful work.
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-stone-900">Find Unique Products</h3>
                <p className="mt-3 text-stone-700">
                Handmade items offer character and quality that mass-produced products often lack.
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-stone-900">Build Community</h3>
                <p className="mt-3 text-stone-700">
                Our marketplace brings together makers, shoppers, and learners in one creative space.
                </p>
            </div>
            </div>

            <div className="mt-16 text-center">
            <Link
                href="/"
                className="inline-block rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700"
            >
                Return to Home Page
            </Link>
            </div>
        </section>
        </main>
    );
}