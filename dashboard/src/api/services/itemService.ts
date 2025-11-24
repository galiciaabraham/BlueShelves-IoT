// src/api/items/index.ts
import api from '../index';
import { Item } from '@/types/item';

export const getItems = async (): Promise<Item[]> => {
  const response = await api.get('/items');
  return response.data;
};

export const createItem = async (item: Omit<Item, 'updated_at'>): Promise<Item> => {
  const response = await api.post('/items', item);
  return response.data;
};

export const updateItem = async (itemId: number, item: Partial<Item>): Promise<Item> => {
  const response = await api.put(`/items/${itemId}`, item);
  return response.data;
};

export const deleteItem = async (itemId: number): Promise<void> => {
  await api.delete(`/items/${itemId}`);
};
