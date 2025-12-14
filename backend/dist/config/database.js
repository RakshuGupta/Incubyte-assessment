"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.getDb = exports.initDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
// Use absolute path to avoid issues with different working directories
const isDevelopment = process.env.NODE_ENV !== 'production';
const dbPath = process.env.DB_PATH || (isDevelopment
    ? path_1.default.resolve(process.cwd(), 'sweet_shop.db')
    : path_1.default.resolve(__dirname, '../../sweet_shop.db'));
// Ensure the database directory exists
const dbDir = path_1.default.dirname(dbPath);
if (!fs_1.default.existsSync(dbDir)) {
    fs_1.default.mkdirSync(dbDir, { recursive: true });
}
let db = null;
// Initialize database connection and schema
const initDatabase = async () => {
    if (db) {
        return db;
    }
    try {
        console.log(`Initializing database at: ${dbPath}`);
        db = await (0, sqlite_1.open)({
            filename: dbPath,
            driver: sqlite3_1.default.Database,
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
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};
exports.initDatabase = initDatabase;
// Get database instance (initialize if needed)
const getDb = async () => {
    if (!db) {
        return await (0, exports.initDatabase)();
    }
    return db;
};
exports.getDb = getDb;
// Close database connection
const closeDatabase = async () => {
    if (db) {
        await db.close();
        db = null;
    }
};
exports.closeDatabase = closeDatabase;
// Database will be initialized when server starts
// Close database on process exit
process.on('exit', async () => {
    await (0, exports.closeDatabase)();
});
process.on('SIGINT', async () => {
    await (0, exports.closeDatabase)();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await (0, exports.closeDatabase)();
    process.exit(0);
});
//# sourceMappingURL=database.js.map