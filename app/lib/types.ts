export type Review = {
    id: number;
    product_id: number;
    reviewer_name: string;
    verified_purchase: boolean;
    review_date: string;
    title: string;
    comment: string;
    rating: number;
    helpful_count: number;
};