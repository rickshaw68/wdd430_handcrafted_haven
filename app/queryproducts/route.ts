import { NextResponse } from "next/server";
import { fetchProducts } from "@/app/lib/actions";

export async function GET(){
    try{
        const users = await fetchProducts();
        return NextResponse.json(users);
    }catch(error){
        return NextResponse.json({error: 'Failed to fetch users'}, {status: 500});
    }
}