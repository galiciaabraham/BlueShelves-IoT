// src/components/InventoryTable.ts
'use client';
import { useState } from 'react';
import { Item, Field } from '@/types';
import { capitalizeFirstLetter, toTitleCase } from '@/utils';

interface InventoryTableProps {
  fields: Field[];
  items: Item[];
  setSelectedItem: (item: Item) => void;
  setIsEditModalOpen: (isOpen: boolean) => void;
  loading: boolean;
}

const SkeletonRow = ({ colSpan }: { colSpan: number }) => (
  <tr>
    {Array(colSpan).fill(0).map((_, i) => (
      <td key={i} className="border p-2">
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
      </td>
    ))}
  </tr>
);

export default function InventoryTable({
  fields,
  items,
  setSelectedItem,
  setIsEditModalOpen,
  loading,
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
          {loading ? (
            // Show skeleton while loading
            Array(fields.length).fill(0).map((_, i) => (
              <SkeletonRow key={i} colSpan={fields.length} />
            ))
          ) : sortedItems.length > 0 ? (
            // Show data when not loading and items exist
            sortedItems.map((item, index) => (
              <tr key={index}
                className="hover:text-blue-900 dark:hover:text-blue-400 cursor-pointer"
                onClick={() => {
                setSelectedItem(item);
                setIsEditModalOpen(true);
                }}
              >
                <td className="border p-2">{item.item_sku.toUpperCase()}</td>
                <td className="border p-2">{toTitleCase(item.item_name)}</td>
                <td className="border p-2">{toTitleCase(item.item_color)}</td>
                <td className="border p-2">{capitalizeFirstLetter(item.item_size)}</td>
                <td className="border p-2">{item.item_quantity}</td>
              </tr>
            ))
          ) : (
            // Show "No items found" message if not loading and items is empty
            <tr>
              <td colSpan={fields.length} className="border p-2 text-center">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
