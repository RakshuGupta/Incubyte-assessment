import { getDb, closeDatabase } from './database';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    const db = await getDb();
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await db.run(
      `INSERT OR IGNORE INTO users (username, email, password_hash, role) 
       VALUES (?, ?, ?, ?)`,
      ['admin', 'admin@sweetshop.com', adminPassword, 'admin']
    );

    // Create sample sweets
    const sweets = [
      { name: 'Chocolate Bar', category: 'Chocolate', price: 5.99, quantity: 100 },
      { name: 'Gummy Bears', category: 'Gummies', price: 3.99, quantity: 150 },
      { name: 'Lollipop', category: 'Hard Candy', price: 1.99, quantity: 200 },
      { name: 'Caramel', category: 'Caramel', price: 4.99, quantity: 80 },
      { name: 'Jelly Beans', category: 'Gummies', price: 6.99, quantity: 120 },
      { name: 'Marshmallow', category: 'Soft Candy', price: 2.99, quantity: 90 },
    ];

    for (const sweet of sweets) {
      await db.run(
        `INSERT OR IGNORE INTO sweets (name, category, price, quantity) 
         VALUES (?, ?, ?, ?)`,
        [sweet.name, sweet.category, sweet.price, sweet.quantity]
      );
    }

    console.log('Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('  Email: admin@sweetshop.com');
    console.log('  Password: admin123');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(async () => {
      await closeDatabase();
      process.exit(0);
    })
    .catch(async (error) => {
      console.error(error);
      await closeDatabase();
      process.exit(1);
    });
}
