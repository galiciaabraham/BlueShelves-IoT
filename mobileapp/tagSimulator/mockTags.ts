// tagSimulator/mockTags.ts

export type MockTag = {
  tracking_id : number,         // unique identifier for the tag
  item_id: number;              // links to items table (0 = not registered)
  last_seen: string;            // ISO timestamp string
  tracking_status: 'active' | 'inactive' | 'lost'; // matches DB schema
};

// Simulated tags aligned with your database items + 3 unregistered tags
export const mockTags: MockTag[] = [
  // Registered tags from seed.sql
  {
    tracking_id: 1,
    item_id: 1,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 2,
    item_id: 2,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 3,
    item_id: 3,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },

  // Newly generated tags for simulation
   {
    tracking_id: 140993,
    item_id: 1,
    last_seen: "2025-12-09T05:18:19.63337Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 205123,
    item_id: 1,
    last_seen: "2025-12-09T05:18:19.466207Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 380040,
    item_id: 2,
    last_seen: "2025-12-09T05:18:18.464495Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 502324,
    item_id: 2,
    last_seen: "2025-12-09T05:18:18.667163Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 905483,
    item_id: 2,
    last_seen: "2025-12-09T05:18:20.227136Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 307991,
    item_id: 3,
    last_seen: "2025-12-09T05:18:19.086133Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 317641,
    item_id: 3,
    last_seen: "2025-12-09T05:17:53.71681Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 640621,
    item_id: 3,
    last_seen: "2025-12-09T05:18:20.002283Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 743041,
    item_id: 3,
    last_seen: "2025-12-09T05:18:19.795783Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 845156,
    item_id: 3,
    last_seen: "2025-12-09T05:18:18.887686Z",
    tracking_status: "lost",
  },
  {
    tracking_id: 926929,
    item_id: 3,
    last_seen: "2025-12-09T05:18:19.286107Z",
    tracking_status: "lost",
  },

  // Tags for items 4–11 (new UUIDs assigned for simulation)
  {
    tracking_id: 4,
    item_id: 4,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 5,
    item_id: 5,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 6, 
    item_id: 6,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 7,
    item_id: 7,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 8,
    item_id: 8,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 9,
    item_id: 9,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 10,
    item_id: 10,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },
  {
    tracking_id: 11,
    item_id: 11,
    last_seen: new Date().toISOString(),
    tracking_status: 'active',
  },

  // Extra unregistered tags (item_id = 0)
  {
    item_id: 0,
    tracking_id: 100,
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
  {
    item_id: 0,
    tracking_id: 101,
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
  {
    item_id: 0,
    tracking_id: 102,
    last_seen: new Date().toISOString(),
    tracking_status: 'lost',
  },
];
