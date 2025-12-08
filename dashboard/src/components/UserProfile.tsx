// app/components/UserProfile.tsx
import { User } from '@/types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface UserProfileProps {
  user: User | null;
  isLoading: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserProfile({ user, isLoading, onEdit, onDelete }: UserProfileProps) {
  return (
    <div className="px-2"> 
        <div className="my-4 mx-auto p-6 max-w-2xl bg-white dark:bg-gray-800 rounded-lg border border-gray-400 dark:border-transparent">
        {isLoading ? (
            // Show skeleton while loading
            <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i}>
                <div className="mt-1 h-6 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                </div>
            ))}
                <div className="pt-6 border-t border-gray-200 dark:border-zinc-700 flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse w-24"></div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse w-24"></div>
                </div>
            </div>
        ) : user ? (
            // Show user data when not loading and user exists
            <>
            <div className='mb-4'>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <p className="text-lg">{user.name}</p>
            </div>
            <div className='mb-4'>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <p className="text-lg">{user.email}</p>
            </div>
            <div className='mb-4'>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                <p className="text-lg capitalize">{user.role}</p>
            </div>
            <div className='mb-4'>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Member Since</label>
                <p className="text-lg">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <div className="pt-6 border-t border-gray-200 dark:border-zinc-700 flex flex-col sm:flex-row gap-4">
                <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600 transition"
                onClick={onEdit}
                >
                    <FaEdit />
                    Edit Profile
                </button>
                <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600 transition"
                onClick={onDelete}
                >
                    <FaTrash />
                    Delete Account
                </button>
            </div>
            </>
        ) : (
            // Show "No user data" message if not loading and user is empty
            <div className="text-lg text-gray-500 dark:text-gray-400">No user data available.</div>
        )}
        </div>
    </div>
  );
}
