import "server-only";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

export async function getRecentUniqueSellers(userId: string,limit: number) {

    return await sql`
        SELECT DISTINCT ON (seller_id)
        sellers.id,
        sellers.name,
        sellers.avatar_url
        FROM purchases
        JOIN sellers ON purchases.seller_id = sellers.id
        WHERE purchases.user_id = ${userId}
        ORDER BY seller_id, purchases.created_at DESC
        LIMIT ${limit}
    `;
}