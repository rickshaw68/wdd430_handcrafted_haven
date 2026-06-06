import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { decrypt } from "./lib/session";
import NavBar from '@/components/Navbar';
import Footer from "@/components/Footer";

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

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning={true}
//     >
//       <body className="min-h-screen flex flex-col">
//         <NavBar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const isAuthenticated = !!session?.userId;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-stone-50 text-stone-900">
      <NavBar isAuthenticated={isAuthenticated} />
        {children}
        <Footer/>
      </body>
    </html>
  );
}