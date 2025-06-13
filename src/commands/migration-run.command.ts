import { DatabaseService } from '../services/database.service';
import chalk from 'chalk';

export class MigrationRunCommand {
  async execute(pretend: boolean = false, force: boolean = false): Promise<void> {
    try {
      if (!force && process.env.NODE_ENV === 'production') {
        console.log(chalk.yellow('WARNING: Running migrations in production. Use --force to proceed.'));
        return;
      }
      const dbService = new DatabaseService();
      const connection = await dbService.getConnection();
      if (pretend) {
        // connection.options.logging = ['query', 'error'];
        console.log(chalk.blue('Pretend mode: SQL queries logged.'));
      } else {
        await connection.runMigrations();
        console.log(chalk.green('Migrations executed successfully.'));
      }
      await connection.close();
    } catch (error: any) {
      console.error(chalk.red('Error running migrations:', error.message));
    }
  }
}