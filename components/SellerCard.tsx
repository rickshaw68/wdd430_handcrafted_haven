import Image from "next/image";
import Link from "next/link";

type Seller = {
    id: number
    name: string
    rating: number
    description: string
    logo: string
    location: string
    date: string
    sales: number
};

type SellerCardProps = {
    seller: Seller;
};

export default function SellerCard({ seller }: SellerCardProps) { 
    const cleanedUpSeller= Object.fromEntries(
    Object.entries(seller).map(([key, value]) => {
        let newValue = value;
        if (typeof value === 'string') {
            newValue = value.trim().replace(/[<>%#@*^]+/g, '');         
        }      
        return [key, newValue];
    
    })
  ) as Seller;
      
return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md flex flex-col h-full">
        <div className="relative h-64">
            <Image
                src={cleanedUpSeller.logo}
                alt={cleanedUpSeller.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                className="object-cover"
            />
        </div>

        <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700">
                    {cleanedUpSeller.location}
                </span>

                <span className="text-sm text-neutral-600">⭐ {cleanedUpSeller.rating}</span>
            </div>

            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
                {cleanedUpSeller.name}
            </h3>
            <div className="mt-2 text-sm text-neutral-600">
                <Link href={`/sellers/${cleanedUpSeller.id}`} rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-600 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {cleanedUpSeller.name}
                </Link>
            </div>

            <p className="mt-2 text-sm text-neutral-600 relative pb-6">
                {cleanedUpSeller.description || "Handcrafted item made by local artisans."} 
            </p>

            <div className="mt-auto flex items-center justify-between">
                <button className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-white" onClick={() => window.location.href = `/sellers/${cleanedUpSeller.id}`}    >
                    View Seller
                </button>
            </div>
        </div>
    </article>
);
}