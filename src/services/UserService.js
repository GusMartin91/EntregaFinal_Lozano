import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersDAO from '../daos/usersDAO.js';
import { config } from '../config/envs.config.js';

class UserService {
    static async login(email, password) {
        const user = await UsersDAO.getUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid email or password');
        }

        const accessToken = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ user }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        return { message: 'Login successful', accessToken, refreshToken, user };
    }

    static async refreshToken(refreshToken) {
        try {
            const user = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
            const newAccessToken = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: '1h' });
            return { message: 'Token refreshed successfully', accessToken: newAccessToken };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    static async register(email, password) {
        const existingUser = await UsersDAO.getUserByEmail(email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = { email, password: hashedPassword };

        const createdUser = await UsersDAO.createUser(newUser);
        return { message: 'User registered successfully', user: createdUser };
    }

    static async update(userId, email, password) {
        const updateData = {};
        if (email) updateData.email = email;
        if (password) updateData.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const updatedUser = await UsersDAO.updateUserById(userId, updateData);
        return { message: 'User updated successfully', user: updatedUser };
    }

    static logout() {
        return true;
    }
}

export default UserService;