export const SeedTemplate = `
import { Connection } from 'typeorm';

export class {{className}} {
  public async run(connection: Connection): Promise<void> {
    // Define your seeding logic here
  }
}
`;