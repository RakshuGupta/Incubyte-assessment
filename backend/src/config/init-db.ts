import { initDatabase, closeDatabase } from './database';

// This script is mainly for reference since database is auto-initialized
// But it can be used to explicitly reinitialize if needed
export const runInit = async () => {
  try {
    await initDatabase();
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  runInit()
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
