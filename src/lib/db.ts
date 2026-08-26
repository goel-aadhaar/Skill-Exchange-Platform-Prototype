import { Pool } from 'pg';

let pool: Pool;

const getPool = () => {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      'postgresql://neondb_owner:npg_Ascn7UR5MDGo@ep-weathered-unit-axtvac9s-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  return pool;
};

export async function query<T = any>(text: string, params?: any[]): Promise<{ rows: T[]; rowCount: number | null }> {
  const client = await getPool().connect();
  try {
    const res = await client.query(text, params);
    return { rows: res.rows, rowCount: res.rowCount };
  } finally {
    client.release();
  }
}

export default getPool;
