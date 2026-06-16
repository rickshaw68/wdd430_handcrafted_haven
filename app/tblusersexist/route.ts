// import { NextResponse } from 'next/server';
// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function GET() {
//   try {
//     const result = await sql`
//       SELECT EXISTS (
//         SELECT FROM information_schema.tables 
//         WHERE table_name = 'users'
//       );
//     `;

//     // result[0].exists will be true or false
//     const exists = result[0].exists;

//     return NextResponse.json({ tableExists: exists });
//   } catch (error) {
//     return NextResponse.json({ error: "Query failed" }, { status: 500 });
//   }
// }



// import { NextResponse } from 'next/server';
// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function POST() {
//   try {
//     // This SQL statement creates the table if it doesn't already exist
//     await sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         lastname VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password_hash VARCHAR(255) NOT NULL,
//         role VARCHAR(50) DEFAULT 'user',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     return NextResponse.json({ message: "Users table initialized successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Database setup error:", error);
//     return NextResponse.json({ error: "Failed to create table" }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Query the information_schema to get all user tables
    const { rows } = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    return NextResponse.json({ tables: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500 });
  }
}