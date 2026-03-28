import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { DbSchema, INITIAL_DATA } from './data-schemas';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

export function getDb(): DbSchema {
  if (!fs.existsSync(DB_PATH)) {
    // If file doesn't exist, we need to initialize it.
    // This part is tricky in a serverless/Next.js environment if it happens at runtime.
    // Better to have an init script or handle it gracefully.
    return initializeDb();
  }
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export function saveDb(data: DbSchema) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function initializeDb(): DbSchema {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('12345678', salt);

  const data: DbSchema = {
    ...INITIAL_DATA,
    user: {
      username: 'warpas-sza',
      passwordHash: passwordHash
    }
  };

  saveDb(data);
  return data;
}
