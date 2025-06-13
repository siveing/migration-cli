export const MigrationTemplate = `
import { MigrationInterface, QueryRunner } from 'typeorm';

export class {{className}} implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Define your schema changes here
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Define rollback logic here
  }
}
`;