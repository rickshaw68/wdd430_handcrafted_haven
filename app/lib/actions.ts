"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});


const testUser = {
  id: "1",
  email: "user@nextmail.com",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
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
