// tagSimulator/scanService.ts
import { mockTags, MockTag } from './mockTags';
import { mockItems } from '@/mockItems';

export type ScanResult = {
  tag: MockTag;
  item: typeof mockItems[number] | undefined;
};

/**
 * Simulates a single scan event.
 * Picks a random tag, updates its last_seen, and resolves the linked item.
 */
export function simulateScan(): ScanResult {
  // Pick a random tag
  const tag = mockTags[Math.floor(Math.random() * mockTags.length)];

  // Update last_seen + status
  tag.last_seen = new Date().toISOString();
  tag.tracking_status = 'active';

  // Find linked item
  const item = mockItems.find(i => i.item_id === tag.item_id);

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
  const timer = setInterval(() => {
    const result = simulateScan();
    callback(result);
  }, intervalMs);

  // Return stop function
  return () => clearInterval(timer);
}
