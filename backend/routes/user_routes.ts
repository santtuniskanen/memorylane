import express from 'express';
import type { Request, Response } from 'express';
import UserService from '../services/user_service';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: errorMessage });
    }
})

router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await UserService.getUserByID(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: errorMessage });
    }
})

router.post('/users', async (req: Request, res: Response) => {
    const { firstname, lastname, username, email, password } = req.body;
    try {
        const emailExists = await UserService.userExistsByEmail(email);
        const userExists = await UserService.userExistsByUsername(username);

        if (emailExists) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        if (userExists) {
            return res.status(400).json({ error: 'User with this username already exists '});
        }

        await UserService.createUser({ firstname, lastname, username, email, password });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Error creating user:', errorMessage);
        res.status(500).json({ error: errorMessage })
    }
})

router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const user_id = parseInt(req.params.id);
        await UserService.DeleteUser(user_id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage === 'User not found') {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: errorMessage });
        }
    }
})

export default router;