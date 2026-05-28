"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link href="/" className="font-bold text-teal-600 text-xl">Haven</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-neutral-600">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/artisans">Artisans</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>

        {/* Desktop Login */}
        <div className="hidden md:block">
            <Link href="/login" className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-neutral-800">Login</Link>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu (Visible only when open) */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white p-6 flex flex-col gap-4 text-center">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link href="/artisans" onClick={() => setIsOpen(false)}>Artisans</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <hr />
          <Link href="/login" className="font-bold text-teal-600">Login</Link>
        </div>
      )}
    </header>
  );
}