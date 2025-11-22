const API_URL = 'https://blueshelves-iot.onrender.com';

export async function fetchAllItems() {
  try {
    const response = await fetch(`${API_URL}/items`);
    return response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
  
} 