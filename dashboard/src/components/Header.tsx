// src/components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b py-4 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="Home">
                <Image
                src="/logo-192x192.png"
                alt="Blueshelves Logo"
                width={32}
                height={32}
                className="w-8 h-8"
                />
                <span className="text-xl font-bold">Blueshelves</span>
            </Link>

            {/* Mobile menu button */}
            <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            <nav className={`md:flex md:items-center md:justify-between md:px-6 grow absolute md:static top-full left-0 right-0 md:border-0 border-y bg-gray-200 dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent  md:p-0 ${isOpen ? 'block' : 'hidden'}`}>
                <div className="md:space-x-4">
                    {/* Placeholder links for now */}
                    <Link href="/dashboard" className="md:inline px-4 py-2 block hover:underline">Dashboard</Link>
                    <Link href="/print" className="md:inline px-4 py-2 block hover:underline">Print</Link>
                    <Link href="/settings" className="md:inline px-4 py-2 block hover:underline">Settings</Link>
                </div>
                <div className="space-x-4 flex items-center">
                    
                    <button
                    onClick={() => alert('Logging out...')}
                    className="md:inline px-4 py-2 block hover:underline w-full text-left"
                    >
                    Logout
                    </button>
                    <Link href="/profile">
                    <div className="hidden md:block w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500" />
                    </Link>
                </div>
            </nav>
        </div>
    </header>
  );
}
