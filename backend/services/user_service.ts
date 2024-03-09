// user_service.ts

import type { User } from '../models/user_model';
import UserModel from '../models/user_model';

class UserService {
    static async getAllUsers(): Promise<User[]> {
        try {
            console.log('getAllUsers method called'); // Debug statement
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            console.error('Error in getAllUsers method:', error); // Debug statement
            throw new Error('Error fetching getAllUsers');
        }
    }
}

export default UserService;