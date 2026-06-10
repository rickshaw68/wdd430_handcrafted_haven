import { MarketplaceReview } from "@/data/reviews";
import { useState } from "react";
import { reviewSet } from "@/data/reviews";

const REVIEWS_PER_PAGE = 4;

export default function ReviewBoard(productId: number) {
    const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);
    const visibleReviews = reviewSet.slice(0, visibleCount);
    const hasMore = visibleCount < reviewSet.length;

    const reviews = reviewSet.filter(r => r.productId === productId);
    const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6L9 17l-5-5"></path></svg>
    );
    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6L6 18M6 6l12 12"></path></svg>
    );
    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + REVIEWS_PER_PAGE, reviewSet.length));
    };
    return (
        <div className="mt-4" id="product-reviews">
            <h2 className="mt-8 text-xl font-semibold">
                Reviews ({reviews.length})
            </h2>
            <div className="mt-4">
                {visibleReviews.map(r => (
                    <div key={r.id} className="border-b border-neutral-300 py-4">
                        <h3 className="text-lg font-semibold mt-1">
                            {r.title}
                        </h3>
                        <p className="flex items-center gap-1 text-neutral-700">
                            <span>Reviewer: {r.reviewerName}</span>
                            <span className="ml-4 flex items-center gap-1">
                                Verified: {r.verifiedPurchase ? <CheckIcon /> : <XIcon />}
                            </span>
                        </p>
                        <p className="text-neutral-700">{r.comment}</p>
                        <p className="text-sm text-neutral-500">Rating: {r.rating}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
                {hasMore && (
                    <button
                        onClick={() => setVisibleCount(c => c + REVIEWS_PER_PAGE)}
                        className="text-sm text-cyan-600 hover:underline"
                    >
                        Show more ({reviews.length - visibleCount} remaining)
                    </button>
                )}
                {visibleCount > REVIEWS_PER_PAGE && (
                    <button
                        onClick={() => setVisibleCount(REVIEWS_PER_PAGE)}
                        className="text-sm text-neutral-500 hover:underline"
                    >
                        Show less
                    </button>
                )}
            </div>
        </div>
    )
}