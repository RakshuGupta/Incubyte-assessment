"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const database_1 = require("./database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedDatabase = async () => {
    try {
        const db = await (0, database_1.getDb)();
        // Create admin user
        const adminPassword = await bcryptjs_1.default.hash('admin123', 10);
        await db.run(`INSERT OR IGNORE INTO users (username, email, password_hash, role) 
       VALUES (?, ?, ?, ?)`, ['admin', 'admin@sweetshop.com', adminPassword, 'admin']);
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
            await db.run(`INSERT OR IGNORE INTO sweets (name, category, price, quantity) 
         VALUES (?, ?, ?, ?)`, [sweet.name, sweet.category, sweet.price, sweet.quantity]);
        }
        console.log('Database seeded successfully!');
        console.log('Admin credentials:');
        console.log('  Email: admin@sweetshop.com');
        console.log('  Password: admin123');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
};
exports.seedDatabase = seedDatabase;
// Run if called directly
if (require.main === module) {
    (0, exports.seedDatabase)()
        .then(async () => {
        await (0, database_1.closeDatabase)();
        process.exit(0);
    })
        .catch(async (error) => {
        console.error(error);
        await (0, database_1.closeDatabase)();
        process.exit(1);
    });
}
//# sourceMappingURL=seed.js.map