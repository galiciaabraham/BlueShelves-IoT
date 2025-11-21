

export async function fetchAllItems() {
  try {
    const response = await fetch('https://blueshelves-iot.onrender.com/api/items');
    return response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
  
} 