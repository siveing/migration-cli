import { createConnection } from 'typeorm';
import * as path from 'path';

export class MigrationRollbackCommand {
    async execute(): Promise<void> {
        try {
            const connection = await createConnection({
                type: 'postgres', // Adjust based on your DB
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '5432') || 5432,
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || 'password',
                database: process.env.DB_DATABASE || 'test',
                entities: [path.resolve(process.cwd(), 'src/**/*.entity{.ts,.js}')],
                migrations: [path.resolve(process.cwd(), 'src/migrations/*{.ts,.js}')],
                migrationsTableName: 'migrations',
            });

            await connection.undoLastMigration();
            console.log('Last migration rolled back successfully.');
            await connection.close();
        } catch (error: any) {
            console.error('Error rolling back migration:', error?.message);
        }
    }
}