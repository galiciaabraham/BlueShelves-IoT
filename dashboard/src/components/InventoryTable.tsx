'use client';
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
  return (
    <div className="px-6 py-4 max-w-5xl mx-auto overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-zinc-800">
            {fields.map((field) => (
              <th key={field.value} className="border p-2">
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
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
