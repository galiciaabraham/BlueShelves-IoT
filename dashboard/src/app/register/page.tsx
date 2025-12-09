// src/app/register/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'; 
import { User } from '@/types';
import * as bcrypt from 'bcryptjs';
import { createUser, getUserByEmail } from '@/api/services';
import { Modal } from '@/components';
import z from 'zod';
import { CreateUserSchema } from '@/schemas/';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<User, 'id' | 'role' | 'created_at' | 'updated_at'>>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  // Can be moved into a hook or utility file later along with 
  // the one in other components
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      CreateUserSchema.parse(formData);
      const { email, password, name } = formData;
        
      // Check if email is not in use
      const user = await getUserByEmail(email);
      if (user) {
          setErrors({ email: 'Email already in use' });
          return;
      }

      // Hash the password using bcryptjs
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Send the new user to API
      await createUser({
        email,
        password: hashedPassword,
        name,
        role: "user",
      });
      router.push('/login');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path.join('.');
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Failed to register user.", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-linear-to-b from-white dark:from-gray-500 to-blue-500 ">
        <Modal>
        <Image 
            src="/logo-192x192.png"
            alt="Blueshelves Logo"
            width={50} 
            height={50}
            className="mx-auto mb-4"
        />
        <h2 className="text-xl font-bold mb-4">Register</h2>
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
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
            <label className="block text-sm font-medium">Password</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex justify-end space-x-3">
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Register
            </button>
            </div>
        </form>
        <p className="mt-4 text-sm text-center">
          {`Already have an account? `}
          <Link href="/login" className="text-blue-600 underline">
            Sign in
          </Link>
        </p>
        </Modal>
    </div>
  );
}
