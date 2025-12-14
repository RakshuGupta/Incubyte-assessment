import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

// Use absolute path to avoid issues with different working directories
const isDevelopment = process.env.NODE_ENV !== 'production';
const dbPath = process.env.DB_PATH || (isDevelopment 
  ? path.resolve(process.cwd(), 'sweet_shop.db')
  : path.resolve(__dirname, '../../sweet_shop.db'));

// Ensure the database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db: Database | null = null;

// Initialize database connection and schema
export const initDatabase = async (): Promise<Database> => {
  if (db) {
    return db;
  }

  try {
    console.log(`Initializing database at: ${dbPath}`);
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Enable foreign keys
    await db.exec('PRAGMA foreign_keys = ON');

    // Users table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Sweets table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS sweets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL CHECK (price >= 0),
        quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await db.exec(`
      CREATE INDEX IF NOT EXISTS idx_sweets_category ON sweets(category);
      CREATE INDEX IF NOT EXISTS idx_sweets_name ON sweets(name);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    `);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Get database instance (initialize if needed)
export const getDb = async (): Promise<Database> => {
  if (!db) {
    return await initDatabase();
  }
  return db;
};

// Close database connection
export const closeDatabase = async (): Promise<void> => {
  if (db) {
    await db.close();
    db = null;
  }
};

// Database will be initialized when server starts

// Close database on process exit
process.on('exit', async () => {
  await closeDatabase();
});

process.on('SIGINT', async () => {
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDatabase();
  process.exit(0);
});
