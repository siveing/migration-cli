import * as fs from 'fs';
import * as path from 'path';
import { SeedTemplate } from '../templates/seed.template';

export class SeedGenerateCommand {
  private readonly seedsDir = path.resolve(process.cwd(), 'src/seeds');

  async execute(name: string): Promise<void> {
    try {
      if (!fs.existsSync(this.seedsDir)) {
        fs.mkdirSync(this.seedsDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[-T:]/g, '').split('.')[0];
      const className = `${this.toPascalCase(name)}Seed${timestamp}`;
      const fileName = `${timestamp}-${name}.ts`;
      const content = SeedTemplate.replace('{{className}}', className);
      const filePath = path.join(this.seedsDir, fileName);

      fs.writeFileSync(filePath, content);
      console.log(`Seed created: ${filePath}`);
    } catch (error: any) {
      console.error('Error generating seed:', error.message);
    }
  }

  private toPascalCase(str: string): string {
    return str
      .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
      .replace(/[-_]/g, '');
  }
}