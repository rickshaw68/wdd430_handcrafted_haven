
import { decrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';
import UserDashboard from './UserDashboard';

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function Page() {

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
 if (!session?.userId) {
    
    return <div>Unauthorized</div>; 
  }
  const rows = await sql`SELECT * FROM users WHERE id = ${session.userId}`;
  const user = rows[0];
  return <UserDashboard user={user} userId={session.userId} />;
}
