import type { User } from '../models/user_model';
import UserModel from '../models/user_model';
import { hashPassword } from '../utils/password_utils';
import db from '../config/database';

class UserService {
    static async getAllUsers(): Promise<User[]> {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            throw new Error('Error fetching getAllUsers');
        }
    }

    static async createUser(user: User): Promise<void> {
        try {
            const hashedPassword = await hashPassword(user.password);
            await UserModel.CreateUser({ ...user, password: hashedPassword} );
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Error creating user');
        }
    }

    static async userExistsByEmail(email: string): Promise<boolean> {
        const query = 'SELECT COUNT(*) FROM users WHERE email = $1';
        const values = [email];
        try {
            const result = await db.query(query, values);
            return result.rows[0].count > 0;
        } catch (error) {
            console.error('Error checking if user exists: ', error);
            throw new Error('Error checking if user exists');
        }
    }

    static async userExistsByUsername(username: string): Promise<boolean> {
        const query = 'SELECT COUNT(*) FROM users WHERE username = $1';
        const values = [username];
        try {
            const result = await db.query(query, values);
            return result.rows[0].count > 0;
        } catch (error) {
            console.error('Error checking if user exists: ', error);
            throw new Error('Error checking if user exists')
        }
    }
}

export default UserService;