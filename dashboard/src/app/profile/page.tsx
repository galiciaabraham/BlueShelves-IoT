// app/profile/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { mockUser } from '@/api/mockUser';
import { getUserById } from '@/api/services';
import { DeleteUserModal, EditUserModal, Footer, Header, UserProfile } from '@/components';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchUser = async (id: number) => {
    try {
      const data = await getUserById(id);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user, using mock data:", error);
      setUser(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      // Fetch session data
      const response = await fetch('/api/session');
      const data = await response.json();

      if (!data.authenticated) {
        window.location.href = '/login';
        return;
      }

      await fetchUser(Number(data.id));
    } catch (error) {
      console.error("Failed to get session:", error);
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    getUserData();
  }, []);


  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-black dark:bg-black dark:text-white">
      <Header />

      <UserProfile
        user={user}
        isLoading={isLoading}
        onEdit={() => setIsEditModalOpen(true)}
        onDelete={() => setIsDeleteModalOpen(true)}
      />

      {user && (
        <>
          <EditUserModal
            user={user}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSuccess={() => fetchUser(user.id)}
          />
          <DeleteUserModal
            user={user}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        </>
      )}

      <Footer />
    </div>
  );
}
