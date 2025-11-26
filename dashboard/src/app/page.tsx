'use client';

import { useEffect, useState } from 'react';
import { mockItems } from '@/api/mockItems';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Item } from '@/types/item';
import CreateItemModal from '@/components/CreateItemModal';
import EditItemModal from '@/components/EditItemModal';
import { getItems } from '../api/services';

export default function Home() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredItems = items.filter(item =>
    item.item_name.toLowerCase().includes(search.toLowerCase()) ||
    item.item_sku.toLowerCase().includes(search.toLowerCase())
  );

  const fetchItems = async () => {
    try {
        const data = await getItems(); 
        setItems(data);
    } catch (error) {
        console.error("Failed to fetch items, using mock data:", error);
        setItems(mockItems); // Fallback to mock data
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-black dark:bg-black dark:text-white">
      <Header />

      {/* Search Bar */}
      <div className="flex gap-3 px-6 py-4 max-w-4xl mx-auto ">
        <input
          type="text"
          placeholder="Search by (SKU or Name)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-blue-700 transition whitespace-nowrap"
        >
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
                <td
                  className="border p-2 hover:text-blue-900 dark:hover:text-blue-400 cursor-pointer"
                  onClick={() => {
                    setSelectedItem(item);
                    setIsEditModalOpen(true);
                  }}
                >
                  {item.item_sku}
                </td>
                <td
                  className="border p-2 hover:text-blue-900 dark:hover:text-blue-400 cursor-pointer"
                  onClick={() => {
                    setSelectedItem(item);
                    setIsEditModalOpen(true);
                  }}
                >
                  {item.item_name}
                </td>
                <td className="border p-2">{item.item_color}</td>
                <td className="border p-2">{item.item_size}</td>
                <td className="border p-2">{item.item_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />

      <CreateItemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {fetchItems}}
      />

      {selectedItem && (
        <EditItemModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          item={selectedItem}
          onSuccess={() => {fetchItems}}
        />
      )}
    </div>
  );
}
