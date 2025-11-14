// src/components/Header.tsx
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white dark:bg-zinc-900">
      <div className="space-x-4">
        {/* Placeholder links for now */}
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/print" className="hover:underline">Print</Link>
        <Link href="/settings" className="hover:underline">Settings</Link>
      </div>
      <div className="space-x-4 flex items-center">
        
        <button
          onClick={() => alert('Logging out...')}
          className="hover:underline"
        >
          Logout
        </button>
        <Link href="/profile">
          <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500" />
        </Link>
      </div>
    </nav>
  );
}
