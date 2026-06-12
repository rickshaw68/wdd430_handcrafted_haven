'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
//import { useEffect, useState } from 'react'; // Importing useState and useEffect for authentication state management which will be implemented later
import { logout } from '../app/lib/actions'; // Import your server action

export default function Navbar({ isAuthenticated, role }: { isAuthenticated: boolean, role?: string }) {
  // Determine the correct path
  const dashboardHref = role === 'seller' 
    ? '/dashboard/sellerdashboard' 
    : '/dashboard/userdashboard';
    const pathname = usePathname();

    
    const handleLogout = async () => {
        await logout();
      
    };

    const links = [
        { name: 'Discover', href: '/discover' },
        { name: 'Artisans', href: '/artisans' },
        { name: 'Workshops', href: '/workshops' },
        { name: 'About', href: '/about' },
    ];

    return (
        <header className="grid grid-cols-[1fr-1fr] md:grid-cols-3 items-center border-b border-neutral-200 bg-white">

            {/* Logo + Title */}
            <Link href="/" className="flex h-full items-center max-h-1xl mx-auto px-6 py-1 gap-2 font-semibold text-center">

                {/* Logo placeholder SVG from figma */}
                <div className="bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 p-2.5 rounded-xl shadow-lg" data-fg-d5jy4="1.22:9.1934:/src/app/components/Header.tsx:19:13:767:188:e:div:e" data-fgid-d5jy4=":r6:">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart text-white fill-white"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </div>

                <div className="block">
                    <h1 className="text-2xl text-neutral-900">
                        Handcrafted Haven
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Artisan Marketplace
                    </p>
                </div>

            </Link>

            {/* Navigation */}
            <ul className="flex h-16 items-center justify-center gap-4 px-4 md:gap-6 lg:gap-8">
                {links.map((link) => {
                    return (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={clsx(
                                    'flex h-[48px] items-center justify-center gap-2 rounded-md p-3 text-slate-700 text-sm font-medium hover:text-teal-600 md:px-3',
                                    {
                                        'bg-sky-800 text-white':
                                            pathname === link.href,
                                    },
                                )}
                            >
                                <p>{link.name}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* User actions */}
            <div className="flex justify-center items-center gap-4">
                
                {isAuthenticated ? (
                     <div className="flex items-center gap-4">
                     {/* Dashboard Link */}
                     <Link href={dashboardHref} className="text-slate-600 hover:text-teal-600 font-medium text-sm">
                      Dashboard
                     </Link>

                    {/* Avatar + Logout Button */}
                    <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        AD
                        </div> 
 


                <button   
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-700 hover:text-red-600 transition-colors px-4 py-2 rounded-lg cursor-pointer"
                >
                    {/* Log Out Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    Logout
                </button>
                </div>
                </div>
) : (
                <Link href="/login" className="flex items-center gap-2 text-slate-700 hover:text-cyan-600 hover:bg-slate-100 transition-colors px-4 py-2 rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" x2="3" y1="12" y2="12" />
                    </svg>
                    Sign In
                </Link>
                )}
                
                <Link
                    href="/cart"
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-teal-600 transition-all shadow-md cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-cart"
                    >
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>

                    <span className="hidden sm:inline">
                        Cart
                    </span>
                </Link>
            </div>
        </header>
    );
}