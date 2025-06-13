import * as fs from 'fs';
import * as path from 'path';
import { MigrationTemplate } from '../templates/migration.template';

export class MigrationGenerateCommand {
    private readonly migrationsDir = path.resolve(process.cwd(), 'src/migrations');

    async execute(name: string): Promise<void> {
        try {
            // Ensure migrations directory exists
            if (!fs.existsSync(this.migrationsDir)) {
                fs.mkdirSync(this.migrationsDir, { recursive: true });
            }

            // Generate timestamped filename
            const timestamp = new Date().toISOString().replace(/[-T:]/g, '').split('.')[0];
            const className = `${this.toPascalCase(name)}Migration${timestamp}`;
            const fileName = `${timestamp}-${name}.ts`;

            // Generate migration content
            const content = MigrationTemplate.replace('{{className}}', className);

            // Write migration file
            const filePath = path.join(this.migrationsDir, fileName);
            fs.writeFileSync(filePath, content);

            console.log(`Migration created: ${filePath}`);
        } catch (error: any) {
            console.error('Error generating migration:', error?.message);
        }
    }

    private toPascalCase(str: string): string {
        return str
            .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
            .replace(/[-_]/g, '');
    }
}