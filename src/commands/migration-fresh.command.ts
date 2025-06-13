import { DatabaseService } from '../services/database.service';

export class MigrationFreshCommand {
  async execute(): Promise<void> {
    try {
      const dbService = new DatabaseService();
      const connection = await dbService.getConnection();
      
      console.log('Dropping all tables...');
      await connection.dropDatabase();
      await connection.synchronize(false); // Recreate schema without sync
      console.log('Running all migrations...');
      await connection.runMigrations();
      console.log('Database refreshed successfully.');
      
      await connection.close();
    } catch (error: any) {
      console.error('Error refreshing database:', error.message);
    }
  }
}