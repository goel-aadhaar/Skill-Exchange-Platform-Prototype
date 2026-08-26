import { initializeDatabase, seedInitialData } from '../lib/seedDatabase';

async function main() {
  try {
    console.log('Connecting to Neon PostgreSQL and setting up schema...');
    await initializeDatabase();
    await seedInitialData();
    console.log('Setup and seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize and seed database:', error);
    process.exit(1);
  }
}

main();
