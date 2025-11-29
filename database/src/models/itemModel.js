import sql from '../db.js';

export const ItemModel = {
    async getAllItems() {
        const rows = await sql`SELECT * FROM items`;
        return rows;
    },

    async getItemById(item_id) {
        const rows = await sql`SELECT * FROM items WHERE item_id = ${item_id}`;
        return rows[0];
    },

    async createItem({item_name, item_color, item_size, item_quantity, item_sku}) {
        const rows = await sql`
            INSERT INTO items (item_name, item_color, item_size, item_quantity, item_sku, updated_at) VALUES (${item_name}, ${item_color}, ${item_size}, ${item_quantity}, ${item_sku}, NOW()) RETURNING *`;
        return rows[0];
    },

    async updateItem(item_id, {item_name, item_color, item_size, item_quantity, item_sku}) {
        const rows = await sql`UPDATE items SET item_name = ${item_name}, item_color = ${item_color}, item_size = ${item_size}, item_quantity = ${item_quantity}, item_sku = ${item_sku}, updated_at = NOW() WHERE item_id = ${item_id} RETURNING *`;
        return rows[0];
    },

    async deleteItem(item_id) {
        const rows = await sql`DELETE FROM items WHERE item_id = ${item_id} RETURNING *`;
        return rows[0];
    },
};