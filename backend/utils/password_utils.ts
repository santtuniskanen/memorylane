import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    /**
     * hashPassword() hashes and salts a password using bcrypt
     * @param {string} password - takes the input password
     * as a paremeter, which will be hashed.
     * @returns {Promise<string>} returns the hashed password
     * as a string when the hashPassword() function has completed.
     */
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    /**
     * comparePassword() function compares input password
     * to the hashed password, for example, when logging in
     * @param {string} password - takes the plain-text input 
     * parameter to compare to hash.
     * @param {string} hashedPassword - exists in the database
     * and is created during the Sign Up process.
     * @returns {Promise<boolean>} - A promise, returning true
     * if the passwords match, false otherwise.
     */
    return bcrypt.compare(password, hashedPassword);
}   