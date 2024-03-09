import express from 'express';
import user_routes from './routes/user_routes';

const app = express();

app.use(express.json());

app.use('/api', user_routes);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});