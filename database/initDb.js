import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } 
});

async function init() {
    const mode = process.argv[2];

    //Find the schema and seed file paths
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const schemaPath = path.join(__dirname, 'schema.sql');
    const seedPath = path.join(__dirname, 'seed.sql');
    console.log("Connecting to database:", process.env.DATABASE_URL);
    try {
        if (mode === 'rebuild' || mode === 'reset') {
            await pool.query(`
                DROP TABLE IF EXISTS item_tracking CASCADE;
                DROP TABLE IF EXISTS items CASCADE;
                DROP TABLE IF EXISTS users CASCADE;
            `);
            console.log('Existing tables dropped.');
        }

        // Read the SQL files
        const schema = fs.readFileSync(schemaPath, 'utf-8');
        const seed = fs.readFileSync(seedPath, 'utf-8');

        //Run schema first
        console.log('Initializing database schema...');
        await pool.query(schema);
        console.log('Schema initialized successfully.');
        //Run seed data next
        console.log('Seeding database with initial data...');
        await pool.query(seed);
        console.log('Database seeded successfully.');

    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await pool.end();
        console.log('Database connection closed.');
    }
}

init();
