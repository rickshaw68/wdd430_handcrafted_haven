import { NextResponse } from "next/server";
import { fetchUsers } from "../lib/actions";

export async function GET(){
    try{
        const users = await fetchUsers();
        return NextResponse.json(users);
    }catch(error){
        return NextResponse.json({error: 'Failed to fetch users'}, {status: 500});
    }
}