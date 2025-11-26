// src/components/EditItemModal.tsx
import { useEffect, useState } from 'react';
import { Item } from '@/types/item';
import { updateItem } from '../api/services/itemService';
import { Modal } from './Modal';
import { UpdateItemSchema } from '@/types/schema';
import z from 'zod';

interface EditItemModalProps {
  isOpen: boolean;
  item: Item;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditItemModal({ isOpen, onClose, item, onSuccess }: EditItemModalProps) {
  const [formData, setFormData] = useState({
    item_id: item.item_id,
    item_name: item.item_name,
    item_color: item.item_color,
    item_size: item.item_size,
    item_quantity: item.item_quantity,
    item_sku: item.item_sku,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when the item prop changes
  useEffect(() => {
    setFormData({
      item_id: item.item_id,
      item_name: item.item_name,
      item_color: item.item_color,
      item_size: item.item_size,
      item_quantity: item.item_quantity,
      item_sku: item.item_sku,
    });
  }, [item]);

  // Handle input changes
  // Can be moved into a hook or utility file later along with 
  // the one in CreateItemModal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = UpdateItemSchema.parse({...formData, item_id: item.item_id});
      await updateItem(item.item_id, {...validatedData, updated_at: new Date(Date.now())});
      onSuccess();
      onClose();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldErrors: Record<string, string> = {};
            error.issues.forEach((err) => {
            const path = err.path.join('.');
            fieldErrors[path] = err.message;
            });
            setErrors(fieldErrors);
      } else {
        console.error("Failed to update item:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            {errors.item_name && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.item_name}</p>} 
          </div>
          <div>
            <label className="block text-sm font-medium">Color</label>
            <input
              type="text"
              name="item_color"
              value={formData.item_color}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            {errors.item_color && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.item_color}</p>} 
          </div>
          <div>
            <label className="block text-sm font-medium">Size</label>
            <input
              type="text"
              name="item_size"
              value={formData.item_size}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            {errors.item_size && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.item_size}</p>} 
          </div>
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="item_quantity"
              value={formData.item_quantity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            {errors.item_quantity && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.item_quantity}</p>} 
          </div>
          <div>
            <label className="block text-sm font-medium">SKU</label>
            <input
              type="text"
              name="item_sku"
              value={formData.item_sku}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            {errors.item_sku && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.item_sku}</p>} 
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-700"
              >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
              Update
            </button>
          </div>
        </form>
    </Modal>
);
}
