'use client';

import { useEffect, useState } from 'react';
import { mockItems } from '@/api/mockItems';
import { Header, Footer, CreateItemModal, EditItemModal, DownloadButton, InventoryTable } from '@/components'; 
import { Item } from '@/types/item';
import { getItems } from '../api/services';
import { generateFileName } from '@/utils/reportGenerator';
import { FaDownload, FaPlus } from 'react-icons/fa';
import { fields } from '@/constants/fields';

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
          <span className="hidden sm:inline">New Item</span>
          <FaPlus className="block sm:hidden w-5 h-5" />
        </button>

        <DownloadButton
          data={items}
          fields={fields}
          filename={generateFileName("csv")}
        >
          <span className="hidden sm:inline">Download</span>
          <FaDownload className="block sm:hidden w-5 h-5" />
        </DownloadButton>
      </div>

      {/* Inventory Table */}
      <InventoryTable
        fields={fields}
        items={filteredItems}
        setSelectedItem={setSelectedItem}
        setIsEditModalOpen={setIsEditModalOpen}
      />

      <Footer />

      <CreateItemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchItems}
      />

      {selectedItem && (
        <EditItemModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          item={selectedItem}
          onSuccess={fetchItems}
        />
      )}
    </div>
  );
}
