// tagSimulator/mockTags.ts

export type MockTag = {
  item_id: number;              // links to items table (0 = not registered)
  uuid: string;                 // unique identifier for the tag
  last_seen: string;            // ISO timestamp string
  tracking_status: 'active' | 'inactive' | 'lost'; // matches DB schema
};

// Simulated tags aligned with your seeded items + new unregistered tags
export const mockTags: MockTag[] = [
  // Registered tags (linked to seeded items)
  {
    item_id: 1,
    uuid: 'UUID-001',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
  {
    item_id: 2,
    uuid: 'UUID-002',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
  {
    item_id: 3,
    uuid: 'UUID-003',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },

  // New tags that must be registered (no matching item in DB)
  {
    item_id: 0, // placeholder to indicate not registered
    uuid: 'UUID-004',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
  {
    item_id: 0,
    uuid: 'UUID-005',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
  {
    item_id: 0,
    uuid: 'UUID-006',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
];
