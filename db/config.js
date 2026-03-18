import { loadEnvFile } from "node:process";
import { Pool } from "pg";

loadEnvFile(".env");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;
