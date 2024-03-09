import { Pool } from 'pg';
import type { QueryResult } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'web_planner'
});

interface QueryFunction {
    (text: string, params?: any[]): Promise<QueryResult<any>>;
}
const query: QueryFunction = async (text, params) => {
    return await pool.query(text, params);
}

export default {
    query
}