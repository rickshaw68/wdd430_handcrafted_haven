
import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `;

    // result[0].exists will be true or false
    const exists = result[0].exists;

    return NextResponse.json({ tableExists: exists });
  } catch (error) {
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }
}

// // app/dropusers/route.ts
// import { NextResponse } from 'next/server';
// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function POST() {
//   try {
//     // 1. Drop the table
//     await sql`DROP TABLE IF EXISTS users`;
    
//     // 2. Recreate the table with your new schema
//     await sql`
//       EATE TABLE IF NOT EXISTS sellers (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//     shop_name VARCHAR(255) NOT NULL,
//     bio TEXT,
//     story TEXT,
//     profile_pic VARCHAR(255),
//     is_active BOOLEAN DEFAULT TRUE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     return NextResponse.json({ message: "Users table reset successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Database reset error:", error);
//     return NextResponse.json({ error: "Failed to reset table" }, { status: 500 });
//   }
// }

// CREATE TABLE IF NOT EXISTS sellers (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//     shop_name VARCHAR(255) NOT NULL,
//     bio TEXT,
//     story TEXT,
//     profile_pic VARCHAR(255),
//     is_active BOOLEAN DEFAULT TRUE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         firstname VARCHAR(255) NOT NULL,
//         lastname VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password_hash VARCHAR(255) NOT NULL,
//         role VARCHAR(50) DEFAULT 'user',
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP



// import { NextResponse } from 'next/server';
// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function POST() {
//   try {
//     await sql`
//       CREATE TABLE IF NOT EXISTS sellers (
//         id SERIAL PRIMARY KEY,
//         user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//         shop_name VARCHAR(255) NOT NULL,
//         bio TEXT,
//         story TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     return NextResponse.json({ message: "Seller table created successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json({ error: "Failed to create table" }, { status: 500 });
//   }
// }