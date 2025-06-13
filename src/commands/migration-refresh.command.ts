import { DatabaseService } from '../services/database.service';

export class MigrationRefreshCommand {
  async execute(): Promise<void> {
    try {
      const dbService = new DatabaseService();
      const connection = await dbService.getConnection();
      
      console.log('Rolling back all migrations...');
      await connection.undoLastMigration({ transaction: 'all' });
      console.log('Running all migrations...');
      await connection.runMigrations();
      console.log('Migrations refreshed successfully.');
      
      await connection.close();
    } catch (error: any) {
      console.error('Error refreshing migrations:', error.message);
    }
  }
}