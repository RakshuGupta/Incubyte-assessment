import { getDb } from '../config/database';
import { Sweet, CreateSweetRequest, UpdateSweetRequest, SearchQuery } from '../types';

export class SweetService {
  async create(data: CreateSweetRequest): Promise<Sweet> {
    const { name, category, price, quantity } = data;
    const db = await getDb();

    const result = await db.run(
      `INSERT INTO sweets (name, category, price, quantity) 
       VALUES (?, ?, ?, ?)`,
      [name, category, price, quantity]
    );
    
    const sweetId = result.lastID as number;

    const sweet = await db.get(
      'SELECT id, name, category, price, quantity, created_at, updated_at FROM sweets WHERE id = ?',
      [sweetId]
    ) as Sweet;

    return sweet;
  }

  async findAll(): Promise<Sweet[]> {
    const db = await getDb();
    const sweets = await db.all(
      'SELECT id, name, category, price, quantity, created_at, updated_at FROM sweets ORDER BY created_at DESC'
    ) as Sweet[];
    
    return sweets;
  }

  async findById(id: number): Promise<Sweet | null> {
    const db = await getDb();
    const sweet = await db.get(
      'SELECT id, name, category, price, quantity, created_at, updated_at FROM sweets WHERE id = ?',
      [id]
    ) as Sweet | undefined;
    
    return sweet || null;
  }

  async search(query: SearchQuery): Promise<Sweet[]> {
    const db = await getDb();
    let sql = 'SELECT id, name, category, price, quantity, created_at, updated_at FROM sweets WHERE 1=1';
    const params: any[] = [];

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

    const sweets = await db.all(sql, params) as Sweet[];
    return sweets;
  }

  async update(id: number, data: UpdateSweetRequest): Promise<Sweet | null> {
    const db = await getDb();
    const updates: string[] = [];
    const params: any[] = [];

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

    await db.run(
      `UPDATE sweets SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.run('DELETE FROM sweets WHERE id = ?', [id]);
    return (result.changes || 0) > 0;
  }

  async purchase(id: number, quantity: number): Promise<Sweet | null> {
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

  async restock(id: number, quantity: number): Promise<Sweet | null> {
    const sweet = await this.findById(id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }

    const newQuantity = sweet.quantity + quantity;
    return this.update(id, { quantity: newQuantity });
  }
}
