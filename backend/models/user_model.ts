import db from '../config/database';

export interface User {
    user_id?: number;
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

    static async findUserByID(userId: number): Promise<User> {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        try {   
            const result = await db.query(query, [userId]);
            return result.rows[0] || null;
        } catch (error) {
            console.error('Error finding user by ID: ', error);
            throw new Error('Error finding user by ID');
        }
    }

    static async CreateUser(user: User): Promise<void> {
        const query = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)';
        const values = [user.firstname, user.lastname, user.username, user.email, user.password];
        try {
            await db.query(query, values);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }
}
export default UserModel;