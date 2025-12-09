// src/components/EditUserModal.tsx
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getUserByEmail, updateUser } from '@/api/services';
import { Modal } from './Modal';
import { UpdateUserSchema } from '@/schemas';
import z from 'zod';

interface EditUserModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserModal({ isOpen, onClose, user, onSuccess }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
    });
  }, [user]);

  // Handle input changes
  // Can be moved into a hook or utility file later along with 
  // the one in other components
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = UpdateUserSchema.parse({ ...formData, id: user.id });

      // Check if email is not in use
      const data = await getUserByEmail(formData.email);
      if (data) {
          setErrors({ email: 'Email already in use' });
          return;
      }

      await updateUser(user.id, { ...validatedData, role: user.role, password: user.password, updated_at: new Date(Date.now()) });
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
        console.error("Failed to update user:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.email}</p>}
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
