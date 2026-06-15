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
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Discover_Panel />
        <h2 className="text-2xl font-bold mb-4 my-10">
            Discover the latest from your favorite sellers
        </h2>
        <SellerDiscoverPanel sellers={sellers} />
        </main>
    );
}