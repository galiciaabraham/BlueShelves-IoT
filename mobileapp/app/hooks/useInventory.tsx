import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { fetchAllItems } from '@/components/services/inventoryService';
import { Item } from '@/types/itemTypes';

export default function useInventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  async function loaditems() {
    try {
        setLoading(true);
        const data = await fetchAllItems();
        setItems(data);
        setError("");
    } catch (err) {
        setError("Failed to load items");
    } finally {
        setLoading(false);
    }
  }

 useFocusEffect(
    useCallback(() => {
      loaditems();
    }, [])
  );

    return { items, loading, error, refresh: loaditems };

}