"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SweetService = void 0;
const database_1 = require("../config/database");
class SweetService {
    async create(data) {
        const { name, category, price, quantity } = data;
        const db = await (0, database_1.getDb)();
        const result = await db.run(`INSERT INTO sweets (name, category, price, quantity) 
       VALUES (?, ?, ?, ?)`, [name, category, price, quantity]);
        const sweetId = result.lastID;
        const sweet = await db.get('SELECT id, name, category, price, quantity, created_at, updated_at FROM sweets WHERE id = ?', [sweetId]);
        return sweet;
    }
    async findAll() {
        const db = await (0, database_1.getDb)();
        const sweets = await db.all('SELECT id, name, category, price, quantity, created_at, updated_at FROM sweets ORDER BY created_at DESC');
        return sweets;
    }
    async findById(id) {
        const db = await (0, database_1.getDb)();
        const sweet = await db.get('SELECT id, name, category, price, quantity, created_at, updated_at FROM sweets WHERE id = ?', [id]);
        return sweet || null;
    }
    async search(query) {
        const db = await (0, database_1.getDb)();
        let sql = 'SELECT id, name, category, price, quantity, created_at, updated_at FROM sweets WHERE 1=1';
        const params = [];
        if (query.name) {
            sql += ' AND LOWER(name) LIKE LOWER(?)';
            params.push(`%${query.name}%`);
        }
        if (query.category) {
            sql += ' AND LOWER(category) LIKE LOWER(?)';
            params.push(`%${query.category}%`);
        }
        if (query.minPrice !== undefined) {
            sql += ' AND price >= ?';
            params.push(query.minPrice);
        }
        if (query.maxPrice !== undefined) {
            sql += ' AND price <= ?';
            params.push(query.maxPrice);
        }
        sql += ' ORDER BY created_at DESC';
        const sweets = await db.all(sql, params);
        return sweets;
    }
    async update(id, data) {
        const db = await (0, database_1.getDb)();
        const updates = [];
        const params = [];
        if (data.name !== undefined) {
            updates.push('name = ?');
            params.push(data.name);
        }
        if (data.category !== undefined) {
            updates.push('category = ?');
            params.push(data.category);
        }
        if (data.price !== undefined) {
            updates.push('price = ?');
            params.push(data.price);
        }
        if (data.quantity !== undefined) {
            updates.push('quantity = ?');
            params.push(data.quantity);
        }
        if (updates.length === 0) {
            return this.findById(id);
        }
        updates.push('updated_at = CURRENT_TIMESTAMP');
        params.push(id);
        await db.run(`UPDATE sweets SET ${updates.join(', ')} WHERE id = ?`, params);
        return this.findById(id);
    }
    async delete(id) {
        const db = await (0, database_1.getDb)();
        const result = await db.run('DELETE FROM sweets WHERE id = ?', [id]);
        return (result.changes || 0) > 0;
    }
    async purchase(id, quantity) {
        const sweet = await this.findById(id);
        if (!sweet) {
            throw new Error('Sweet not found');
        }
        if (sweet.quantity < quantity) {
            throw new Error('Insufficient quantity in stock');
        }
        const newQuantity = sweet.quantity - quantity;
        return this.update(id, { quantity: newQuantity });
    }
    async restock(id, quantity) {
        const sweet = await this.findById(id);
        if (!sweet) {
            throw new Error('Sweet not found');
        }
        const newQuantity = sweet.quantity + quantity;
        return this.update(id, { quantity: newQuantity });
    }
}
exports.SweetService = SweetService;
//# sourceMappingURL=sweet.service.js.map