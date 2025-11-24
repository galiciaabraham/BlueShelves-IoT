// mobileapp/mockItems.ts

export type MockItem = {
  item_id: number;        // matches SERIAL PK in schema
  item_name: string;
  item_color: string;
  item_size: string;
  item_quantity: number;
  item_sku: string;
  updated_at?: string;    // optional, since DB defaults to NOW()
};

export const mockItems: MockItem[] = [
  {
    item_id: 1,
    item_name: 'Item A',
    item_color: 'Red',
    item_size: 'Large',
    item_quantity: 100,
    item_sku: 'SKU001',
    updated_at: new Date().toISOString(),
  },
  {
    item_id: 2,
    item_name: 'Item B',
    item_color: 'Blue',
    item_size: 'Medium',
    item_quantity: 200,
    item_sku: 'SKU002',
    updated_at: new Date().toISOString(),
  },
  {
    item_id: 3,
    item_name: 'Item C',
    item_color: 'Green',
    item_size: 'Small',
    item_quantity: 150,
    item_sku: 'SKU003',
    updated_at: new Date().toISOString(),
  },
];
