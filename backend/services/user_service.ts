// user_service.ts

import type { User } from '../models/user_model';
import UserModel from '../models/user_model';

class UserService {
    static async getAllUsers(): Promise<User[]> {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
            throw new Error('Error fetching getAllUsers');
        }
    }
}

export default UserService;