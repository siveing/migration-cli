import { DatabaseService } from '../services/database.service';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';

export class MigrationStatusCommand {
    async execute(): Promise<void> {
        try {
            const dbService = new DatabaseService();
            const connection = await dbService.getConnection();

            // Get executed migrations from the migrations table
            const migrationsTable = connection.options.migrationsTableName || 'migrations';
            const executedMigrations = await connection.query(
                `SELECT * FROM ${migrationsTable}`
            );

            // Get all migration files
            const migrationsDir = path.resolve(process.cwd(), 'src/migrations');
            const migrationFiles = fs.readdirSync(migrationsDir)
                .filter(file => file.endsWith('.ts'))
                .map(file => ({
                    name: file.replace(/\.ts$/, ''),
                    timestamp: parseInt(file.split('-')[0], 10)
                }));

            console.log(chalk.green('Migration Status:'));
            console.log(chalk.blue('-----------------'));
            console.log(chalk.blue('Ran | Migration'));
            console.log(chalk.blue('-----------------'));
            
           

            for (const migration of migrationFiles) {
                const isExecuted = executedMigrations.some(
                    (m: any) => m.name === migration.name
                );
                console.log(`${isExecuted ? chalk.green('[x]') : chalk.red('[ ]')} | ${migration.name}`);
            }

            await connection.close();
        } catch (error: any) {
            console.error(chalk.red('Error checking migration status:', error.message));
        }
    }
}