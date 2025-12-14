"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const jwt_1 = require("../utils/jwt");
class AuthService {
    async register(data) {
        const { username, email, password } = data;
        const db = await (0, database_1.getDb)();
        // Check if user already exists
        const existingUser = await db.get('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUser) {
            throw new Error('User with this email or username already exists');
        }
        // Hash password
        const saltRounds = 10;
        const password_hash = await bcryptjs_1.default.hash(password, saltRounds);
        // Insert user
        const result = await db.run(`INSERT INTO users (username, email, password_hash, role) 
       VALUES (?, ?, ?, 'user')`, [username, email, password_hash]);
        const userId = result.lastID;
        // Get the inserted user
        const user = await db.get('SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?', [userId]);
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return { user, token };
    }
    async login(data) {
        const { email, password } = data;
        const db = await (0, database_1.getDb)();
        // Find user
        const user = await db.get('SELECT id, username, email, password_hash, role, created_at, updated_at FROM users WHERE email = ?', [email]);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        // Verify password
        const isValid = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isValid) {
            throw new Error('Invalid email or password');
        }
        const { password_hash, ...userWithoutPassword } = user;
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return { user: userWithoutPassword, token };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map