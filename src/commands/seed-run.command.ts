import * as fs from 'fs';
import * as path from 'path';
import { DatabaseService } from '../services/database.service';

export class SeedRunCommand {
  private readonly seedsDir = path.resolve(process.cwd(), 'src/seeds');

  async execute(): Promise<void> {
    try {
      const dbService = new DatabaseService();
      const connection = await dbService.getConnection();

      const seedFiles = fs.readdirSync(this.seedsDir).filter(file => file.endsWith('.ts'));
      for (const file of seedFiles) {
        const seedClass = await import(path.join(this.seedsDir, file));
        const seedInstance = new seedClass[Object.keys(seedClass)[0]]();
        await seedInstance.run(connection);
        console.log(`Seed executed: ${file}`);
      }

      await connection.close();
    } catch (error: any) {
      console.error('Error running seeds:', error.message);
    }
  }
}