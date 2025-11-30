// tagSimulator/mockTags.ts

export type MockTag = {
  item_id: number;              // links to items table (0 = not registered)
  uuid: string;                 // unique identifier for the tag
  last_seen: string;            // ISO timestamp string
  tracking_status: 'active' | 'inactive' | 'lost'; // matches DB schema
};

// Simulated tags aligned with your database items + 3 unregistered tags
export const mockTags: MockTag[] = [
  // Registered tags from seed.sql
  {
    item_id: 1,
    uuid: 'UUID-001',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 2,
    uuid: 'UUID-002',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 3,
    uuid: 'UUID-003',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },

  // Tags for items 4–11 (new UUIDs assigned for simulation)
  {
    item_id: 4,
    uuid: 'UUID-004',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 5,
    uuid: 'UUID-005',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 6,
    uuid: 'UUID-006',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 7,
    uuid: 'UUID-007',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 8,
    uuid: 'UUID-008',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 9,
    uuid: 'UUID-009',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 10,
    uuid: 'UUID-010',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    item_id: 11,
    uuid: 'UUID-011',
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },

  // Extra unregistered tags (item_id = 0)
  {
    item_id: 0,
    uuid: 'UUID-100',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
  {
    item_id: 0,
    uuid: 'UUID-101',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
  {
    item_id: 0,
    uuid: 'UUID-102',
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
];
