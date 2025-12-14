"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInit = void 0;
const database_1 = require("./database");
// This script is mainly for reference since database is auto-initialized
// But it can be used to explicitly reinitialize if needed
const runInit = async () => {
    try {
        await (0, database_1.initDatabase)();
        console.log('Database initialization completed');
    }
    catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};
exports.runInit = runInit;
// Run if called directly
if (require.main === module) {
    (0, exports.runInit)()
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
//# sourceMappingURL=init-db.js.map