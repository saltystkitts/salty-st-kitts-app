import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("railway.internal")
    ? false
    : { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });

// Create tables if they don't exist
export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS stops (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      tip TEXT NOT NULL,
      duration TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      area TEXT NOT NULL,
      featured BOOLEAN NOT NULL DEFAULT false,
      visible BOOLEAN NOT NULL DEFAULT true,
      image_url TEXT,
      parking TEXT,
      smoking TEXT,
      kids_ok TEXT,
      wifi TEXT,
      payment TEXT,
      dresscode TEXT,
      best_time TEXT,
      vibe TEXT,
      closed_note TEXT
    );

    CREATE TABLE IF NOT EXISTS salt_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      preview TEXT NOT NULL,
      body TEXT NOT NULL,
      emoji TEXT NOT NULL DEFAULT '🌊',
      tag TEXT NOT NULL DEFAULT 'Local Tips',
      visible BOOLEAN NOT NULL DEFAULT true
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Seed default unlock codes if not set
  await pool.query(`
    INSERT INTO app_settings (key, value) VALUES
      ('unlock_code_paid', 'SALTY869'),
      ('unlock_code_friends', 'SALTYFAM'),
      ('stripe_link', 'https://buy.stripe.com/8x200c8P86CgdsQg5XgEg0S')
    ON CONFLICT (key) DO NOTHING;
  `);
}
