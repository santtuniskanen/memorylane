const express = require('express');
const db = require('./database');

const app = express();
const port = 8080;

app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error')
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})