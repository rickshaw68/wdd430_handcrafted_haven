import { getSession } from "@/app/lib/session";
import { getRecentUniqueSellers } from "@/app/lib/sellers";
import SellerDiscoverPanel from "@/components/SellerDiscoverPanel";
import Discover_Panel from "@/components/DiscoverPanel";

export default async function Discover() {
    const session = await getSession();
    let sellers: string[] = ["CozyCrafts", "ColorfulCreations", "BrushMasters"];

    if (session?.userId) {
        const recentSellers = await getRecentUniqueSellers(session.userId, 3);
        if (recentSellers.length > 0) {
        sellers = recentSellers;
        }
    }

    return (
        <main className="bg-stone-50 text-stone-900">
            <section className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 px-6 py-20 text-center rounded-b-3xl">
                <Discover_Panel />
            </section>
            <section className="mx-auto max-w-6xl px-6 py-16">
                <h2 className="text-2xl font-bold mb-4 my-10 text-neutral-700">
                    Discover the latest from your favorite sellers
                </h2>
                <SellerDiscoverPanel sellers={sellers} />
            </section>
        </main>
    );
}