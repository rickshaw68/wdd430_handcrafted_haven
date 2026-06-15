import { config } from "dotenv";
config({ path: ".env.local" });

import { createPurchasesTable, seedPurchases } from "../app/lib/createPurchases";

async function main() {
  await createPurchasesTable();
  await seedPurchases();
  console.log("Done!");
  process.exit(0);
}

main();