import { DatabaseService } from '../services/database.service';

export class MigrationResetCommand {
  async execute(): Promise<void> {
    try {
      const dbService = new DatabaseService();
      const connection = await dbService.getConnection();

      console.log('Rolling back all migrations...');
      const migrationsTable = connection.options.migrationsTableName || 'migrations';
      let executedMigrations = await connection.query(`SELECT * FROM ${migrationsTable}`);

      while (executedMigrations.length > 0) {
        await connection.undoLastMigration({ transaction: 'all' });
        executedMigrations = await connection.query(`SELECT * FROM ${migrationsTable}`);
      }
      console.log('All migrations rolled back successfully.');

      await connection.close();
    } catch (error: any) {
      console.error('Error resetting migrations:', error?.message);
    }
  }
}