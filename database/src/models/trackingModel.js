import sql from '../db.js';

export const TrackingModel = {
    async getAllTrackings() {
        const rows = await sql`SELECT * FROM item_tracking`;
        return rows;
    },

    async getTrackingById(tracking_id) {
        const rows = await sql`SELECT * FROM item_tracking WHERE tracking_id = ${tracking_id}`;
        return rows[0];
    },

    async createTracking({ tracking_id, item_id, tracking_status} ) {
        const rows = await sql`
            INSERT INTO item_tracking (tracking_id, item_id, last_seen, tracking_status) VALUES (${tracking_id}, ${item_id}, NOW(), ${tracking_status}) RETURNING *`;
        return rows[0];
    },

    async updateTracking(tracking_id, {item_id, last_seen, tracking_status}) {
        const rows = await sql`UPDATE item_tracking SET item_id = ${item_id}, last_seen = ${last_seen}, tracking_status = ${tracking_status} WHERE tracking_id = ${tracking_id} RETURNING *`;
        return rows[0];
    },

    async patchTracking(tracking_id, fields) {
        fields = [];
        const values = [];

        for (const key in fields) {
            fields.push(sql`${sql.identifier(key)} = ${fields[key]}`);
        }
        
        if (fields.lenght === 0) {
            throw new Error('No fields to update');
        }

        const query = sql`UPDATE item_tracking SET ${sql.join(fields, sql`, `)} WHERE tracking_id = ${tracking_id} RETURNING *`;
        const rows = await query;
        return rows[0];
    },

    async deleteTracking(tracking_id) {
        const rows = await sql`DELETE FROM item_tracking WHERE tracking_id = ${tracking_id} RETURNING *`;
        return rows[0];
    },

    async upsertTrackingList(trackingList) {
        const results = [];

        for (const t of trackingList) {
          const {
            tracking_id,
            last_seen,
            tracking_status
          } = t;
        const rows  = await sql`
          INSERT INTO item_tracking (tracking_id, last_seen, tracking_status)
          VALUES (${tracking_id}, ${last_seen}, ${tracking_status})
          ON CONFLICT (tracking_id)
          DO UPDATE SET
            last_seen = EXCLUDED.last_seen,
            tracking_status = EXCLUDED.tracking_status
          RETURNING *;
        `;
        results.push(rows[0]);
        }
        return results;
    }
};