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

    static async findUserByID(user_id: number): Promise<User> {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        try {   
            const result = await db.query(query, [user_id]);
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

    static async DeleteUser(user_id: number): Promise<void> {
        const query = 'DELETE FROM users WHERE user_id = $1';
        try {
            const result = await db.query(query, [user_id]);
            if (result.rowCount === 0) {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error deleting user by ID', error);
            throw error;
        }
    }
 }
export default UserModel;