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

    async createItem({name, description, quantity = 0, sku} ) {
        const rows = await sql`
            INSERT INTO items (name, description, quantity, sku) VALUES (${name}, ${description}, ${quantity}, ${sku}) RETURNING *`;
        return rows[0];
    },

    async updateItem(id, {name, description, quantity, sku}) {
        const rows = await sql`UPDATE items SET name = ${name}, description = ${description}, quantity = ${quantity}, sku = ${sku} WHERE id = ${id} RETURNING *`;
        return rows[0];
    },

    async deleteItem(id) {
        const rows = await sql`DELETE FROM items WHERE id = ${id} RETURNING *`;
        return rows[0];
    },
};