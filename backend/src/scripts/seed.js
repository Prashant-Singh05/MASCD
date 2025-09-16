import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  const sqlPath = path.resolve('src/seeders/seed.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });
  await conn.query(sql);
  await conn.end();
  console.log('Seed executed.');
}

run().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});
