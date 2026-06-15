import { getReviews } from "@/app/lib/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const productId = Number(searchParams.get("productId"));
    const reviews = await getReviews(productId);
    return NextResponse.json(reviews);
}