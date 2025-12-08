// src/components/DeleteUserModal.tsx
import { User } from '@/types';
import { Modal } from './Modal';
import { deleteUser } from '@/api/services';
import { useRouter } from 'next/navigation';

interface DeleteUserModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;  
}

export default function DeleUserModal({
  isOpen,
  user,
  onClose,
}: DeleteUserModalProps) {
  const router = useRouter(); 

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id);
      onClose();
      handleLogout();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleLogout = async () => {
      try {
      const response = await fetch("/api/session/logout", {
          method: "POST",
      });
  
      if (response.ok) {
          router.push("/login");
      }
      } catch (error) {
      console.error("Logout failed:", error);
      }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-6">
        Are you sure you want to delete the account for <strong>{user.name}</strong>? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDeleteUser}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
