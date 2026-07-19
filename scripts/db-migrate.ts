import { runMigrations } from '../src/lib/ai/db/migrate';

runMigrations();
console.log('Database migrations completed.');
