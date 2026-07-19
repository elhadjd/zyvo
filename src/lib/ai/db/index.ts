import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import fs from 'fs';
import path from 'path';
import * as schema from './schema';

const DEFAULT_DB_PATH = path.join(process.cwd(), 'data', 'ai-content.sqlite');

function resolveDbPath(): string {
  return process.env.DATABASE_PATH ?? DEFAULT_DB_PATH;
}

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

function ensureDataDir(dbPath: string): void {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getDb() {
  if (dbInstance) return dbInstance;

  const dbPath = resolveDbPath();
  ensureDataDir(dbPath);

  const sqlite = new Database(dbPath);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');

  dbInstance = drizzle(sqlite, { schema });
  return dbInstance;
}

export function isDatabaseAvailable(): boolean {
  try {
    getDb();
    return true;
  } catch {
    return false;
  }
}

export { schema };
