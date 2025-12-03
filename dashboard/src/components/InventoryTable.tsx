'use client';
import { useState } from 'react';
import { Item, Field } from '@/types';

interface InventoryTableProps {
  fields: Field[];
  items: Item[];
  setSelectedItem: (item: Item) => void;
  setIsEditModalOpen: (isOpen: boolean) => void;
}

export default function InventoryTable({
  fields,
  items,
  setSelectedItem,
  setIsEditModalOpen,
}: InventoryTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  const sortedItems = [...items].sort((a, b) => {
    // Default sorting by item_id if no sortConfig.key is set or direction is null
    if (!sortConfig.key || sortConfig.direction === null) {
      return a.item_id > b.item_id ? 1 : -1;
    }

    const aValue = a[sortConfig.key as keyof Item];
    const bValue = b[sortConfig.key as keyof Item];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="px-6 py-4 max-w-5xl mx-auto overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-zinc-800">
            {fields.map((field) => (
              <th
                key={field.value}
                className="border p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
                onClick={() => requestSort(field.value)}
              >
                <div className="flex items-center">
                  {field.label}
                  {sortConfig.key === field.value && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : ''}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => (
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
  );
}
