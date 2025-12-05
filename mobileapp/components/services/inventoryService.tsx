import { Item } from '@/types/itemTypes';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_MOBILE_API_KEY;

export async function fetchAllItems() {
  try {
    const response = await fetch(`${API_URL}/items`, {
      headers: {
        'x-api-key': API_KEY || '',
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}  

export async function fetchItemById(item_id: number): Promise<Item | null> {
  try {
    const response = await fetch(`${API_URL}/items/${item_id}`, {
      headers: {
        Accept: 'application/json',
        'x-api-key': API_KEY || '',
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    return null;
  }
}

export async function createItem(itemData: any ) {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'x-api-key': API_KEY || '' },
      body: JSON.stringify(itemData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create item');
    }
    return response.json();
    
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }

}

export async function updateItem(item_id: number, itemData: any) {
    try {
      const response = await fetch(`${API_URL}/items/${item_id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'x-api-key': API_KEY || '' },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      return response.json();

    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }

export async function deleteItem(item_id: number) {
    try {
      const response = await fetch(`${API_URL}/items/${item_id}`, {
        method: 'DELETE',
        headers: { 
          'x-api-key': API_KEY || '' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      return response.json();
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  return true;
}