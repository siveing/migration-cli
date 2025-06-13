import { createConnection, Connection } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';

export class DatabaseService {
    async getConnection(): Promise<Connection> {
        const configPath = path.resolve(process.cwd(), 'nest-migrate.json');
        console.log("configPath", configPath);

        let config: any = {};
        if (fs.existsSync(configPath)) {
            config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        }

        return createConnection({
            type: (config.db?.type || process.env.DB_TYPE) as any || 'postgres',
            host: config.db?.host || process.env.DB_HOST || 'localhost',
            port: config.db?.port || parseInt(process.env.DB_PORT || '5432') || 5432,
            username: config.db?.username || process.env.DB_USERNAME || 'root',
            password: config.db?.password || process.env.DB_PASSWORD || 'password',
            database: config.db?.database || process.env.DB_DATABASE || 'test',
            entities: [path.resolve(process.cwd(), 'dist/**/*.entity.js')],
            migrations: [path.resolve(process.cwd(), 'dist/migrations/*.js')],
            migrationsTableName: 'migrations',
        });
    }
}