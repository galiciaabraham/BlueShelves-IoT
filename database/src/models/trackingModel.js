import sql from '../db.js';

export const TrackingModel = {
    async getAllTrackings() {
        const rows = await sql`SELECT * FROM item_tracking`;
        return rows;
    },

    async getTrackingById(id) {
        const rows = await sql`SELECT * FROM item_tracking WHERE id = ${id}`;
        return rows[0];
    },

    async createTracking({tracking_id, item_id, uuid, tracking_status} ) {
        const rows = await sql`
            INSERT INTO item_tracking (tracking_id, item_id, uuid, last_seen, tracking_status) VALUES (${tracking_id}, ${item_id}, ${uuid}, NOW(), ${tracking_status}) RETURNING *`;
        return rows[0];
    },

    async updateTracking(id, {tracking_id, item_id, uuid, last_seen, tracking_status}) {
        const rows = await sql`UPDATE item_tracking SET tracking_id = ${tracking_id}, item_id = ${item_id}, uuid = ${uuid}, last_seen = ${last_seen}, tracking_status = ${tracking_status} WHERE id = ${id} RETURNING *`;
        return rows[0];
    },

    async deleteTracking(id) {
        const rows = await sql`DELETE FROM item_tracking WHERE id = ${id} RETURNING *`;
        return rows[0];
    },
};