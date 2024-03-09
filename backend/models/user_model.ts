// user_model.ts

import db from '../config/database';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

class UserModel {
    static async findAll(): Promise<User[]> {
        const query = 'SELECT * FROM users';
        console.log('Executing SQL query:', query); // Debug statement
        try {
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error fetching users:', error); // Debug statement
            throw new Error('Error fetching findAll');
        }
    }
}
export default UserModel;