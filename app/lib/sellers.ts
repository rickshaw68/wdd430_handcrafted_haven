import "server-only";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getRecentUniqueSellers(userId: string, limit: number): Promise<string[]> {
    const rows = await sql`
        SELECT DISTINCT ON (seller_name) seller_name
        FROM purchases
        WHERE user_id = ${userId}
        ORDER BY seller_name, created_at DESC
        LIMIT ${limit}
    `;

    return rows.map((row) => row.seller_name as string);
}