// src/components/Header.tsx
'use client';

export default function Header() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white dark:bg-zinc-900">
      <div className="space-x-4">
        <button>Dashboard</button>
        <button>Print</button>
        <button>Settings</button>
      </div>
      <div className="space-x-4 flex items-center">
        <button>Logout</button>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </nav>
  );
}
