"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';
import postgres from "postgres";
import { cookies } from 'next/headers'
import { NextResponse } from "next/server";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  // 1. Fetch user AND the password_hash from the database
  const users = await sql`
    SELECT id, password_hash, role FROM users WHERE email = ${email}
  `;
  const user = users[0];

  // 2. Verify: Check if user exists AND if the password is correct
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  // 3. Create session with the verified data
  await createSession(user.id.toString(), user.role);

  // 4. Determine redirect path based on role
  if (user.role === 'seller') {
    redirect("/dashboard/sellerdashboard");
  } else if (user.role === 'user') {
    redirect("/dashboard/userdashboard");
  } else {
    redirect("/dashboard"); 
  }
}

export async function logout() {
  await deleteSession();
  redirect("/");
}



export async function registerSeller(prevState: any, formData: FormData) {
  const accountType = formData.get('accountType') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (accountType === 'personal') {
      await sql`
        INSERT INTO users (firstname, lastname, email, password_hash, role)
        VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, 'user')
      `;
    } 
    // Explicitly check for business
    else if (accountType === 'business') {
      const shopName = formData.get('shopName') as string;
      const bio = formData.get('bio') as string;
      const story = formData.get('story') as string;

      await sql.begin(async (sql) => {
        const [newUser] = await sql`
          INSERT INTO users (firstname, lastname, email, password_hash, role)
          VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, 'seller')
          RETURNING id
        `;

        await sql`
          INSERT INTO sellers (user_id, shop_name, bio, story)
          VALUES (${newUser.id}, ${shopName}, ${bio}, ${story})
        `;
      });
    } else {
      throw new Error("Invalid account type selected");
    }

    return { success: true, message: "Account created successfully!" };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Registration failed: " + (error as Error).message };
  }
}



export async function fetchUsers() {
  try {
    // 1. The result of the query is the array directly
    const users = await sql`SELECT * FROM  Users`;
    
    // 2. Log to your terminal console
    console.log("Users available in database:", users);
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}


export async function fetchProducts() {
  try {
    // 1. The result of the query is the array directly
    const products = await sql`SELECT * FROM products`;
    
    // 2. Log to your terminal console
    console.log("Products available in database:", products);
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}




export async function updateProfile(userId: string, formData: FormData) {
  const firstName = (formData.get('firstName') as string)?.trim();
  const lastName = (formData.get('lastName') as string)?.trim();
  const password = (formData.get('password') as string)?.trim();

  if (!firstName || !lastName) {
    return { error: 'First and Last name cannot be empty.' };
  }

  try {
    if (password && password.length > 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await sql`UPDATE users SET firstname = ${firstName}, lastname = ${lastName}, password_hash = ${hashedPassword} WHERE id = ${userId}`;
      
      // Clear session to force re-login
      (await cookies()).delete('session');
      return { success: true, needsRelogin: true };
    } else {
      await sql`UPDATE users SET firstname = ${firstName}, lastname = ${lastName} WHERE id = ${userId}`;
      return { success: true, needsRelogin: false };
    }
  } catch (error) {
    return { error: 'Failed to update database.' };
  }
}

