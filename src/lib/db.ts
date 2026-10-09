import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dbDir = path.join(process.cwd(), "data");
fs.mkdirSync(dbDir, { recursive: true });

const dbPath = path.join(dbDir, "maternova.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    auth_provider TEXT DEFAULT 'local',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

export function getDb() {
  return db;
}
