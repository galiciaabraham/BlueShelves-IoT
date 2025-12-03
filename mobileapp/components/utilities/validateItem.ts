import { ItemForm } from "@/types/itemTypes";    


export function validateItemFields({ item_name, item_color, item_size, item_quantity, item_sku }: ItemForm): string | null {
  if (!item_name.trim()) return "Item name is required";
  if (!item_color.trim()) return "Color is required";
  if (!item_size.trim()) return "Size is required";
  if (!item_sku.trim()) return "SKU is required";

  if (item_quantity === undefined || item_quantity === null) return "Quantity is required";
  if (isNaN(Number(item_quantity))) return "Quantity must be a valid number";
  if (Number(item_quantity) < 0) return "Quantity must be a number greater than or equal to 0";

  return null; // no errors
}
