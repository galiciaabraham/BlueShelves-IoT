// src/api/services/index.ts
import api from '../index';
import { User } from '@/types/user';

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await api.get(`/users/email/${email}`);
  return response.data;
};

export const createUser = async (user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
