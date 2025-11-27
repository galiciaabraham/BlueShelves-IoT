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
            INSERT INTO item_tracking (tracking_id, item_id, last_seen, tracking_status) VALUES (${tracking_id}, ${item_id}, NOW(), ${tracking_status}) RETURNING *`;
        return rows[0];
    },

    async updateTracking(id, {tracking_id, item_id, last_seen, tracking_status}) {
        const rows = await sql`UPDATE item_tracking SET tracking_id = ${tracking_id}, item_id = ${item_id}, last_seen = ${last_seen}, tracking_status = ${tracking_status} WHERE id = ${id} RETURNING *`;
        return rows[0];
    },

    async patchTracking(id, fields) {
        fields = [];
        const values = [];

        for (const key in fields) {
            fields.push(sql`${sql.identifier(key)} = ${fields[key]}`);
        }
        
        if (fields.lenght === 0) {
            throw new Error('No fields to update');
        }

        const query = sql`UPDATE item_tracking SET ${sql.join(fields, sql`, `)} WHERE id = ${id} RETURNING *`;
        const rows = await query;
        return rows[0];
    },

    async deleteTracking(id) {
        const rows = await sql`DELETE FROM item_tracking WHERE id = ${id} RETURNING *`;
        return rows[0];
    },

    async upsertTrackingList(trackingList) {
        const results = [];

  for (const t of trackingList) {
    const {
      tracking_id,
      item_id,
      last_seen,
      tracking_status
    } = t;

    const normalizedItemId = item_id === 0 ? null : item_id;

    const query = `
      INSERT INTO trackings (tracking_id, item_id, last_seen, tracking_status)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (tracking_id)
      DO UPDATE SET
        item_id = EXCLUDED.item_id,
        last_seen = EXCLUDED.last_seen,
        tracking_status = EXCLUDED.tracking_status
      RETURNING *;
    `;

    const { rows } = await db.query(query, [
      tracking_id,
      normalizedItemId,
      last_seen,
      tracking_status
    ]);

    results.push(rows[0]);
  }

  return results; 
    }
};