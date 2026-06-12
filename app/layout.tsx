import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";
import NavBar from '@/components/Navbar';
import Footer from "@/components/Footer";
import sql from "@/lib/db"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Shop for handcrafted items from local sellers",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = !!session?.userId;

  interface UserRow {
  firstname: string;
  lastname: string;
}
 let user: UserRow = { firstname: "", lastname: "" };

  const userId = session?.userId as string | undefined;

  if (userId) {
    const result = await sql<UserRow[]>`SELECT firstname, lastname FROM users WHERE id = ${userId}`;
      user = result[0] || user;
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-stone-50 text-stone-900">
      <NavBar isAuthenticated={isAuthenticated} 
          role={session?.role as string} 
          firstName={user?.firstname}
          lastName={user?.lastname}
        />
        {children}
        <Footer/>
      </body>
    </html>
  );
}