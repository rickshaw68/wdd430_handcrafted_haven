import postgres from "postgres";

const sql = postgres("postgresql://neondb_owner:npg_bzEIeQcd9lU3@ep-morning-night-akgq0cd6-pooler.c-3.us-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require", { ssl: "require" });

export async function createPurchasesTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS purchases (
      id          SERIAL PRIMARY KEY,
      user_id     TEXT NOT NULL,
      seller_name TEXT NOT NULL,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function seedPurchases() {
  const users = await sql`
    SELECT id FROM users WHERE email = ${'rick@nextmail.com'}
  `;
  const userId = users[0]?.id;

  if (!userId) {
    throw new Error("User rick@nextmail.com not found in database");
  }

  await sql`
    INSERT INTO purchases (user_id, seller_name) VALUES
      (${userId}, 'CozyCrafts'),
      (${userId}, 'ColorfulCreations'),
      (${userId}, 'Ricks House of Curiosities')
  `;

  console.log(`Seeded purchases for user ${userId}`);
}

