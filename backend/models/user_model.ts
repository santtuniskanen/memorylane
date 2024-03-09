// user_model.ts

import db from '../config/database';

export interface User {
    user_id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

class UserModel {
    static async findAll(): Promise<User[]> {
        const query = 'SELECT * FROM users';
        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            throw new Error('Error fetching findAll');
        }
    }

    static async CreateUser(user: User): Promise<void> {
        const query = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)';
        const values = [user.firstname, user.lastname, user.username, user.email, user.password];
        try {
            await db.query(query, values);
        } catch (error) {
            throw new Error('Error creating user');
        }
    }
}
export default UserModel;