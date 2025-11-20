import sql from '../db.js';

export const UserModel = {
    async getAllUsers() {
        const rows = await sql`SELECT * FROM users`;
        return rows;
    },

    async getUserById(id) {
        const rows = await sql`SELECT * FROM users WHERE id = ${id}`;
        return rows[0];
    },

    async createUser({name, email, password, role} ) {
        const rows = await sql`
            INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES (${name}, ${email}, ${password}, ${role}, NOW(), NOW()) RETURNING *`;
        return rows[0];
    },

    async updateUser(id, {name, email, password, role}) {
        const rows = await sql`UPDATE users SET name = ${name}, email = ${email}, password = ${password}, role = ${role}, updated_at = NOW() WHERE id = ${id} RETURNING *`;
        return rows[0];
    },

    async deleteUser(id) {
        const rows = await sql`DELETE FROM users WHERE id = ${id} RETURNING *`;
        return rows[0];
    },
};