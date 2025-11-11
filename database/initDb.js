import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } 
});

async function init() {
    try {
        const schema = fs.readFileSync('database/schema.sql', 'utf-8');
        await pool.query(schema);
        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
await pool.end();
}

init();
