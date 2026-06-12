//import { sql } from '@/app/lib/db'; // Ensure this matches your custom sql import
import { decrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';
import UserDashboard from './UserDashboard';

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function Page() {
  // 1. Get the session cookie
  const cookie = (await cookies()).get("session")?.value;
  
  // 2. Decrypt it to get the session object
  const session = await decrypt(cookie);

  // 3. Safety check: ensure session exists
  if (!session?.userId) {
    // You could redirect to /login here if unauthorized
    return <div>Unauthorized</div>; 
  }

  // 4. Fetch the user now that 'session' is defined
  const rows = await sql`SELECT * FROM users WHERE id = ${session.userId}`;
  const user = rows[0];

  // 5. Pass user and userId to the component
  return <UserDashboard user={user} userId={session.userId} />;
}
