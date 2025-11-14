'use client';

import { useState } from 'react';
import { mockItems } from '../../../database/mockItems'; // adjust path if needed

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredItems = mockItems.filter(item =>
    item.item_name.toLowerCase().includes(search.toLowerCase()) ||
    item.item_sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-black dark:bg-black dark:text-white">
      {/* Top Navigation */}
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

      {/* Search Bar */}
      <div className="px-6 py-4">
        <input
          type="text"
          placeholder="Search by (SKU or Name)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Inventory Table */}
      <div className="px-6 py-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-zinc-800">
              <th className="border p-2">SKU</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Color</th>
              <th className="border p-2">Size</th>
              <th className="border p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.item_sku}</td>
                <td className="border p-2">{item.item_name}</td>
                <td className="border p-2">{item.item_color}</td>
                <td className="border p-2">{item.item_size}</td>
                <td className="border p-2">{item.item_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 border-t text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© 2024 Your Website. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
        </div>
      </footer>
    </div>
  );
}
