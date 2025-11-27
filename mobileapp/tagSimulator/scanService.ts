// tagSimulator/scanService.ts
import { mockTags, MockTag } from './mockTags';

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
  item: Item | undefined; // undefined if unregistered
};

/**
 * Fetch item details from live API
 */
async function fetchItemById(item_id: number): Promise<Item | undefined> {
  try {
    const res = await fetch(`http://localhost:3000/items/${item_id}`, {
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
export async function simulateScan(): Promise<ScanResult> {
  // Pick a random tag
  const tag = mockTags[Math.floor(Math.random() * mockTags.length)];

  // Update last_seen
  tag.last_seen = new Date().toISOString();

  // Registered tags → set active, unregistered stay lost
  if (tag.item_id !== 0) {
    tag.tracking_status = 'active';
  }

  // Fetch item from API (undefined if unregistered or not found)
  const item = tag.item_id !== 0 ? await fetchItemById(tag.item_id) : undefined;

  return { tag, item };
}

/**
 * Starts continuous scanning simulation.
 * Calls the callback every interval with a new ScanResult.
 */
export function startScan(
  callback: (result: ScanResult) => void,
  intervalMs: number = 2000
): () => void {
  const timer = setInterval(async () => {
    const result = await simulateScan();
    callback(result);
  }, intervalMs);

  // Return stop function
  return () => clearInterval(timer);
}
