import { Item } from '@/types/itemTypes';

const API_URL = 'https://blueshelves-iot.onrender.com';

export async function fetchAllItems() {
  try {
    const response = await fetch(`${API_URL}/items`);
    return response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}  

export async function createItem(itemData: any ) {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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