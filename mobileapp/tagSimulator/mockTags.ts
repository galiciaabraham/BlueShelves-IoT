// tagSimulator/mockTags.ts

export type MockTag = {
  item_id: number;              // links to items table
  uuid: string;                 // unique identifier for the tag
  last_seen: string;            // ISO timestamp string
  tracking_status: 'active' | 'inactive' | 'lost'; // matches DB schema
};

// Simulated tags aligned with your seeded items
export const mockTags: MockTag[] = [
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
];
