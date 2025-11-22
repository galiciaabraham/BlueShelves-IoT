'use client';

import { useState } from 'react';
import { mockItems } from '../../../database/mockItems';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredItems = mockItems.filter(item =>
    item.item_name.toLowerCase().includes(search.toLowerCase()) ||
    item.item_sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-black dark:bg-black dark:text-white">
      <Header />

      {/* Search Bar */}
      <div className="flex gap-3 px-6 py-4 max-w-4xl mx-auto ">
        <input
          type="text"
          placeholder="Search by (SKU or Name)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-blue-700 transition whitespace-nowrap">
          New Item
        </button>
      </div>

      {/* Inventory Table */}
      <div className="px-6 py-4 max-w-5xl mx-auto overflow-x-auto">
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

      <Footer />
    </div>
  );
}
