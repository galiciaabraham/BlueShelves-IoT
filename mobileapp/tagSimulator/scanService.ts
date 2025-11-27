// tagSimulator/scanService.ts
import { mockTags, MockTag } from './mockTags';
import { API_BASE_URL } from '@/config'; // ✅ use central config

export type Item = {
  item_id: number;
  item_name: string;
  item_color: string;
  item_size: string;
  item_quantity: number;
  item_sku: string;
  updated_at: string;
};

export type ScanResult = {
  tag: MockTag;
  item?: Item;
  tracking_id: number;};

/**
 * Fetch item details from live API
 */
async function fetchItemById(item_id: number): Promise<Item | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/items/${item_id}`, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return undefined; // item not found or error
    }

    return await res.json();
  } catch (err) {
    console.error('Error fetching item:', err);
    return undefined;
  }
}

/**
 * Simulates a single scan event.
 * Picks a random tag, updates its last_seen, and resolves the linked item via API.
 */
export async function simulateScan() {
  // Pick a random tag
  const tag = mockTags[Math.floor(Math.random() * mockTags.length)];

  // Return the tracking_id
  return { tracking_id: tag.tracking_id };
}

/**
 * Starts continuous scanning simulation.
 * Calls the callback every interval with a new ScanResult.
 */
export function startScan(
  callback: (result: { tracking_id: number }) => void,
  intervalMs: number = 2000
): () => void {
  const timer = setInterval(async () => {
    const result = await simulateScan();
    callback(result);
  }, intervalMs);

  // Return stop function
  return () => clearInterval(timer);
}
