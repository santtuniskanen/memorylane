// user_routes.ts

import express from 'express';
import type { Request, Response } from 'express';
import UserService from '../services/user_service';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    try {
        console.log('GET /users route handler invoked'); // Debug statement
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error in GET /users route:', error); // Debug statement
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: errorMessage });
    }
})

export default router;