import * as sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export class DatabaseConnection {
  public static async connect(): Promise<Database> {
    const db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
    
    await DatabaseConnection.runMigrations(db);
    return db;
  }

  private static async runMigrations(db: Database): Promise<void> {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS phones (
        id TEXT PRIMARY KEY,
        customer_id TEXT NOT NULL,
        number TEXT NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
      );
    `);
  }
}