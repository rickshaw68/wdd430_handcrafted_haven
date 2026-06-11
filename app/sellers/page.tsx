import { sellers } from "@/data/sellers";
import SellerBrowser from "@/components/SellerBrowser";

export default async function Home() {
  return (
    <main className="min-h-screen flex-grow bg-neutral-50">
      <SellerBrowser sellers={sellers} />
    </main>
  );
}