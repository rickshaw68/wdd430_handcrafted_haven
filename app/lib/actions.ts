"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs';
import postgres from "postgres";
import { cookies } from 'next/headers'
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { type Review } from "./types";

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

export async function fetchSellers() {
  try {
    // 1. The result of the query is the array directly
const sellers = await sql`SELECT * FROM  sellers`;
  
    // 2. Log to your terminal console
    console.log("Sellers available in database:", sellers);
    
    return sellers;
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return [];
  }
}

export async function fetchshop(userId: string) {
  try {
    // We add [0] to get the object directly, or return null if not found
    const sellers = await sql`SELECT shop_name FROM sellers WHERE id = ${userId}`;
    
    return sellers.length > 0 ? sellers[0] : null;
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return null;
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
 

export async function getSellerProfile(userId: string) {
  try {
    const sellers = await sql`
      SELECT 
        u.*, 
        s.shop_name, 
        s.bio, 
        s.story 
      FROM users u
      INNER JOIN sellers s ON u.id = s.user_id 
      WHERE u.id = ${userId}
    `;

    /*console.log("Seller profile found:", sellers[0]);*/

    // Return the specific seller object (or null if not found)
    return sellers.length > 0 ? sellers[0] : null;

  } catch (error) {
    console.error("Error fetching seller profile:", error);
    return null;
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



export async function updateSellerProfile(userId: string, formData: FormData) {
  const firstName = (formData.get('firstName') as string)?.trim();
  const lastName = (formData.get('lastName') as string)?.trim();
  const password = (formData.get('password') as string)?.trim();
  const shopName = (formData.get('shopName') as string)?.trim();
  const bio = (formData.get('bio') as string)?.trim();
  const story = (formData.get('story') as string)?.trim();

  
  if (!firstName || !lastName || !shopName || !bio || !story) {
    return { error: 'All profile fields are required.' };
  }

  try {
    const hasNewPassword = password && password.length > 0;
    let hashedPassword = '';

    if (hasNewPassword) {
      
      if (password.length < 8) {
        return { error: 'New password must be at least 8 characters long.' };
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Wrap both updates in a single transaction
    await sql.begin(async (sql) => {
      if (hasNewPassword) {
        await sql`UPDATE users SET firstname = ${firstName}, lastname = ${lastName}, password_hash = ${hashedPassword} WHERE id = ${userId}`;
      } else {
        await sql`UPDATE users SET firstname = ${firstName}, lastname = ${lastName} WHERE id = ${userId}`;
      }

      await sql`UPDATE sellers SET shop_name = ${shopName}, bio = ${bio}, story = ${story} WHERE user_id = ${userId}`;
    });

    if (hasNewPassword) {
      (await cookies()).delete('session');
      return { success: true, needsRelogin: true }; 
    }
    
    return { success: true, needsRelogin: false }; 
    
  } catch (error) {
    console.error("Profile update failed:", error);
    return { error: 'Failed to update profile' };
  }
}


export async function addProduct(userId: string, formData: FormData) {
  const shopData = await sql`SELECT shop_name FROM sellers WHERE user_id = ${userId}`;
  const shopName = shopData[0]?.shop_name || "Unknown Shop";

  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));
  const category = formData.get('category') as string;
  const rating = Number(formData.get('rating'));
  const image = formData.get('image') as string;
  const description = formData.get('description') as string;

  try {
    await sql`
  INSERT INTO products (name, price, category, rating, image, seller, seller_id, description)
  VALUES (${name}, ${price}, ${category}, ${rating}, ${image}, ${shopName}, ${userId}, ${description})
`;
    
    revalidatePath('/dashboard'); // Refreshes the dashboard data
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to add product' };
  }
}

export async function getSellerProducts(userId: string) {
  return await sql`SELECT * FROM products WHERE seller_id = ${userId}`;
}

export async function deleteProduct(productId: number) {
  try {
    await sql`DELETE FROM products WHERE id = ${productId}`;
    revalidatePath('/dashboard');
  } catch (error) {
    throw new Error('Failed to delete product');
  }
}
export async function submitReview(formData: {
  productId: number;
  reviewerName: string;
  title: string;
  comment: string;
  rating: number;
}) {
  await sql`
    INSERT INTO reviews (product_id, reviewer_name, title, comment, rating)
    VALUES (
      ${formData.productId},
      ${formData.reviewerName},
      ${formData.title},
      ${formData.comment},
      ${formData.rating}
    )
  `;
}

export async function getReviews(productId: number) {
  const rows = await sql`
    SELECT * FROM reviews
    WHERE product_id = ${productId}
    ORDER BY review_date DESC
  `;
  return rows as unknown as Review[];
}
