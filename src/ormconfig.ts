import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
export const sqliteConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db_user.sqlite',
  synchronize: true,
  entities: ['dist/**/*.entity{.js,.ts}'],
};
