import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";
import path from "path";

const sqlite = new Database(path.join(process.cwd(), "stkitts.db"));
export const db = drizzle(sqlite, { schema });

// Create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    tip TEXT NOT NULL,
    duration TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    area TEXT NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0,
    visible INTEGER NOT NULL DEFAULT 1,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS salt_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    preview TEXT NOT NULL,
    body TEXT NOT NULL,
    emoji TEXT NOT NULL DEFAULT '🌊',
    tag TEXT NOT NULL DEFAULT 'Local Tips',
    visible INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );
`);

// Safely add columns for schema upgrades
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN visible INTEGER NOT NULL DEFAULT 1`); } catch {}
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN parking TEXT`); } catch {}
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN smoking TEXT`); } catch {}
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN kids_ok TEXT`); } catch {}
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN wifi TEXT`); } catch {}
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN payment TEXT`); } catch {}
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN dresscode TEXT`); } catch {}
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN best_time TEXT`); } catch {}
try { sqlite.exec(`ALTER TABLE stops ADD COLUMN vibe TEXT`); } catch {}
