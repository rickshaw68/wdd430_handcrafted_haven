'use client';

import { sellers } from "@/data/sellers";
import { products } from "@/data/products";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function SellerPage() {
    const params = useParams();
    const sellerName = params.seller;

    const seller = sellers.find(s => s.name === sellerName);
    console.log("Seller found:", seller);

    if (!seller) {
        return <div>Seller not found</div>;
    }

    const sellerProducts = products.filter(
        p => p.sellerId === seller.id

    );
    console.log("Seller products:", sellerProducts);

    return (
        <main className="p-6">
            <div className="max-w-3xl mx-auto">
                <div className="block items-center gap-4 bg-gradient-to-r from-teal-500 to-cyan-500 p-4 rounded-2xl text-white">
                    <Link href="/" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-100 mb-4 hover:text-white hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                        Back to Shop
                    </Link>
                    <div className="flex items-center gap-4">
                        <img src={seller.logo} alt={`${seller.name} Logo`} className="w-40 h-40 rounded-full" />
                        <div>
                            <h1 className="text-2xl font-bold">{seller.name}</h1>
                            <p className="inline-flex items-center gap-1 text-sm text-white/80">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin" data-fg-bwfn16="9.31:9.3191:/src/app/components/SellerProfile.tsx:39:19:1482:20:e:MapPin::::::BveZ" data-fgid-bwfn16=":rcc:"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg> {seller.location}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar" data-fg-bwfn20="9.31:9.3191:/src/app/components/SellerProfile.tsx:43:19:1651:22:e:Calendar::::::Bbz4" data-fgid-bwfn20=":rcf:"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> Joined {seller.date}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star fill-current" data-fg-bwfn25="9.31:9.3191:/src/app/components/SellerProfile.tsx:47:19:1905:43:e:Star::::::hX0" data-fgid-bwfn25=":rci:"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg> {seller.rating} Rating 
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award" data-fg-bwfn30="9.31:9.3191:/src/app/components/SellerProfile.tsx:51:19:2102:19:e:Award::::::B1kh" data-fgid-bwfn30=":rcl:"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg> {seller.sales} Sales
                            </p>
                        </div>
                    </div>
                </div>

                <p className="mt-4 text-neutral-700">
                    {seller.description}
                </p>

                <h2 className="mt-8 text-xl font-semibold">
                    Products
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    {sellerProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </main>
    );
}