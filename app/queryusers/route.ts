import { NextResponse } from "next/server";
import { fetchProducts, fetchPurchase, fetchReviews, fetchSellers, fetchshop, fetchUsers,getSellerProfile } from "../lib/actions";

export async function GET(){
    try{
        const users = await fetchProducts();
        return NextResponse.json(users);
    }catch(error){
        return NextResponse.json({error: 'Failed to fetch users'}, {status: 500});
    }
}
