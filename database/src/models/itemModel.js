import sql from '../db.js';

export const ItemModel = {
    async getAllItems() {
        const rows = await sql`SELECT * FROM items`;
        return rows;
    },

    async getItemById(id) {
        const rows = await sql`SELECT * FROM items WHERE id = ${id}`;
        return rows[0];
    },

    async createItem({item_name, item_color, item_size, item_quantity, item_sku}) {
        const rows = await sql`
            INSERT INTO items (item_name, item_color, item_size, item_quantity, item_sku) VALUES (${item_name}, ${item_color}, ${item_size}, ${item_quantity}, ${item_sku}) RETURNING *`;
        return rows[0];
    },

    async updateItem(id, {item_name, item_color, item_size, item_quantity, item_sku}) {
        const rows = await sql`UPDATE items SET item_name = ${item_name}, item_color = ${item_color}, item_size = ${item_size}, item_quantity = ${item_quantity}, item_sku = ${item_sku} WHERE id = ${id} RETURNING *`;
        return rows[0];
    },

    async deleteItem(id) {
        const rows = await sql`DELETE FROM items WHERE id = ${id} RETURNING *`;
        return rows[0];
    },
};