#!/usr/bin/env node

import { Command } from 'commander';
import { MigrationGenerateCommand } from './commands/migration-generate.command';
import { MigrationRunCommand } from './commands/migration-run.command';
import { MigrationRollbackCommand } from './commands/migration-rollback.command';
import { MigrationStatusCommand } from './commands/migration-status.command';
import { MigrationFreshCommand } from './commands/migration-fresh.command';
import { MigrationRefreshCommand } from './commands/migration-refresh.command';
import { MigrationResetCommand } from './commands/migration-reset.command';
import { SeedGenerateCommand } from './commands/seed-generate.command';
import { SeedRunCommand } from './commands/seed-run.command';

const program = new Command();

program
    .name('nest-migrate')
    .description('CLI tool for managing TypeORM migrations in NestJS projects')
    .version('1.0.0');
    
program
    .command('make:migration')
    .description('Generate a new TypeORM migration file')
    .argument('<name>', 'Name of the migration')
    .action(async (name: string) => {
        const migrationGenerate = new MigrationGenerateCommand();
        await migrationGenerate.execute(name);
    });

program
    .command('migrate')
    .description('Run pending TypeORM migrations')
    .option('--pretend', 'Log SQL queries without executing')
    .action(async (options) => {
        const migrationRun = new MigrationRunCommand();
        await migrationRun.execute();
    });

program
    .command('rollback')
    .description('Rollback the last batch of TypeORM migrations')
    .action(async () => {
        const migrationRollback = new MigrationRollbackCommand();
        await migrationRollback.execute();
    });

program
    .command('migrate:status')
    .description('Show the status of migrations')
    .action(async () => {
        const migrationStatus = new MigrationStatusCommand();
        await migrationStatus.execute();
    });

program
    .command('migrate:refresh')
    .description('Rollback and re-run all migrations')
    .action(async () => {
        const migrationRefresh = new MigrationRefreshCommand();
        await migrationRefresh.execute();
    });

program
    .command('migrate:reset')
    .description('Rollback all migrations')
    .action(async () => {
        const migrationReset = new MigrationResetCommand();
        await migrationReset.execute();
    });

program
    .command('migrate:fresh')
    .description('Drop all tables and re-run migrations')
    .action(async () => {
        const migrationFresh = new MigrationFreshCommand();
        await migrationFresh.execute();
    });

program
    .command('make:seed')
    .description('Generate a new seed file')
    .argument('<name>', 'Name of the seed')
    .action(async (name: string) => {
        const seedGenerate = new SeedGenerateCommand();
        await seedGenerate.execute(name);
    });

program
    .command('db:seed')
    .description('Run all seed files')
    .action(async () => {
        const seedRun = new SeedRunCommand();
        await seedRun.execute();
    });

program.parse(process.argv);