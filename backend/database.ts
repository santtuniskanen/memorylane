const { Pool } = require('pg');

const pool = new Pool({
    user: 'santeri',
    password: 'santeri123',
    host: 'localhost',
    port: 5432,
    database: 'web_planner'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};